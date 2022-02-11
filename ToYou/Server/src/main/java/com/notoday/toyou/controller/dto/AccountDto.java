package com.notoday.toyou.controller.dto;


import lombok.*;

import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountDto {

    private String name;
    private String email;
    private String password;



    public void nonNullCheck() {
        Objects.requireNonNull(this.name);
        Objects.requireNonNull(this.email);
        Objects.requireNonNull(this.password);
    }

}
