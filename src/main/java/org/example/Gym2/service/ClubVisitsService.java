package org.example.Gym2.service;

import org.example.Gym2.domain.ClubVisits;
import org.example.Gym2.domain.Recording;
import org.example.Gym2.repos.ClubVisitsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ClubVisitsService {
    @Autowired
    ClubVisitsRepo clubVisitsRepo;

    public Page<ClubVisits> findAllBy(Pageable pageable){
        return clubVisitsRepo.findAllBy(pageable);
    }
}
