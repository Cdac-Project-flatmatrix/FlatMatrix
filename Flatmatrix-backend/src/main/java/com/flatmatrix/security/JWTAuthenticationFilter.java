package com.flatmatrix.security;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.flatmatrix.dao.UserRepository;
import com.flatmatrix.pojos.User;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private Logger logger = LoggerFactory.getLogger(JWTAuthenticationFilter.class);

    @Autowired
    private JWTHelper jwtHelper;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        logger.info("Request URI: {}", requestURI);

        
        // Skip Swagger UI and docs endpoints for authentication
        if (requestURI.startsWith("/flatmatrix/swagger-ui") || requestURI.startsWith("/flatmatrix/v3/api-docs") || requestURI.startsWith("flatmatrix/auth/register") || requestURI.startsWith("/flatmatrix/auth/login")) {
        	System.out.println("Going further from filter");
            chain.doFilter(request, response);
            return;
        }

        String token = request.getHeader("Authorization");
        logger.info("Authorization Header:  {}", token);
        
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7).trim();
            Long userId = null;

            try {
                userId = jwtHelper.getUserIdFromToken(token); 
            } catch (IllegalArgumentException e) {
                logger.error("Illegal Argument while fetching the user ID from the token.", e);
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid Token Format");
                return;
            } catch (ExpiredJwtException e) {
                logger.error("The provided JWT token has expired.", e);
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token Expired");
                return;
            } catch (MalformedJwtException e) {
                logger.error("The provided JWT token is malformed.", e);
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Malformed Token");
                return;
            } catch (Exception e) {
                logger.error("An error occurred while processing the token.", e);
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Token Processing Error");
                return;
            }

            if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                User user = userRepository.findById(userId)
                        .orElseThrow(() -> new RuntimeException("User not found"));

                CustomUserDetails customUserDetails = new CustomUserDetails(
                        user.getId(), user.getUserName(), user.getPassword(), user.getRole());

                // Validate token
                boolean isTokenValid = this.jwtHelper.validateToken(token, customUserDetails);
                if (isTokenValid) {
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    logger.info("User successfully authenticated: {}", user.getUserName());
                } else {
                    logger.info("JWT Token validation failed for user: {}", user.getUserName());
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
                    return;
                }
            }
        } else {
            logger.warn("Authorization token not found or malformed.");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization Token Missing or Invalid");
            return;
        }

        chain.doFilter(request, response);
    }
}
