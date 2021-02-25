package com.ntoday.mycat.domain;

import com.ntoday.mycat.domain.audit.DateAudit;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Inoculation extends DateAudit {

    /**
     * 접종기록
     *
     * 접종명
     * 접종날짜
     *
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    private Cat cat;
}
