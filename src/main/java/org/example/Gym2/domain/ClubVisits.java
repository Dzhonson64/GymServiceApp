package org.example.Gym2.domain;

import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "clubVisits")
public class ClubVisits implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private static final long serialVersionUID = 1L;

    @ManyToOne()
    @JoinColumn(name="user_id", nullable=false)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private User user;
    private String localDateTime;
    private String localTimeLeft;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocalDateTime() {
        return localDateTime;
    }

    public void setLocalDateTime(String localDateTime) {
        this.localDateTime = localDateTime;
    }

    public String getLocalTimeLeft() {
        return localTimeLeft;
    }

    public void setLocalTimeLeft(String localTimeLeft) {
        this.localTimeLeft = localTimeLeft;
    }
}
