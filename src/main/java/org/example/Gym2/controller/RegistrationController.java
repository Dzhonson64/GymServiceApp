package org.example.Gym2.controller;


import org.example.Gym2.domain.User;
import org.example.Gym2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class RegistrationController {
    @Autowired
    private UserService userService;

    @GetMapping("/registration")
    public String registration(Model model) {
        model.addAttribute("message", "");
        model.addAttribute("errors", "");
        return "registration";
    }

    @PostMapping("/registration")
    @ResponseBody
    public ResponseEntity addUser(@Valid @ModelAttribute("user") User user, BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(ControllerUtils.getListErrors(bindingResult));
        }
        if (!userService.addUser(user)){
            List<String> l = new ArrayList<>();
            l.add("User exists!");
            return ResponseEntity.badRequest().body(l);
        }

        return ResponseEntity.accepted().body("");
    }
}
