package com.ntoday.toyou.controller;


import com.ntoday.toyou.controller.request.LoginAccount;
import com.ntoday.toyou.controller.request.AccountRequest;
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
    private final JwtTokenProvider jwtTokenProvider;


    /**
     * 회원가입 API
     * @param accountRequest
     * @return Response
     */
    @PostMapping("/auth/signup")
    public Response signUp(@RequestBody AccountRequest accountRequest) {
        return Response.ok().setPayload(accountService.registerAccount(accountRequest));
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
     * 내 정보 확인 API
     * @param authToken
     * @return
     */
    @GetMapping("/getAccount")
    public Response getMyAccount(String authToken) {
        Long id = jwtTokenProvider.getUserFromJWT(authToken);
        return Response.ok().setPayload(accountService.getAccountToResponse(id));
    }

    /**
     * 내 정보 업데이트 API
     * @param accountRequest
     * @return
     */
    public Response updateMyAccount(AccountRequest accountRequest) {
        return Response.ok().setPayload(accountService.updateAccount(accountRequest));
    }

    /**
     * 탈퇴 API
     * @param authToken
     * @return
     */
    public Response removeAccount(String authToken) {
        Long id = jwtTokenProvider.getUserFromJWT(authToken);
        return Response.ok().setPayload(accountService.removeAccount(id));
    }







}