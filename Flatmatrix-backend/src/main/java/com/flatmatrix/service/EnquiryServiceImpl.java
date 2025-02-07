package com.flatmatrix.service;

import com.flatmatrix.custom_exception.ResourceNotFoundException;
import com.flatmatrix.dto.EnquiryDto;
import com.flatmatrix.entities.Enquiry;
import com.flatmatrix.entities.EnquiryStatus;
//import com.flatmatrix.entities.Notification;
import com.flatmatrix.entities.Property;
import com.flatmatrix.entities.User;

import com.flatmatrix.security.CustomUserDetails;

import jakarta.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import com.flatmatrix.repositories.PropertyRepository;
import com.flatmatrix.repositories.UserRepository;
import com.flatmatrix.repositories.EnquiryRepository;
@Service
@Transactional
public class EnquiryServiceImpl implements EnquiryService{
	
	private final Logger logger = LoggerFactory.getLogger(EnquiryServiceImpl.class);

	@Autowired
    private EnquiryRepository enquiryRepository;
	@Autowired
    private PropertyRepository propertyRepository;
	@Autowired
    private UserRepository userRepository;
	@Autowired
    private JavaMailSender mailSender;
	@Autowired
	private SimpMessagingTemplate messagingTemplate;
	
	@Autowired
	private MailService mailService;
	
//	@Autowired
//	private NotificationRepository notificationRepository;

	@Autowired 
	private ModelMapper mapper;
	
    public void submitEnquiry(EnquiryDto enquiryDto, CustomUserDetails currentUser) {
    	User buyer = userRepository.findById(currentUser.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Buyer not found"));
        
        Property property = propertyRepository.findById(enquiryDto.getPropertyId())
                .orElseThrow(() -> new ResourceNotFoundException("Property not found"));

        Enquiry enquiry = mapper.map(enquiryDto, Enquiry.class);
        enquiry.setBuyer(buyer);
        enquiry.setProperty(property);
        enquiry.setStatus(EnquiryStatus.PENDING);
        enquiry.setRead(false);

        enquiryRepository.save(enquiry);

//        Notification notification = new Notification();
//        notification.setRecipient(property.getUser()); // Seller
//        notification.setEnquiry(enquiry);
//        notification.setMessage("You have a new enquiry for your property: " + property.getId());
////        notificationRepository.save(notification);
//
//        logger.info("Notification created for seller ID: {}", property.getUser().getId());
//
//        messagingTemplate.convertAndSend("/topic/notifications/" + property.getUser().getId(), notification);
        mailService.sendEmailNotification(property.getUser().getEmail(), "New Enquiry", "You have received a new enquiry for your property.");

    }

    public List<EnquiryDto> getSellerEnquiries(CustomUserDetails currentUser) {
        User seller = userRepository.findById(currentUser.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Enquiry> enquiries = enquiryRepository.findByPropertyUser(seller);

        return enquiries.stream()
                .map(enquiry -> mapper.map(enquiry, EnquiryDto.class))
                .collect(Collectors.toList());

    }

    public void markEnquiryAsSolved(Long enquiryId, CustomUserDetails currentUser) {
        Enquiry enquiry = enquiryRepository.findById(enquiryId)
                .orElseThrow(() -> new ResourceNotFoundException("Enquiry not found"));

        if (!enquiry.getProperty().getUser().getId().equals(currentUser.getUserId())) {
            throw new SecurityException("You are not authorized to modify this enquiry.");
        }

        enquiry.setStatus(EnquiryStatus.SOLVED);
        enquiryRepository.save(enquiry);
        mailService.sendEmailNotification(enquiry.getProperty().getUser().getEmail(), "Enquiry solved", "Your enquiry for flat is solved");
    }
}
