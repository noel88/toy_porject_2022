package com.ntoday.toyou.controller.response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AccountResponse {

    private String name;
    private String email;
}
