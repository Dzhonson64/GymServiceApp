package org.example.Gym.repositories;

import org.example.Gym.domains.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepo extends CrudRepository<User, Integer> {
}
