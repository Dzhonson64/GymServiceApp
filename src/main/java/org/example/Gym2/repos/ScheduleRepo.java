package org.example.Gym2.repos;

import org.example.Gym2.domain.Schedule;
import org.example.Gym2.domain.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Calendar;
import java.util.Set;

public interface ScheduleRepo  extends CrudRepository<Schedule, Long> {
    Set<Schedule> findAll();

    Set<Schedule> findByDateStartLessThan(Calendar startNewDate);

    Set<Schedule> findByClient(User client);

    Set<Schedule> findByUsr(User coach);

    Set<Schedule> findByClientAndUsr(User client, User coaches);
}
