package org.example.Gym2.repos;

import org.example.Gym2.domain.Discount;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface DiscountRepo extends CrudRepository<Discount, Long> {
    Set<Discount> findAll();
}
