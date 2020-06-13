package org.example.Gym2.service;

import org.example.Gym2.domain.Discount;
import org.example.Gym2.domain.Pricies;
import org.example.Gym2.domain.Role;
import org.example.Gym2.domain.User;
import org.example.Gym2.repos.DiscountRepo;
import org.example.Gym2.repos.PricesRepo;
import org.example.Gym2.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private DiscountRepo discountRepo;

    @Autowired
    private PricesRepo pricesRepo;

    @Value("${upload.path}")
    private String uploadPath;

    private List<String> extensionsAvatar = Arrays.asList("jpg", "png");



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepo.findByUsername(username);
    }

    public boolean addUser(User user){
        User userFromDb = userRepo.findByUsername(user.getUsername());
        if (userFromDb != null){
            return false;
        }
        user.setActive(true);
        user.setRoles(Collections.singleton(Role.USER));
        user.setFilename("account_user.png");
        userRepo.save(user);

        return true;
    }

    public User getUserId(User authUser){
        return userRepo.findById(authUser.getId()).get();
    }


    public List<User> findAll(){
        return  userRepo.findAll();
    }

    public void saveUser(User user, String username, Map<String, String> form){
        user.setUsername(username);
        user.getRoles().clear();
        List<String> roles = Arrays.stream(Role.values()).map(Role::name).collect(Collectors.toList());
        for (String key : form.keySet()){
            if (roles.contains(key)){
                user.getRoles().add(Role.valueOf(key));
            }
        }
        userRepo.save(user);
    }

    public boolean updatePersonalData(User user, String username, String password) throws IOException {

        if (password != null){
            user.setPassword(password);
            user.setUsername(username);
        }else {
            return false;
        }

        userRepo.save(user);
        return true;
    }

    public String updateUserAvatar(User user, MultipartFile file) throws IOException {
        String resultFilename = null;
        if (file != null && !file.getOriginalFilename().isEmpty()) {
            File uploadDir = new File(uploadPath);

            if (!uploadDir.exists()) {
                Files.createDirectories(Paths.get(uploadPath));
            }
            if (!extensionsAvatar.contains(getFileExtension(file.getOriginalFilename()))){
                return null;
            }

            String uuidFile = UUID.randomUUID().toString();
            resultFilename = uuidFile + "." + file.getOriginalFilename();

            file.transferTo(new File(uploadPath + "/" + resultFilename));

            user.setFilename(resultFilename);
        }

        userRepo.save(user);
        return resultFilename;
    }

    //метод определения расширения файла
    private String getFileExtension(String fileName) {
        // если в имени файла есть точка и она не является первым символом в названии файла
        if(fileName.lastIndexOf(".") != -1 && fileName.lastIndexOf(".") != 0)
            // то вырезаем все знаки после последней точки в названии файла, то есть ХХХХХ.txt -> txt
            return fileName.substring(fileName.lastIndexOf(".")+1);
            // в противном случае возвращаем заглушку, то есть расширение не найдено
        else return "";
    }

    public ResponseEntity<String> deleteUserFromList(Long userId){
        Optional<User> user = userRepo.findById(userId);
        if (user.isPresent()) {
            userRepo.delete(user.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }


        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> bookDiscount(User user, Discount discount, Pricies pricies){
        discount.setSelectedPrice(pricies);
        pricies.setDiscountInto(discount);
        user.setSelectedDiscount(discount);
        user.setLocalDateSelectedDiscount(LocalDate.now());
        discountRepo.save(discount);
        pricesRepo.save(pricies);
        userRepo.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
