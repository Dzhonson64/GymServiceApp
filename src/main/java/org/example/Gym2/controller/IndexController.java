package org.example.Gym2.controller;

import org.example.Gym2.domain.Discount;
import org.example.Gym2.domain.Pricies;
import org.example.Gym2.domain.User;
import org.example.Gym2.service.DiscountService;
import org.example.Gym2.service.Discount_allPricesService;
import org.example.Gym2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @Autowired
    UserService userService;


    @GetMapping("/")
    private String greeting(@AuthenticationPrincipal User user, Model model){
        if (user != null &&  user.getDiscount_users() != null){
            User userNew = userService.getUserId(user);
            model.addAttribute("userSelectedIdPrice", userNew.getDiscount_users().getPrice_id_Discount_AllPrices().getId());
        }else {
            model.addAttribute("userSelectedIdPrice", -1);
        }

        for (Discount d : discount_allPricesService.getDiscounts()){
            Set<Pricies> s2 = discount_allPricesService.getPrices(d);
        }
        model.addAttribute("discounts", discount_allPricesService.getDiscounts());
        model.addAttribute("priceService", discount_allPricesService);

        return "greeting";
    }


}
