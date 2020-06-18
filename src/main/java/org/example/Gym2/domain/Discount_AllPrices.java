package org.example.Gym2.domain;

import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "discount_allprice")
public class Discount_AllPrices {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name="discount_id", nullable=false)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Discount discount_id_Discount_AllPrices;

    @ManyToOne
    @JoinColumn(name="price_id", nullable=false)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private Pricies price_id_Discount_AllPrices;

    @OneToMany(mappedBy = "discount_users")
    private Set<User> user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Discount getDiscount_id_Discount_AllPrices() {
        return discount_id_Discount_AllPrices;
    }

    public void setDiscount_id_Discount_AllPrices(Discount discount_id_Discount_AllPrices) {
        this.discount_id_Discount_AllPrices = discount_id_Discount_AllPrices;
    }

    public Pricies getPrice_id_Discount_AllPrices() {
        return price_id_Discount_AllPrices;
    }

    public void setPrice_id_Discount_AllPrices(Pricies price_id_Discount_AllPrices) {
        this.price_id_Discount_AllPrices = price_id_Discount_AllPrices;
    }
}
