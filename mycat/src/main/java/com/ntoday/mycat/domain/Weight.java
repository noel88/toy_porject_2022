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
public class Weight extends DateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int weight;

    @ManyToOne(fetch = FetchType.LAZY)
    private Cat cat;

}
