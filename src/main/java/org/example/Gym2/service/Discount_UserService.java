package org.example.Gym2.service;

import org.example.Gym2.domain.Discount;
import org.example.Gym2.domain.Pricies;
import org.example.Gym2.domain.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Discount_UserService {


    @Autowired
    Discount_allPricesService discount_allPricesService;


    @Autowired
    UserService userService;

    public ResponseEntity<String> bookDiscount(User user, Discount discount, Pricies pricies){
        //Optional<User> us = userRepo.findById(user.getId());
        userService.addDiscountPrice(user, discount_allPricesService.getDiscount_allPrices(discount, pricies));




//        Optional<User> us = userRepo.findById(user.getId());
//        Discount_User discount_user = new Discount_User();
//        discount_user.setLocalDateSelectedDiscount(LocalDate.now());
//        discount_user.setUser_id_Discount_User(us.get());
//        discount_user.setDiscount_id_Discount_Price(discount_priceService.selectPrice(discount, pricies));
//
//        discount_userRepo.save(discount_user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<String> getUser(){
        SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        Query query = session.createQuery("select d.id from Discount d");
        List developers = query.list();
        session.getTransaction().commit();
        session.close();


        return new ResponseEntity<>(HttpStatus.OK);
    }

}
