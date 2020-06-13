package org.example.Gym2.controller;

import org.example.Gym2.domain.Discount;
import org.example.Gym2.domain.Pricies;
import org.example.Gym2.domain.Role;
import org.example.Gym2.domain.User;
import org.example.Gym2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.function.EntityResponse;

import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
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
    public String changeUser(@PathVariable User user, @AuthenticationPrincipal User u, Model model){
        System.out.println(u);
        model.addAttribute("users", u);
        model.addAttribute("roles", Role.values());
        return "userEdit";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("{user}")
    public String save(@RequestParam String username, @RequestParam Map<String, String> form, @PathVariable User user, @AuthenticationPrincipal User u){
        System.out.println(user == u);
        System.out.println(u);
        userService.saveUser(user, username, form);
        userService.saveUser(u, username, form);
        System.out.println(u);
        u = user;
        return "redirect:/user";
    }

    @GetMapping("profile")
    public String getProfile(Model model, @AuthenticationPrincipal User user){
        User userNew= userService.getUserId(user);
        System.out.println(ChronoUnit.DAYS.between( user.getLocalDateSelectedDiscount(), LocalDate.now() ));
        model.addAttribute("username", userNew.getUsername());
        model.addAttribute("remainingTime", ChronoUnit.DAYS.between(userNew.getLocalDateSelectedDiscount(), LocalDate.now()));
        model.addAttribute("password", userNew.getPassword());
        model.addAttribute("filename", userNew.getFilename());
        model.addAttribute("selectedDiscount", userNew.getSelectedDiscount());

        System.out.println(userNew);
        return "profile";
    }

    @PostMapping("profile")
    public String updatePersonalData(@AuthenticationPrincipal User user,
                                @RequestParam String username,
                                @RequestParam String password
                                ) {
        try {
            boolean result = userService.updatePersonalData(user, username, password);

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
        try {
            result = userService.updateUserAvatar(user, file);

        } catch (IOException e) {

        }

        return result;
    }
    @DeleteMapping("/{user}/deleteFromList")
    @ResponseBody
    public ResponseEntity<String> deleteUserFromList(@PathVariable User user){
        return userService.deleteUserFromList(user.getId());
    }


    @PostMapping("/bookDiscount")
    @ResponseBody
    public ResponseEntity<String> bookDiscount(@AuthenticationPrincipal User user, @RequestParam("idPrice")Pricies pricies, @RequestParam("idDiscount") Discount discount){
        System.out.println("T");
        return userService.bookDiscount(user, discount, pricies);
    }




}
