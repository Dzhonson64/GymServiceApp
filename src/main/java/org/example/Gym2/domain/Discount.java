package org.example.Gym2.domain;




import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "discount")
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private String fileImageBg;




    @OneToMany(mappedBy = "discount", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Pricies> pricies;

    @OneToOne(mappedBy = "discountSelect", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "selectedPrice")
    private Pricies selectedPrice;

    public Pricies getSelectedPrice() {
        return selectedPrice;
    }

    public void setSelectedPrice(Pricies selectedPrice) {
        this.selectedPrice = selectedPrice;
    }

    public String getFileImageBg() {
        return fileImageBg;
    }

    public void setFileImageBg(String fileImageBg) {
        this.fileImageBg = fileImageBg;
    }
    public String getDescription() {
        return description;
    }

    public void setPricies(List<Pricies> pricies) {
        this.pricies = pricies;
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

    public List<Pricies> getPricies() {
        return pricies;
    }
}
