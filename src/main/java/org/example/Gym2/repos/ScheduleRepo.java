package org.example.Gym2.repos;

import org.example.Gym2.domain.Schedule;
import org.springframework.data.repository.CrudRepository;

import java.util.Calendar;
import java.util.Set;

public interface ScheduleRepo  extends CrudRepository<Schedule, Long> {
    Set<Schedule> findAll();

    Set<Schedule> findByDateStartLessThan(Calendar startNewDate);
}
