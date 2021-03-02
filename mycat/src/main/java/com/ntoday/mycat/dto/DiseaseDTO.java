package com.ntoday.mycat.dto;

import com.ntoday.mycat.domain.Cat;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DiseaseDTO {
    private String name;
    private Cat cat;
}
