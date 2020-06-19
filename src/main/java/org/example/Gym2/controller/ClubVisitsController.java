package org.example.Gym2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ClubVisitsController {
    @GetMapping("activities")
    private String getActivities(){
        return "activities";
    }
}
