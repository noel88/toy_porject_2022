package com.ntoday.mycat.domain;

import com.ntoday.mycat.domain.audit.DateAudit;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Feed extends DateAudit {

    /**
     * 사료
     *
     * 이름
     * 브랜드명
     * 가격
     * kg수
     *
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String brandName;
    private int price;
    private int weight;

    @ManyToOne(fetch = FetchType.LAZY)
    private Cat cat;
}
