package org.example.Gym2.service;

import org.example.Gym2.domain.Discount;
import org.example.Gym2.domain.Discount_AllPrices;
import org.example.Gym2.domain.Pricies;
import org.example.Gym2.repos.DiscountRepo;
import org.example.Gym2.repos.Discount_allPriciesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class Discount_allPricesService {
    @Autowired
    Discount_allPriciesRepo discount_allPriciesRepo;

    @Autowired
    DiscountRepo discountRepo;

    public Set<Discount_AllPrices> myfindAll(){
        return discount_allPriciesRepo.findAll();
    }
    public Set<Pricies> getPrices(Discount d){
        return discount_allPriciesRepo.getPrices(d);
    }

    public Set<Discount> getDiscounts(){
        return discount_allPriciesRepo.getDiscounts();
    }

    public Discount_AllPrices getDiscount_allPrices(Discount discount, Pricies pricies){
        return discount_allPriciesRepo.findById(discount_allPriciesRepo.getDiscount_allPrices(discount, pricies)).get();
    }
    public void addPrice(Discount discount, Pricies price){
        Discount_AllPrices discount_allPrices = new Discount_AllPrices();
        discount_allPrices.setDiscount_id_Discount_AllPrices(discount);
        discount_allPrices.setPrice_id_Discount_AllPrices(price);
        discount_allPriciesRepo.save(discount_allPrices);
    }
}
