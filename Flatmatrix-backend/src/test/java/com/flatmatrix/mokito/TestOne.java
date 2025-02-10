package com.flatmatrix.mokito;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.flatmatrix.custom_exception.ResourceNotFoundException;
import com.flatmatrix.dto.ApiResponse;
import com.flatmatrix.dto.UserDto;
import com.flatmatrix.entities.User;
import com.flatmatrix.repositories.UserRepository;
import com.flatmatrix.service.UserServiceImp;

@ExtendWith(MockitoExtension.class)
public class TestOne {
	
	@InjectMocks
    private UserServiceImp userService;

    @Mock
    private UserRepository userDao;

    @Mock
    private PasswordEncoder encoder;

    @Mock
    private ModelMapper modelMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    void testNewUser_SuccessfulRegistration() {
        // Arrange
        UserDto userDto = new UserDto();
        userDto.setEmail("test@example.com");
        userDto.setUserName("testuser");
        userDto.setPassword("password");

        User user = new User();
        user.setEmail("test@example.com");
        user.setUserName("testuser");
        user.setPassword("password");

        when(modelMapper.map(userDto, User.class)).thenReturn(user);
        //For team understanding Im adding the necessary comments
        //This mocks the database check to see if the email already exists.
       // findByEmail(user.getEmail()): Simulates querying the database for an existing email.
        //Optional.empty(): This means no user with that email exists, allowing registration to proceed.
        when(userDao.findByEmail(user.getEmail())).thenReturn(Optional.empty());
        when(userDao.findByUserName(user.getUserName())).thenReturn(Optional.empty());
        when(encoder.encode(user.getPassword())).thenReturn("encodedPassword");
        
//        Act: This is the part where we call the method we are testing.
//        userService.newUser(userDto);: Calls the newUser method in UserServiceImp with the mock userDto.
//        The method should process the input, save the user, and return a success response.
        // Act
        ApiResponse response = userService.newUser(userDto);

//        Assert: This verifies that the method behaved as expected.
       // assertNotNull(response);: Checks that the response isn't null.
        // Assert
        assertNotNull(response);
        
        
        assertEquals("Registered successfully", response.getMessage());
        
        //verify(mock, times(n)).methodCall();: Ensures a specific method was called a certain number of times.
        //userDao.save(user);: Confirms that the save method of userDao was called exactly once, meaning the user was saved to the database.
        verify(userDao, times(1)).save(user);
    }

    
    @Test
    void testNewUser_EmailAlreadyExists() {
      
        UserDto userDto = new UserDto();
        userDto.setEmail("test@example.com");
        userDto.setUserName("testuser");
        userDto.setPassword("password");

        User existingUser = new User();
        existingUser.setEmail("test@example.com");

        when(modelMapper.map(userDto, User.class)).thenReturn(existingUser);
        when(userDao.findByEmail(existingUser.getEmail())).thenReturn(Optional.of(existingUser));

        
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class, () -> {
            userService.newUser(userDto);
        });

        assertEquals("email already exist", exception.getMessage());
    }
	
    @Test
    void testNewUser_UsernameAlreadyTaken() {
        UserDto userDto = new UserDto();
        userDto.setEmail("new@example.com");
        userDto.setUserName("existingUser");

        when(userDao.findByEmail(userDto.getEmail())).thenReturn(Optional.empty());
        when(userDao.findByUserName(userDto.getUserName())).thenReturn(Optional.of(new User()));

        assertThrows(ResourceNotFoundException.class, () -> userService.newUser(userDto));
    }
}
