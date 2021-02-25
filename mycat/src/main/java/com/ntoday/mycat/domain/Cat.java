package com.ntoday.mycat.domain;

import com.ntoday.mycat.domain.audit.DateAudit;
import lombok.*;

import javax.persistence.*;
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
    private String gender;
    private String age;

    @OneToMany(mappedBy = "cat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Weight> weight;

    private String kind;
    private String birthday;
    private boolean isNeutering;
    private String isDead;

    @OneToMany(mappedBy = "cat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Feed> feed;
    @OneToMany(mappedBy = "cat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Disease> diseases;
    @OneToMany(mappedBy = "cat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Inoculation> inoculation;

//    @ManyToOne(fetch = FetchType.LAZY)
//    private Users user;
}
