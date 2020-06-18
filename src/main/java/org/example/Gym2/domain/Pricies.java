package org.example.Gym2.domain;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "prices")
public class Pricies {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String duration = "День";
    private Integer price = 0;
    private Integer countDuration = 0;
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "discount_id")
//    private Discount discount;

//    @OneToOne(mappedBy = "selectedPrice", fetch = FetchType.EAGER)
//    private Discount discountInto;



    @OneToMany(mappedBy = "price_id_Discount_AllPrices")
    private Set<Discount_AllPrices> discount_allprices;


    public Integer getCountDuration() {
        return countDuration;
    }

    public void setCountDuration(Integer countDuration) {
        this.countDuration = countDuration;
    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

}
