package org.example.Gym2.repos;

import org.example.Gym2.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface UserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
