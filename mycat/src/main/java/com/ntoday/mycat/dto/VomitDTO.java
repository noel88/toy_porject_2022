package com.ntoday.mycat.dto;

import com.ntoday.mycat.domain.VomitingColor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VomitDTO {

    private Long id;
    private VomitingColor vomitingColor;
    private String description;
}
