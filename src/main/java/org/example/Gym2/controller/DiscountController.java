package org.example.Gym2.controller;

import org.example.Gym2.domain.Discount;
import org.example.Gym2.domain.Pricies;
import org.example.Gym2.domain.User;
import org.example.Gym2.service.DiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class DiscountController {
    @Autowired
    DiscountService discountService;

    @GetMapping("/editDiscounts")
    private String editDiscounts(Model model){
        model.addAttribute("discounts", discountService.findAll());
        return "editDiscounts";
    }

    @PostMapping("/editDiscounts/change")
    @ResponseBody
    private ResponseEntity<String> changeDiscounts(
            @RequestParam(name = "discountName") String name,
            @RequestParam(name = "discountId") Long idDiscount,
            @RequestParam(name = "pricesDuration") String[] pricesDuration,
            @RequestParam(name = "pricesPrice") Integer[] pricesPrice,
            @RequestParam(name = "pricesId") Long[] pricesId
    ){

        return discountService.updateDataDiscount(name, idDiscount, pricesDuration, pricesPrice, pricesId);
    }


    @PostMapping("editDiscounts/changeBgImgDiscount")
    @ResponseBody
    public ResponseEntity<String> updateBgDiscount(@RequestParam(name = "discountId") Discount discount,
                               @RequestParam("file") MultipartFile file
    ) throws IOException {
        return  discountService.updateBgDiscount(discount, file);
    }

    @PostMapping("editDiscounts/addPrice")
    @ResponseBody
    public Long addPrice(@RequestParam(name = "discountId") Discount discount
    )  {
        return  discountService.addPrice(discount);
    }


    @PutMapping("editDiscounts/createDiscount")
    @ResponseBody
    public Long createDiscount() {
        return  discountService.addDiscount();
    }


    @DeleteMapping("editDiscounts/deleteDiscount")
    @ResponseBody
    public ResponseEntity<String> deleteDiscount(@RequestParam(name = "idDiscount") Discount discount) {
        return  discountService.deleteDiscount(discount);
    }


    @DeleteMapping("editDiscounts/deletePriceDiscount")
    @ResponseBody
    public ResponseEntity<String> deletePriceDiscount(@RequestParam(name = "idPriceDiscount") Pricies pricies) {
        return  discountService.deletePriceDiscount(pricies);
    }
}
