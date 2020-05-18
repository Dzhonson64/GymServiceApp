package org.example.Gym2.controller;

import org.example.Gym2.domain.Role;
import org.example.Gym2.domain.User;
import org.example.Gym2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public String userList(Model model){
        model.addAttribute("users", userService.findAll());
        return "userList";
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("{user}")
    public String changeUser(@PathVariable User user, Model model){
        model.addAttribute("user", user);
        model.addAttribute("roles", Role.values());
        return "userEdit";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public String save(@RequestParam("userId") User user, @RequestParam String username, @RequestParam Map<String, String> form){
        userService.saveUser(user, username, form);
        return "redirect:/user";
    }

    @GetMapping("profile")
    public String getProfile(Model model, @AuthenticationPrincipal User user){
        model.addAttribute("username", user.getUsername());
        model.addAttribute("password", user.getPassword());
        model.addAttribute("filename", user.getFilename());

        return "profile";
    }

    @PostMapping("profile/saveData")
    @ResponseBody
    public String updatePersonalData(@AuthenticationPrincipal User user,
                                @RequestParam String password
                                ) {
        System.out.println("sdf");
        try {
            boolean result = userService.updatePersonalData(user, password);

        } catch (IOException e) {

        }

        return "redirect:/user/profile";
    }


    @PostMapping("profile/saveAvatar")
    @ResponseBody
    public String updateAvatar(@AuthenticationPrincipal User user,
                                @RequestParam("file") MultipartFile file
    ) {
        String result = null;
        System.out.println("sdf");
        try {
            result = userService.updateUserAvatar(user, file);

        } catch (IOException e) {

        }

        return result;
    }


}
