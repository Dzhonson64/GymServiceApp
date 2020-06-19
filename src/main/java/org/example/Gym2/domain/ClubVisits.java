package org.example.Gym2.domain;

import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

@Entity
@Table(name = "clubVisits")
public class ClubVisits {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private User user;
    private Calendar localDateTime;

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

    public Calendar getLocalDateTime() {
        return localDateTime;
    }

    public void setLocalDateTime(Calendar localDateTime) {
        this.localDateTime = localDateTime;
    }
}
