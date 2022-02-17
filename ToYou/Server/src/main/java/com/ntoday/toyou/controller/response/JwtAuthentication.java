package com.ntoday.toyou.controller.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtAuthentication {

    private String accessToken;
    private String tokenType = "Bearer";


    public JwtAuthentication(String accessToken) {
        this.accessToken = accessToken;
    }


}
