package org.example.Gym2.controller;

import org.example.Gym2.domain.*;
import org.example.Gym2.repos.UserRepo;
import org.example.Gym2.service.Discount_UserService;
import org.example.Gym2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    UserRepo userRepo;

    @Autowired
    Discount_UserService discount_userService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public String userList(@AuthenticationPrincipal User u, Model model){
        model.addAttribute("users", userService.findAll());
        return "userList";
    }


    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("{user}")
    public String changeUser(@PathVariable User user, @AuthenticationPrincipal User u, Model model){
        model.addAttribute("users", u);
        model.addAttribute("roles", Role.values());
        return "userEdit";
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("{user}")
    @ResponseBody
    public ResponseEntity save( @AuthenticationPrincipal User authUser, @PathVariable User user,  @Valid @ModelAttribute("user") User u, BindingResult bindingResult, @RequestParam Map<String, String> form){
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(ControllerUtils.getListErrors(bindingResult));
        }
        userService.mySave(user, authUser, form);
        return ResponseEntity.accepted().body("");
    }

    @GetMapping("profile")
    public String getProfile(Model model, @AuthenticationPrincipal User user){
        User userNew = userService.getUserId(user);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        model.addAttribute("user", userNew);
        if (userNew.getLocalDateSubscribeDiscount() != null){
            model.addAttribute("remainingTime", userNew.getCountVisit());
            model.addAttribute("discountResultDate", userNew.getLocalDateSubscribeDiscount().format(formatter));
        }
        model.addAttribute("filename", userNew.getFilename());
        model.addAttribute("idDiscount", userNew.getDiscount_users());


        if (userNew.getDiscount_users() != null){
            model.addAttribute("selectedDiscount", userNew.getDiscount_users().getDiscount_id_Discount_AllPrices());
            model.addAttribute("selectedPrice", userNew.getDiscount_users().getPrice_id_Discount_AllPrices());
        }




        return "profile";
    }

    @PostMapping("profile")
    public String updatePersonalData(@AuthenticationPrincipal User usr,
                                @RequestParam Map<String, String> data
                                ) {
        Optional<User> user = userRepo.findById(usr.getId());
        try {
            boolean result = userService.updatePersonalData(user.get(), usr, data);

        } catch (IOException e) {

        }
        usr = user.get();

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
        return userService.deleteUserFromList(user);
    }

    @PostMapping("noteCome")
    @ResponseBody
    public String noteCome(@RequestParam("idUser")User user){
        userService.noteCome(user);
        return user.getSurname() + " " +  user.getName() + " " + user.getPatronymic();
    }

    @PostMapping("noteLeft")
    @ResponseBody
    public String noteLeft(@RequestParam("idUser")User user){
        userService.noteLeft(user);
        return user.getSurname() + " " +  user.getName() + " " + user.getPatronymic();
    }

    @PostMapping("/bookDiscount")
    @ResponseBody
    public ResponseEntity<String> bookDiscount(@AuthenticationPrincipal User user, @RequestParam("idPrice") Pricies pricies, @RequestParam("idDiscount") Discount discount){
        return discount_userService.bookDiscount(user, discount, pricies);
    }

    @DeleteMapping("/unsubscribeDiscount")
    @ResponseBody
    public ResponseEntity<String> unsubscribeDiscount(@AuthenticationPrincipal User user, @RequestParam("idDiscountPrice") Discount_AllPrices discount_allPrices){
        return userService.unsubscribeDiscount(user,discount_allPrices);
    }









}
