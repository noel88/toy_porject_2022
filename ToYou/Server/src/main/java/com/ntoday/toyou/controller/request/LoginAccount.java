package com.ntoday.toyou.controller.request;


import lombok.Builder;
import lombok.Data;

import java.util.Objects;

@Data
@Builder
public class LoginAccount {

    private String email;
    private String password;

    public void nonNullCheck() {
        Objects.requireNonNull(this.email);
        Objects.requireNonNull(this.password);
    }

}
