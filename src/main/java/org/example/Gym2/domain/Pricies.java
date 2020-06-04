package org.example.Gym2.domain;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import javax.persistence.*;


@Entity
@Table(name = "prices")
public class Pricies {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String durationPeriod;
    private Integer durationNum;
    private Integer price;

//    @OneToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "discount_id")
//    private User user;

    @OneToOne(fetch = FetchType.EAGER)
    private Discount discountSelect;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "discount_id")
    private Discount discount;

    public Discount getDiscountSelect() {
        return discountSelect;
    }

    public void setDiscountSelect(Discount discountSelect) {
        this.discountSelect = discountSelect;
    }

    public Discount getDiscount() {
        return discount;
    }

    public void setDiscount(Discount discount) {
        this.discount = discount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDurationPeriod() {
        return durationPeriod;
    }

    public void setDurationPeriod(String durationPeriod) {
        this.durationPeriod = durationPeriod;
    }

    public Integer getDurationNum() {
        return durationNum;
    }

    public void setDurationNum(Integer durationNum) {
        this.durationNum = durationNum;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
