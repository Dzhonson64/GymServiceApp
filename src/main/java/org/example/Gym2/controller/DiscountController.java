package org.example.Gym2.controller;

import org.example.Gym2.domain.Discount;
import org.example.Gym2.domain.Pricies;
import org.example.Gym2.domain.User;
import org.example.Gym2.repos.DiscountRepo;
import org.example.Gym2.service.DiscountService;
import org.example.Gym2.service.Discount_allPricesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Controller
@RequestMapping("/editDiscounts")
public class DiscountController {
    @Autowired
    DiscountService discountService;
    @Autowired
    Discount_allPricesService discount_allPricesService;


    @GetMapping
    private String getEditDiscount(Model model){
        for (Discount d : discount_allPricesService.getDiscounts()){
            Set<Pricies> s2 = discount_allPricesService.getPrices(d);
            System.out.println();
        }
        model.addAttribute("discounts", discount_allPricesService.getDiscounts());
        model.addAttribute("priceService", discount_allPricesService);
        return "editDiscounts";
    }
    @PostMapping("change")
    private ResponseEntity<String> saveDiscount(@RequestParam("discountName") String name,
                                                @RequestParam("discountId") Discount discount,
                                                @RequestParam("discountTypePeriod") String[] periodPrices,
                                                @RequestParam("pricesPrice") Integer[] numPrices,
                                                @RequestParam("discountCountPeriod") Integer[] countPeriodPrices,
                                                @RequestParam("pricesId") Long[] pricesId,
                                                @RequestParam("descriptionDiscount") String descriptionDiscount){

        return discountService.updateDataDiscount(discount, name, periodPrices, numPrices, countPeriodPrices, pricesId, descriptionDiscount);
    }

    @DeleteMapping("delete")
    private ResponseEntity<String> deleteDiscount(@RequestParam("idDiscount") Discount discount){
        discountService.deleteDiscount(discount);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("addDiscount")
    private ResponseEntity<Long> addDiscount(){
        return discountService.addDiscount();
    }

    @PutMapping("addPrice")
    private ResponseEntity<Long> addPrice(@RequestParam("discount") Discount discount){
        return discountService.addPrice(discount);
    }

    @DeleteMapping("deletePrice")
    private ResponseEntity<Long> deletePrice(@RequestParam("idPrice") Pricies price){
        return discountService.deletePrice(price);
    }
    @PostMapping("changeBgImgDiscount")
    private ResponseEntity<String> addBgImage(@RequestParam("discountId") Discount discount, @RequestParam("file") MultipartFile file) throws IOException {
        return discountService.updateBgDiscount(discount, file);
    }
}
