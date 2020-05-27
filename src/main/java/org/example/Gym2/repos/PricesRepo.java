package org.example.Gym2.repos;

import org.example.Gym2.domain.Discount;
import org.example.Gym2.domain.Pricies;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface PricesRepo extends CrudRepository<Pricies, Long> {
}
