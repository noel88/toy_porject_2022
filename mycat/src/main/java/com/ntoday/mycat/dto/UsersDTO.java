package com.ntoday.mycat.dto;

import com.ntoday.mycat.domain.audit.DateAudit;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
public class UsersDTO {

    private String name;
    private String password;
    private String email;

//    private List<CatDTO> cats;
}
