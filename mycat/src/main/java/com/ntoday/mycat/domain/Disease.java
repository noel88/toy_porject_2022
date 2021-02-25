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
public class Disease extends DateAudit {
    /**
     * 질병
     *
     * 질병명
     *
     *
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    private Cat cat;
}
