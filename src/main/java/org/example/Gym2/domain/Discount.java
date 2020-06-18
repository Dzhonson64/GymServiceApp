package org.example.Gym2.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "discount")
public class Discount implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String name = "-";
    @NotNull
    private String description = "-";
    private String fileImageBg;

//    @OneTo(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    @JoinColumn(name = "selectedPrice_id", referencedColumnName = "id")
//    private Pricies selectedPrice;

    @OneToMany(mappedBy = "discount_id_Discount_AllPrices")
    private Set<Discount_AllPrices> discount_allprices;


//    @OneToMany(mappedBy = "discount", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
//    private Set<Pricies> pricies = new HashSet<>();
    public String getFileImageBg() {
        return fileImageBg;
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


}
