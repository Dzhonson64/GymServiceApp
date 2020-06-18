package org.example.Gym2.controller;

import org.example.Gym2.domain.Discount;
import org.example.Gym2.domain.Pricies;
import org.example.Gym2.service.DiscountService;
import org.example.Gym2.service.Discount_allPricesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Set;

@Controller
public class IndexController {

    @Autowired
    DiscountService discountService;

    @Autowired
    Discount_allPricesService discount_allPricesService;


    @GetMapping("/")
    private String greeting(Model model){
        for (Discount d : discount_allPricesService.getDiscounts()){
            Set<Pricies> s2 = discount_allPricesService.getPrices(d);
            System.out.println();
        }
        model.addAttribute("discounts", discount_allPricesService.getDiscounts());
        model.addAttribute("priceService", discount_allPricesService);
        return "greeting";
    }


}
