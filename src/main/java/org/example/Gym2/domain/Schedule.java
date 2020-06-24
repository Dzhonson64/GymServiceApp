package org.example.Gym2.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="coach_id")
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private User usr;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="usr_id")
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private User client;


    public static long getSerialVersionUID() {
        return serialVersionUID;
    }
    @JsonIgnore
    public User getClient() {
        return client;
    }
    @JsonIgnore
    public void setClient(User client) {
        this.client = client;
    }

    public Long getId() {
        return id;
    }
    @JsonIgnore
    public User getUsr() {
        return usr;
    }
    @JsonIgnore
    public void setUsr(User usr) {
        this.usr = usr;
    }
    @JsonIgnore
    public void setId(Long id) {
        this.id = id;
    }
    @JsonIgnore
    public Calendar getDateStart() {
        return dateStart;
    }
    @JsonIgnore
    public void setDateStart(Calendar dateStart) {
        this.dateStart = dateStart;
    }
    @JsonIgnore
    public Calendar getDateEnd() {
        return dateEnd;
    }
    @JsonIgnore
    public void setDateEnd(Calendar dateEnd) {
        this.dateEnd = dateEnd;
    }


    @JsonIgnore
    public LocalTime getDuration() {
        return duration;
    }
    @JsonIgnore
    public void setDuration(LocalTime duration) {
        this.duration = duration;
    }
    @JsonIgnore
    public String getType() {
        return type;
    }
    @JsonIgnore
    public void setType(String type) {
        this.type = type;
    }
    @JsonIgnore
    public String getName() {
        return name;
    }
    @JsonIgnore
    public void setName(String name) {
        this.name = name;
    }
}
