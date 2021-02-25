package com.ntoday.mycat.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class CatDTO {

    private String name;
    private String gender;
    private String age;
    private List<WeightDTO> weight;
    private String kind;
    private String birthday;
    private boolean isNeutering;
    private String isDead;
    private List<FeedDTO> feed;
    private List<DiseaseDTO> diseases;
    private List<InoculationDTO> inoculation;
}
