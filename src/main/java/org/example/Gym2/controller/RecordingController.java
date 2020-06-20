package org.example.Gym2.controller;

import org.example.Gym2.domain.Recording;
import org.example.Gym2.domain.User;
import org.example.Gym2.repos.RecordingRepo;
import org.example.Gym2.service.RecordingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class RecordingController {
    @Autowired
    RecordingService recordingService;

    @GetMapping("/listRecording")
    private String getListRecording(Model model, @PageableDefault(sort = {"dateSend", "timeSend"}, direction = Sort.Direction.DESC) Pageable pageable){
        Page<Recording> page;

        page = recordingService.findAllBy(pageable);
        model.addAttribute("page", page);
        model.addAttribute("url", "/listRecording");
        return "/listRecording";
    }

    @PostMapping("/recording")
    @ResponseBody
    private String handingRecording(@RequestParam Map<String, String> form)
    {
        recordingService.addRecording(form);
        return "recording";
    }

    @DeleteMapping("/listRecording/delete")
    @ResponseBody
    private ResponseEntity<String> deleteRecording(@RequestParam Long id)
    {
        return recordingService.deleteRecordingCard(id);
    }

    @PutMapping("/listRecording/addComment")
    @ResponseBody
    private ResponseEntity<String> addRecordingComment(@RequestParam Long id, @RequestParam String comment)
    {
        return recordingService.addRecordingComment(id, comment);
    }
}
