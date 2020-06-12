package org.example.Gym2.domain;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
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

    @OneToMany(mappedBy = "discount", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Pricies> pricies = new ArrayList<>();
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

    public List<Pricies> getPricies() {
        return pricies;
    }

    public void setPricies(List<Pricies> pricies) {
        this.pricies = pricies;
    }

    @Override
    public String toString() {
        return "Discount{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", fileImageBg='" + fileImageBg + '\'' +
                ", pricies=" + pricies +
                '}';
    }
}
