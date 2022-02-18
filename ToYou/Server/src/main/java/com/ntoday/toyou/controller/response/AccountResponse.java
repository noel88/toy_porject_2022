package com.ntoday.toyou.controller.response;


import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountResponse {

    private String name;
    private String email;
}
