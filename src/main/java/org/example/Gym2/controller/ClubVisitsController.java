package org.example.Gym2.controller;

import org.example.Gym2.domain.ClubVisits;
import org.example.Gym2.domain.User;
import org.example.Gym2.repos.ClubVisitsRepo;
import org.example.Gym2.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller
public class ClubVisitsController {
    @Autowired
    ClubVisitsRepo clubVisitsRepo;

    @Autowired
    UserRepo userRepo;

    @GetMapping("activities")

    private String getActivities(@AuthenticationPrincipal User user, Model model){
        User userNew = userRepo.findById(user.getId()).get();
        System.out.println(userNew.getClubVisits().size());
        Collections.reverse(userNew.getClubVisits());
        Set<ClubVisits> hashSet = new LinkedHashSet<>(userNew.getClubVisits());
        model.addAttribute("clubVisits", hashSet);

        return "activities";
    }
}
