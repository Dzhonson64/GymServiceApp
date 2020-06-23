package org.example.Gym2.service;

import org.example.Gym2.domain.*;
import org.example.Gym2.repos.ClubVisitsRepo;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ClubVisitsRepo clubVisitsRepo;

    @Autowired
    private DiscountRepo discountRepo;

    @Autowired
    private PricesRepo pricesRepo;



    @Value("${upload.path}")
    private String uploadPath;

    private List<String> extensionsAvatar = Arrays.asList("jpg", "png");

    public void save(User user){
        userRepo.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
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

    public boolean updatePersonalData(User user, Map<String, String> data) throws IOException {

        user.setUsername(data.get("username"));
        user.setPassword(data.get("password"));
        user.setName(data.get("name"));
        user.setSurname(data.get("surname"));
        user.setPatronymic(data.get("patronymic"));
        user.setAge(Integer.parseInt(data.get("age")));
        user.setGender(data.get("gender"));

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

    public void addDiscountPrice(User u, Discount_AllPrices discount_price){
        User user = userRepo.findById(u.getId()).get();
        user.setLocalDateSubscribeDiscount(getResultDate(
                discount_price.getPrice_id_Discount_AllPrices().getCountDuration(),
                discount_price.getPrice_id_Discount_AllPrices().getDuration()
                ));
        user.setCountVisit((int) ChronoUnit.DAYS.between( LocalDate.now(), user.getLocalDateSubscribeDiscount()));
        user.setDiscount_users(discount_price);
        user.setIdDiscount(UUID.randomUUID().toString());
        userRepo.save(user);
    }

    public ResponseEntity<String> unsubscribeDiscount(User user, Discount_AllPrices discount_allPrices){
        user.setLocalDateSubscribeDiscount(null);
        user.setIdDiscount(null);
        user.setDiscount_users(null);
        userRepo.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public LocalDate getResultDate(Integer count, String typePeriod ){
        LocalDate dateNow = LocalDate.now();
        if (typePeriod.equals("День")){
            return dateNow.plusDays(count);
        }else if (typePeriod.equals("Неделя")){
            return dateNow.plusWeeks(count);
        }else if (typePeriod.equals("Месяц")){
            return dateNow.plusMonths(count);
        }else if (typePeriod.equals("Год")){
            return dateNow.plusYears(count);
        }
        return dateNow;
    }

    public void mySave(User user){
        userRepo.save(user);
    }

    public ResponseEntity<String> noteCome(User user){

        user.setCountVisit(user.getCountVisit()-1);
        user.setInGym(true);
        ClubVisits clubVisits = new ClubVisits();
        clubVisits.setLocalDateTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMMM yyyy, HH:mm")));
        clubVisits.setUser(user);
        clubVisitsRepo.save(clubVisits);
        userRepo.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public ResponseEntity<String> noteLeft(User user){
        user.setInGym(false);
        ClubVisits clubVisits = user.getClubVisits().get(user.getClubVisits().size()-1);
        clubVisits.setLocalTimeLeft(LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm")));
        clubVisitsRepo.save(clubVisits);
        userRepo.save(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public Set<User> getClients(){
        List<User> users = userRepo.findAll();
        Set<User> clients = new HashSet<>();
        for (User u : users){
            if (!u.getRoles().contains(Role.ADMIN)){
                clients.add(u);
            }
        }
        return clients;
    }
}
