package org.example.Gym2.controller;

import org.example.Gym2.repos.RecordingRepo;
import org.example.Gym2.service.RecordingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class RecordingController {
    @Autowired
    RecordingService recordingService;

    @PostMapping("/recording")
    @ResponseBody
    private String handingRecording(@RequestParam Map<String, String> form)
    {
        recordingService.addRecording(form);
        return "recording";
    }
}
