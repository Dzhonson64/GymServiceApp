package org.example.Gym2.controller;

import org.example.Gym2.domain.Role;
import org.example.Gym2.domain.Schedule;
import org.example.Gym2.domain.SlideScheduleData;
import org.example.Gym2.domain.User;
import org.example.Gym2.repos.UserRepo;
import org.example.Gym2.service.ScheduleService;
import org.example.Gym2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    private String getSchedule(@AuthenticationPrincipal User user, Model model) throws ParseException {
        model.addAttribute("slideScheduleData", scheduleService.getListSlideScheduleData(user, 3));
        Set<User> c = userService.getClients();
        Set<Schedule> s = scheduleService.findByClient(user);
        model.addAttribute("clients", userService.getClients());

        return "schedule";
    }

    @PutMapping("putActivitySchedule")
    @ResponseBody
    private  ResponseEntity<Map<String, Object>> putActivitySchedule(@AuthenticationPrincipal User user,
                                       @RequestParam("name") String name,
                                       @RequestParam("tag") String type,
                                       @RequestParam("duration") Integer duration,
                                       @RequestParam("startTime") String startTime,
                                       @RequestParam("dateCell") String dateCell,
                                       @RequestParam("clientId") User client
                                       ) throws ParseException {

        return ResponseEntity.status(HttpStatus.OK).body(scheduleService.setActivitiesInSchedule(user, client, name, type, duration, startTime, dateCell));
    }

    @PutMapping("updateActivitySchedule")
    @ResponseBody
    private ResponseEntity<Map<String, Object>> updateActivitySchedule(@AuthenticationPrincipal User user,
                                                          @RequestParam("name") String name,
                                                          @RequestParam("tag") String type,
                                                          @RequestParam("duration") Integer duration,
                                                          @RequestParam("startTime") String startTime,
                                                          @RequestParam("dateCell") String dateCell,
                                                          @RequestParam("idCellData") Schedule idCellData,
                                                          @RequestParam("clientId") User client


    ) throws ParseException {
        return  ResponseEntity.status(HttpStatus.OK).body(scheduleService.updateActivitySchedule(user, client, name, type, duration, startTime, dateCell, idCellData));
    }


    @DeleteMapping("deleteActivitySchedule")
    @ResponseBody
    private ResponseEntity<String> deleteActivitySchedule(@RequestParam("idCellData")  Schedule schedule

    ) {
        return  scheduleService.deleteActivitySchedule(schedule);
    }

}
