package org.example.Gym2.repos;

import org.example.Gym2.domain.Discount;
import org.example.Gym2.domain.Discount_AllPrices;
import org.example.Gym2.domain.Pricies;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;
import java.util.Set;

public interface Discount_allPriciesRepo extends CrudRepository<Discount_AllPrices, Long> {
    public Set<Discount_AllPrices> findAll();

    @Query("SELECT d.price_id_Discount_AllPrices FROM Discount_AllPrices d WHERE d.discount_id_Discount_AllPrices = ?1")
    Set<Pricies> getPrices(Discount d);

    @Query(value = "SELECT u FROM Discount u")
    Set<Discount> getDiscounts();

    @Query("SELECT d.id FROM Discount_AllPrices d WHERE d.discount_id_Discount_AllPrices = ?1 and d.price_id_Discount_AllPrices = ?2")
    Long getDiscount_allPrices(Discount discount, Pricies pricies);

}
