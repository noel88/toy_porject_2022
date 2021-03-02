package com.ntoday.mycat.dto;

import com.ntoday.mycat.domain.Breed;
import com.ntoday.mycat.domain.Gender;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
public class CatDTO {

    private Long id;
    private String name;
    private Gender gender;
    private int age;
    private List<WeightDTO> weight;
    private Breed breeds;
    private LocalDate birthday;
    private boolean isNeutering;
    private boolean isDead;
    private List<FeedDTO> feed;
    private List<DiseaseDTO> diseases;
    private List<InoculationDTO> inoculation;
}
