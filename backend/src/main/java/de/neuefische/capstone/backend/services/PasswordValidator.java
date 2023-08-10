package de.neuefische.capstone.backend.services;

import org.springframework.stereotype.Component;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class PasswordValidator {

    public boolean isValidPassword(String password) {
        String regex = "^(?=.*[a-zA-Z])(?=.*\\d).{6,20}$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(password);

        return matcher.matches();
    }
}
