package com.ntoday.mycat.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FeedDTO {

    private String name;
    private String brandName;
    private int price;
    private int weight;
    private CatDTO cat;
}
