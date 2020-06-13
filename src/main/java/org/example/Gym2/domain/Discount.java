package org.example.Gym2.domain;

import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "discount")
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String name = "-";
    @NotNull
    private String description = "-";
    private String fileImageBg;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "selectedPrice_id", referencedColumnName = "id")
    private Pricies selectedPrice;

    @OneToOne(mappedBy = "selectedDiscount", fetch = FetchType.EAGER)
    private User userInto;

    @OneToMany(mappedBy = "discount", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Pricies> pricies = new HashSet<>();
    public String getFileImageBg() {
        return fileImageBg;
    }


    public User getUserInto() {
        return userInto;
    }

    public void setUserInto(User userInto) {
        this.userInto = userInto;
    }

    public Pricies getSelectedPrice() {
        return selectedPrice;
    }

    public void setSelectedPrice(Pricies selectedPrice) {
        this.selectedPrice = selectedPrice;
    }

    public void setFileImageBg(String fileImageBg) {
        this.fileImageBg = fileImageBg;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Pricies> getPricies() {
        return pricies;
    }

    public void setPricies(Set<Pricies> pricies) {
        this.pricies = pricies;
    }
}
