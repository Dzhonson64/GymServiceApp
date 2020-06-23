package org.example.Gym2.domain;

import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalTime;
import java.util.Calendar;

@Entity
@Table(name = "schedule")
public class Schedule implements Serializable {
    private static final long serialVersionUID = 2L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Calendar dateStart;
    private Calendar dateEnd;
    private LocalTime duration;
    private String type;
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="coach_id")
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private User usr;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="usr_id")
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private User client;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }

    public Long getId() {
        return id;
    }

    public User getUsr() {
        return usr;
    }

    public void setUsr(User usr) {
        this.usr = usr;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Calendar getDateStart() {
        return dateStart;
    }

    public void setDateStart(Calendar dateStart) {
        this.dateStart = dateStart;
    }

    public Calendar getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(Calendar dateEnd) {
        this.dateEnd = dateEnd;
    }




    public LocalTime getDuration() {
        return duration;
    }

    public void setDuration(LocalTime duration) {
        this.duration = duration;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
