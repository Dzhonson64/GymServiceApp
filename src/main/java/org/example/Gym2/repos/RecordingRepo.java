package org.example.Gym2.repos;

import org.example.Gym2.domain.Recording;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface RecordingRepo extends CrudRepository<Recording, Long> {
    Page<Recording> findAllBy(Pageable pageable);
}
