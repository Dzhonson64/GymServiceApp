package org.example.Gym2.domain;

import javax.persistence.*;

@Entity
@Table(name = "prices")
public class Pricies {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String duration;
    private Integer price;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "discount_id")
    private Discount discount;

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
