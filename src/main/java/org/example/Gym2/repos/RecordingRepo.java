package org.example.Gym2.repos;

import org.example.Gym2.domain.Recording;
import org.springframework.data.repository.CrudRepository;

public interface RecordingRepo extends CrudRepository<Recording, Long> {
}
