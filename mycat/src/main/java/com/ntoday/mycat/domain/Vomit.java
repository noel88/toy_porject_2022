package com.ntoday.mycat.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vomit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private VomitingColor vomitingColor;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    private Cat cat;
}
