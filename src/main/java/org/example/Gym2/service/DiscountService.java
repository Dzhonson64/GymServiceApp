package org.example.Gym2.service;

import org.example.Gym2.domain.Discount;
import org.example.Gym2.domain.Pricies;
import org.example.Gym2.domain.Recording;
import org.example.Gym2.domain.User;
import org.example.Gym2.repos.DiscountRepo;
import org.example.Gym2.repos.PricesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

@Service
public class DiscountService {
    @Autowired
    private DiscountRepo discountRepo;
    @Autowired
    private PricesRepo pricesRepo;

    @Value("${upload.pathBgDiscount}")
    private String uploadPath;

    private List<String> extensionsAvatar = Arrays.asList("jpg", "png");

    public Set<Discount> findAll(){
        return discountRepo.findAll();
    }

    public ResponseEntity<String>  updateDataDiscount(
            Discount discount,
            String name,
            String[] periodPrices,
            Integer[] numPrices,
            Integer[] countPeriodPrices,
            Long[] pricesId,
            String descriptionDiscount
    ){

        if (discount != null) {
            discount.setName(name);
            discount.setDescription(descriptionDiscount);


            for (int i = 0; i < pricesId.length; i++){
                Optional<Pricies> priciesOptional = pricesRepo.findById(pricesId[i]);
                priciesOptional.get().setPrice(numPrices[i]);
                priciesOptional.get().setDuration(periodPrices[i]);
                priciesOptional.get().setCountDuration(countPeriodPrices[i]);
                pricesRepo.save(priciesOptional.get());
            }
            System.out.println(discount.getPricies());
            discountRepo.save(discount);
            return new ResponseEntity<>(HttpStatus.OK);
        }


        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> updateBgDiscount(Discount discount, MultipartFile file) throws IOException {
        if (file != null && !file.getOriginalFilename().isEmpty()) {
            File uploadDir = new File(uploadPath);

            if (!uploadDir.exists()) {
                Files.createDirectories(Paths.get(uploadPath));
            }
            if (!extensionsAvatar.contains(getFileExtension(file.getOriginalFilename()))){
                return null;
            }

            String uuidFile = UUID.randomUUID().toString();
            String resultFilename = uuidFile + "." + file.getOriginalFilename();

            file.transferTo(new File(uploadPath + "/" + resultFilename));

            discount.setFileImageBg(resultFilename);
            discountRepo.save(discount);
            return new ResponseEntity<>(HttpStatus.OK);
        }



        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    private String getFileExtension(String fileName) {
        // если в имени файла есть точка и она не является первым символом в названии файла
        if(fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0)
            // то вырезаем все знаки после последней точки в названии файла, то есть ХХХХХ.txt -> txt
            return fileName.substring(fileName.lastIndexOf(".")+1);
            // в противном случае возвращаем заглушку, то есть расширение не найдено
        else return "";
    }

    public ResponseEntity<String> deleteDiscount(Discount discount){
        discountRepo.delete(discount);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<Long> addDiscount(){
        Discount discount = new Discount();
        discountRepo.save(discount);
        return new ResponseEntity<>(discount.getId(), HttpStatus.OK);
    }

    public ResponseEntity<Long> addPrice(Discount discount){
        Pricies pricies = new Pricies();
        pricies.setDiscount(discount);
        pricesRepo.save(pricies);
        discountRepo.save(discount);
        return new ResponseEntity<>(pricies.getId(), HttpStatus.OK);
    }


    public ResponseEntity<Long> deletePrice(Pricies price){
        pricesRepo.delete(price);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
