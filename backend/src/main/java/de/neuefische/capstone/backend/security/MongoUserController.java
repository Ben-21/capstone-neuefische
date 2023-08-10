package de.neuefische.capstone.backend.security;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class MongoUserController {
    private final MongoUserService mongoUserService;

    @GetMapping("/me")
    public String getUserInfo() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping("/me-all")
    public MongoUserWithoutPassword getUserAllInfo() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return mongoUserService.findByUsername(userDetails.getUsername());
    }

    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
    }

    @PostMapping("/register")
    public String register(@Valid @RequestBody MongoUserCreation mongoUserWithoutId) {
        mongoUserService.registerUser(mongoUserWithoutId);
        return "registered";
    }
}
