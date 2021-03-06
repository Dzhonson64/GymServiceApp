package org.example.Gym2.domain;

import javafx.collections.transformation.SortedList;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "usr")
public class User implements UserDetails, Serializable {

    private static final long serialVersionUID = 2L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank(message = "Необходимо указать логин")
    private String username;
    @NotBlank(message = "Необходимо указать пароль")
    private String password;
    private boolean active;
    private String filename;
    private LocalDate localDateSubscribeDiscount;
    @NotBlank(message = "Необходимо указать имя")
    private String name;
    @NotBlank(message = "Необходимо указать фамилию")
    private String surname;
    @NotBlank(message = "Необходимо указать отество")
    private String patronymic;
    private String gender;
    @NotNull(message = "Необходимо указать возраст")
    @Min(value = 10, message = "Возраст должен быть больше 10")
    private Integer age;
    private String idDiscount;
    private Integer countVisit;
    private boolean isInGym = false;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    List<ClubVisits> clubVisits = new LinkedList<>();

    @OneToMany(mappedBy = "usr", fetch = FetchType.EAGER)
    Set<Schedule> schedules = new HashSet<>();

    @OneToMany(mappedBy = "client", fetch = FetchType.EAGER)
    Set<Schedule> schedulesClient = new HashSet<>();





    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "discount_user2",
            joinColumns = {
                    @JoinColumn(name = "user_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "discount_price_id")})
    private Discount_AllPrices discount_users;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;

    public Set<Schedule> getSchedulesClient() {
        return schedulesClient;
    }

    public void setSchedulesClient(Set<Schedule> schedulesClient) {
        this.schedulesClient = schedulesClient;
    }

    public Integer getCountVisit() {
        return countVisit;
    }

    public void setCountVisit(Integer countVisit) {
        this.countVisit = countVisit;
    }

    public List<ClubVisits> getClubVisits() {
        return clubVisits;
    }

    public Set<Schedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(Set<Schedule> schedules) {
        this.schedules = schedules;
    }

    public boolean isInGym() {
        return isInGym;
    }

    public void setInGym(boolean inGym) {
        isInGym = inGym;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public void setClubVisits(List<ClubVisits> clubVisits) {
        this.clubVisits = clubVisits;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getIdDiscount() {
        return idDiscount;
    }

    public void setIdDiscount(String idDiscount) {
        this.idDiscount = idDiscount;
    }

    public LocalDate getLocalDateSubscribeDiscount() {
        return localDateSubscribeDiscount;
    }

    public void setLocalDateSubscribeDiscount(LocalDate localDateSubscribeDiscount) {
        this.localDateSubscribeDiscount = localDateSubscribeDiscount;
    }

    public Discount_AllPrices getDiscount_users() {
        return discount_users;
    }

    public void setDiscount_users(Discount_AllPrices discount_users) {
        this.discount_users = discount_users;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPatronymic() {
        return patronymic;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Long getId() {
        return id;
    }

    public boolean isAdmin(){
        return roles.contains(Role.ADMIN);
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isActive();
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", active=" + active +
                ", filename='" + filename + '\'' +
                ", roles=" + roles +
                '}';
    }
}
