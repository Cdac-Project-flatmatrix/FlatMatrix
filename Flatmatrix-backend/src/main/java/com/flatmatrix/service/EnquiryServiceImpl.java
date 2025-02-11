package com.flatmatrix.service;

import com.flatmatrix.custom_exception.ResourceNotFoundException;
import com.flatmatrix.dto.EnquiryDto;
import com.flatmatrix.dto.EnquiryResponseDto;
import com.flatmatrix.entities.*;
import com.flatmatrix.repositories.EnquiryRepository;
import com.flatmatrix.repositories.PropertyRepository;
import com.flatmatrix.repositories.UserRepository;
import com.flatmatrix.security.CustomUserDetails;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EnquiryServiceImpl implements EnquiryService {

    @Autowired
    private EnquiryRepository enquiryRepository;
    @Autowired
    private PropertyRepository propertyRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MailService mailService;
    @Autowired
    private ModelMapper mapper;

    @Override
    public void submitEnquiry(EnquiryDto enquiryDto, CustomUserDetails currentUser) {
        User buyer = userRepository.findById(currentUser.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Buyer not found"));
        
        Property property = propertyRepository.findById(enquiryDto.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        Enquiry enquiry = new Enquiry();
        enquiry.setBuyer(buyer);
        enquiry.setProperty(property);
        enquiry.setMessage(enquiryDto.getMessage());
        enquiry.setStatus(EnquiryStatus.PENDING);
        enquiry.setRead(false);

        enquiryRepository.save(enquiry);

        // Notify the property owner via email
        String subject = "New Enquiry for Your Property";
        String body = "Dear " + property.getUser().getFirstName() + ",\n\n" +
                "You have received a new enquiry for your property.\n\n" +
                "Property ID: " + property.getId() + "\n" +
                "Buyer: " + buyer.getFirstName() + " " + buyer.getLastName() + "\n" +
                "Message: " + enquiryDto.getMessage() + "\n\n" +
                "Please check your dashboard for more details.";
        
        System.out.println("sensing mail");
        System.out.println("Sending mail to: " + property.getUser().getEmail());
        System.out.println("Subject: " + subject);
        System.out.println("Body: " + body);
//        mailService.sendEmailNotification(property.getUser().getEmail(), subject, body);
        mailService.sendEmailNotification(property.getUser().getEmail(), subject, body);
        System.out.println("Mail Sent!");

    }

    @Override
    public List<EnquiryResponseDto> getSellerEnquiries(CustomUserDetails currentUser, boolean showSolved) {
        User seller = userRepository.findById(currentUser.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found"));

        List<Enquiry> enquiries = showSolved ?
                enquiryRepository.findByPropertyUserAndStatus(seller, EnquiryStatus.SOLVED) :
                enquiryRepository.findByPropertyUserAndStatus(seller, EnquiryStatus.PENDING);

        return enquiries.stream().map(enquiry -> {
            EnquiryResponseDto dto = mapper.map(enquiry, EnquiryResponseDto.class);
            dto.setId(enquiry.getId()); 
            dto.setPropertyId(enquiry.getProperty().getId()); 
            dto.setBuyerName(enquiry.getBuyer().getFirstName() + " " +  enquiry.getBuyer().getLastName()); 
            dto.setStatus(enquiry.getStatus().toString()); 
            return dto;
        }).collect(Collectors.toList());
    }


    @Override
    public void replyAndMarkEnquiryAsSolved(Long enquiryId, String reply, CustomUserDetails currentUser) {
        Enquiry enquiry = enquiryRepository.findById(enquiryId)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found"));

        if (!enquiry.getProperty().getUser().getId().equals(currentUser.getUserId())) {
            throw new SecurityException("You are not authorized to modify this enquiry.");
        }

        enquiry.setReply(reply);
        enquiry.setStatus(EnquiryStatus.SOLVED);
        enquiryRepository.save(enquiry);

        String subject = "Your Enquiry Has Been Resolved";
        String body = "Dear " + enquiry.getBuyer().getFirstName() + ",\n\n" +
                "Your enquiry regarding Property ID " + enquiry.getProperty().getId() + " has been resolved.\n\n" +
                "Reply from Seller: " + reply + "\n\n" +
                "Thank you for using FlatMatrix.";

        mailService.sendEmailNotification(enquiry.getBuyer().getEmail(), subject, body);
    }

    @Override
    public List<EnquiryResponseDto> getBuyerEnquiries(CustomUserDetails currentUser, boolean showSolved) {
        User buyer = userRepository.findById(currentUser.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Buyer not found"));

        List<Enquiry> enquiries = showSolved ?
                enquiryRepository.findByBuyerAndStatus(buyer, EnquiryStatus.SOLVED) :
                enquiryRepository.findByBuyerAndStatus(buyer, EnquiryStatus.PENDING);

        return enquiries.stream().map(enquiry -> {
            EnquiryResponseDto dto = mapper.map(enquiry, EnquiryResponseDto.class);
            dto.setId(enquiry.getId()); 
            dto.setPropertyId(enquiry.getProperty().getId()); 
            dto.setBuyerName(enquiry.getBuyer().getFirstName() + " " + enquiry.getBuyer().getLastName()); 
            dto.setStatus(enquiry.getStatus().toString()); 
            return dto;
        }).collect(Collectors.toList());
    }

}
