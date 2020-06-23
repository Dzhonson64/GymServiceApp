package org.example.Gym2.controller;

import org.example.Gym2.domain.Schedule;
import org.example.Gym2.domain.SlideScheduleData;
import org.example.Gym2.domain.User;
import org.example.Gym2.repos.UserRepo;
import org.example.Gym2.service.ScheduleService;
import org.example.Gym2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.xml.crypto.Data;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.util.*;

@Controller
public class ScheduleController {
    @Autowired
    ScheduleService scheduleService;

    @Autowired
    UserService userService;

    @GetMapping("schedule")
    private String getSchedule(Model model) throws ParseException {
        model.addAttribute("slideScheduleData", scheduleService.getListSlideScheduleData(2));
        Set<User> c = userService.getClients();
        model.addAttribute("clients", userService.getClients());
        return "schedule";
    }

    @PutMapping("putActivitySchedule")
    @ResponseBody
    private String putActivitySchedule(@AuthenticationPrincipal User user,
                                       @RequestParam("name") String name,
                                       @RequestParam("tag") String type,
                                       @RequestParam("duration") Integer duration,
                                       @RequestParam("countEmptyPlaces") Integer countEmptyPlaces,
                                       @RequestParam("startTime") String startTime,
                                       @RequestParam("dateCell") String dateCell,
                                       @RequestParam("clientId") User client
                                       ) throws ParseException {
        scheduleService.setActivitiesInSchedule(user, client, name, type, duration, countEmptyPlaces, startTime, dateCell);
        return "schedule";
    }

    @PutMapping("updateActivitySchedule")
    @ResponseBody
    private ResponseEntity<String> updateActivitySchedule(@AuthenticationPrincipal User user,
                                                          @RequestParam("name") String name,
                                                          @RequestParam("tag") String type,
                                                          @RequestParam("duration") Integer duration,
                                                          @RequestParam("startTime") String startTime,
                                                          @RequestParam("dateCell") String dateCell,
                                                          @RequestParam("idCellData") Schedule idCellData,
                                                          @RequestParam("clientId") User client


    ) throws ParseException {
        return  scheduleService.updateActivitySchedule(user, client, name, type, duration, startTime, dateCell, idCellData);
    }


    @DeleteMapping("deleteActivitySchedule")
    @ResponseBody
    private ResponseEntity<String> deleteActivitySchedule(@RequestParam("idCellData")  Schedule schedule

    ) {
        return  scheduleService.deleteActivitySchedule(schedule);
    }

}
