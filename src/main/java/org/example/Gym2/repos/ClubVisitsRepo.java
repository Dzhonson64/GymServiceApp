package org.example.Gym2.repos;

import org.example.Gym2.domain.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface ClubVisitsRepo  extends CrudRepository<ClubVisits, Long> {
    Page<ClubVisits> findAllBy(Pageable pageable);
}
