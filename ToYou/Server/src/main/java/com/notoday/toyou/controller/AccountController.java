package com.notoday.toyou.controller;


import com.notoday.toyou.controller.dto.AccountDto;
import com.notoday.toyou.controller.dto.request.LoginAccount;
import com.notoday.toyou.controller.dto.request.RegisterAccount;
import com.notoday.toyou.controller.dto.response.JwtAuthentication;
import com.notoday.toyou.security.JwtTokenProvider;
import com.notoday.toyou.service.AccountService;
import com.notoday.toyou.util.Response;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/account")
public class AccountController {

    private final ModelMapper mapper = new ModelMapper();
    private final AccountService accountService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;


    /**
     * 회원가입 API
     * @param registerAccount
     * @return Response
     */
    @PostMapping("/signup")
    public Response signUp(@RequestBody RegisterAccount registerAccount) {
        AccountDto accountDto = requestRegisterAccountToDto(registerAccount);
        return Response.ok().setPayload(accountService.registerAccount(accountDto));
    }

    /**
     * 로그인 API
     * @param loginAccount
     * @return
     */
    @PostMapping("/signin")
    public Response signIn(@RequestBody LoginAccount loginAccount) {
        AccountDto accountDto = requestLoginAccountToDto(loginAccount);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        accountDto.getEmail(),
                        accountDto.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtTokenProvider.generateToken(authentication);

        return Response.ok().setPayload(new JwtAuthentication(jwt));
    }

    private AccountDto requestRegisterAccountToDto(RegisterAccount registerAccount) {
        registerAccount.nonNullCheck();
        String encodePassword = passwordEncoder.encode(registerAccount.getPassword());
        registerAccount.setPassword(encodePassword);
        return mapper.map(registerAccount, AccountDto.class);
    }

    private AccountDto requestLoginAccountToDto(LoginAccount loginAccount) {
        loginAccount.nonNullCheck();
        return mapper.map(loginAccount, AccountDto.class);
    }

    //로그아웃
    public ResponseEntity signOut() {
        return new ResponseEntity(HttpStatus.OK);
    }


    //내정보 확인
    public ResponseEntity getMyAccount() {
        return new ResponseEntity(HttpStatus.OK);
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