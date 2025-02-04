package com.flatmatrix.security;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTHelper {
	
	private static final String SECRET_KEY = "5ppggKeAPGMWd5mJOmGTSqV0nDU7Y/1lrNx4AI9W0tGqW9XJCezW178PE2r6xWD6";
	private static final long JWT_TOKEN_VALIDITY = 5*60*60*1000;
	
	public Long getUserIdFromToken(String token) {
		return Long.parseLong(getClaimFromToken(token, Claims::getSubject));
	}
	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}
	
	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}
	
	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parserBuilder()
	       .setSigningKey(getSigningKey())
	       .build()
	       .parseClaimsJws(token)
	       .getBody();
	}
	
	private Key getSigningKey() {
	    return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
	}
	
	public String generateToken(CustomUserDetails customUserDetails) {
        return Jwts.builder()
                .setSubject(String.valueOf(customUserDetails.getUserId()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
	
	public Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}
	
	public Boolean validateToken(String token, CustomUserDetails userDetails) {
		final long userId = getUserIdFromToken(token);
		return (userId == userDetails.getUserId()) && !isTokenExpired(token);
	}
}
