package com.ntoday.mycat.dto;

import com.ntoday.mycat.domain.Cat;
import com.ntoday.mycat.domain.audit.DateAudit;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
public class FeedDTO {

    private String name;
    private String brandName;
    private int price;
    private int weight;
    private CatDTO cat;
}
