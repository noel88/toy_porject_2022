package com.ntoday.mycat.domain;

import com.ntoday.mycat.domain.audit.DateAudit;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cat extends DateAudit {

    /**
     *  고양이
     *
     *  이름
     *  성별
     *  나이
     *  중량
     *  품종
     *  생일
     *  상태
     *  중성화여부
     *  사료
     *  보유질환
     *  수술기록
     *  접종기록
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private int age;

    @OneToMany(mappedBy = "cat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Weight> weights;

    @Enumerated(EnumType.STRING)
    private Breed breeds;

    private LocalDate birthday;
    private boolean isNeutering;
    private boolean isDead;

    @OneToMany(mappedBy = "cat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Feed> feeds;
    @OneToMany(mappedBy = "cat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Disease> diseases;
    @OneToMany(mappedBy = "cat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Inoculation> inoculations;
    @OneToMany(mappedBy = "cat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Vomit> vomits;

    public void addWeight(Weight weight) {
        this.weights.add(weight);
        weight.setCat(this);
    }

    public void addFeeds(Feed feed) {
        this.feeds.add(feed);
        feed.setCat(this);
    }

    public void addDiseases(Disease disease) {
        this.diseases.add(disease);
        disease.setCat(this);
    }

    public void addInoculations(Inoculation inoculation) {
        this.inoculations.add(inoculation);
        inoculation.setCat(this);
    }

    public void addVomit(Vomit vomit) {
        this.vomits.add(vomit);
        vomit.setCat(this);
    }
}
