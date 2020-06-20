package org.example.Gym2.controller;

import org.example.Gym2.domain.ClubVisits;
import org.example.Gym2.domain.Recording;
import org.example.Gym2.domain.User;
import org.example.Gym2.repos.ClubVisitsRepo;
import org.example.Gym2.repos.UserRepo;
import org.example.Gym2.service.ClubVisitsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller
public class ClubVisitsController {
    @Autowired
    ClubVisitsRepo clubVisitsRepo;

    @Autowired
    ClubVisitsService clubVisitsService;

    @Autowired
    UserRepo userRepo;

    @GetMapping("activities")
    private String getActivities(@AuthenticationPrincipal User user, Model model, @PageableDefault(sort = {"localDateTime", "localTimeLeft"}, direction = Sort.Direction.DESC) Pageable pageable){
        User userNew = userRepo.findById(user.getId()).get();
//        Collections.reverse(userNew.getClubVisits());
//        Set<ClubVisits> hashSet = new LinkedHashSet<>(userNew.getClubVisits());

        Page<ClubVisits> page;
        page = clubVisitsService.findByUser(user, pageable);
        model.addAttribute("page", page);
        model.addAttribute("userActive", user);
        model.addAttribute("users", new HashSet<>(userRepo.findAll()));
        model.addAttribute("url", "/activities");
        model.addAttribute("clubVisits", userNew.getClubVisits());

        return "activities";
    }
    @GetMapping("/UserActivities")
    public String unsubscribeDiscount(@RequestParam("usr") User user, Model model, @PageableDefault(sort = {"localDateTime", "localTimeLeft"}, direction = Sort.Direction.DESC) Pageable pageable){
        User userNew = userRepo.findById(user.getId()).get();
        Page<ClubVisits> page;
        page = clubVisitsService.findByUser(user, pageable);
        model.addAttribute("page", page);
        model.addAttribute("userActive", user);
        model.addAttribute("users", new HashSet<>(userRepo.findAll()));
        model.addAttribute("url", "/activities");
        model.addAttribute("clubVisits", userNew.getClubVisits());
        return "activities";
    }
}
