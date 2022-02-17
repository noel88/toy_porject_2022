package com.ntoday.toyou.controller;


import com.ntoday.toyou.controller.request.LoginAccount;
import com.ntoday.toyou.controller.request.RegisterAccount;
import com.ntoday.toyou.controller.response.JwtAuthentication;
import com.ntoday.toyou.security.JwtTokenProvider;
import com.ntoday.toyou.service.AccountService;
import com.ntoday.toyou.util.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/account")
public class AccountController {

    private final AccountService accountService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;


    /**
     * 회원가입 API
     * @param registerAccount
     * @return Response
     */
    @PostMapping("/auth/signup")
    public Response signUp(@RequestBody RegisterAccount registerAccount) {
        registerAccount.setPassword(passwordEncoder.encode(registerAccount.getPassword()));
        return Response.ok().setPayload(accountService.registerAccount(registerAccount));
    }

    /**
     * 로그인 API
     * @param loginAccount
     * @return
     */
    @PostMapping("/auth/signin")
    public Response signIn(@RequestBody LoginAccount loginAccount) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginAccount.getEmail(),
                        loginAccount.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenProvider.generateToken(authentication);

        return Response.ok().setPayload(new JwtAuthentication(jwt));
    }

    //TODO: 로그아웃을 어떻게 처리할 것인지 고민해봐야 함.
    /**
     * 로그아웃 API
     * @param authToken
     * @return
     */
    @GetMapping("/signout")
    public Response signOut(String authToken) {
        return jwtTokenProvider.validateToken(authToken) ? Response.ok() : Response.accessDenied();
    }

    /**
     * 내 정보 확인
     * @param authToken
     * @return
     */
    @GetMapping("/getAccount")
    public Response getMyAccount(String authToken) {
        Long id = jwtTokenProvider.getUserFromJWT(authToken);
        return Response.ok().setPayload(accountService.getAccount(id));
    }

    //내 정보 수정
    public ResponseEntity updateMyAccount() {
        return new ResponseEntity(HttpStatus.OK);
    }

    //탈퇴
    public ResponseEntity removeAccount() {
        return new ResponseEntity(HttpStatus.OK);
    }







}
