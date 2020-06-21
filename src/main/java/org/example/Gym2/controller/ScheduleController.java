package org.example.Gym2.controller;

import org.example.Gym2.domain.Schedule;
import org.example.Gym2.domain.User;
import org.example.Gym2.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.util.*;

@Controller
public class ScheduleController {
    @Autowired
    ScheduleService scheduleService;

    @GetMapping("schedule")
    private String getSchedule(Model model){
//        scheduleService.add();

        Locale localeRu = new Locale("ru", "RU");
        //System.out.println(scheduleService.findById(281).getDateEnd().getTime());

        List<Date> dates = scheduleService.getDaysOfWeek(1);
        model.addAttribute("dates", dates);
        Map<String, List<Schedule>> m = scheduleService.getCorrectData(dates);
        model.addAttribute("entry", m);
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
                                       @RequestParam("dateCell") String dateCell
                                       ) throws ParseException {
        scheduleService.setActivitiesInSchedule(user, name, type, duration, countEmptyPlaces, startTime, dateCell);
        return "schedule";
    }

}
