package org.example.Gym2.service;

import org.example.Gym2.domain.Recording;
import org.example.Gym2.domain.Role;
import org.example.Gym2.domain.User;
import org.example.Gym2.repos.RecordingRepo;
import org.example.Gym2.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
public class RecordingService {
    @Autowired
    private RecordingRepo recordingRepo;


    public boolean addRecording(Map<String, String> form){
        DateTimeFormatter formatterDate = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        DateTimeFormatter formatterTime = DateTimeFormatter.ofPattern("HH:mm");
        Recording recording = new Recording();
        recording.setName(form.get("name"));
        recording.setSurname(form.get("surname"));
        recording.setPhone(form.get("phone"));
        recording.setDateSend(LocalDateTime.now().format(formatterDate));
        recording.setTimeSend(ZonedDateTime.now().format(formatterTime));
        recording.setGender(form.get("gender"));
        recordingRepo.save(recording);

        return true;
    }

    public Page<Recording> findAllBy(Pageable pageable){
        return recordingRepo.findAllBy(pageable);
    }


    public ResponseEntity<String> deleteRecordingCard(Long id) {
        Optional<Recording> recording = recordingRepo.findById(id);
        if (recording.isPresent()) {
            recordingRepo.delete(recording.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }


        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
