package org.example.Gym2.repos;

import org.example.Gym2.domain.*;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface ClubVisitsRepo  extends CrudRepository<ClubVisits, Long> {

    @Query(value = "SELECT c FROM ClubVisits c WHERE c.user = ?1 ORDER BY c.id desc")
    ClubVisits getClubVisit(User user);
}
