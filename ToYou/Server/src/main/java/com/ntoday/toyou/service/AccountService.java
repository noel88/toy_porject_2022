package com.ntoday.toyou.service;


import com.ntoday.toyou.controller.request.AccountRequest;
import com.ntoday.toyou.controller.response.AccountResponse;
import com.ntoday.toyou.domain.Account;
import com.ntoday.toyou.repository.AccountRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

    private final ModelMapper mapper = new ModelMapper();
    private AccountRepository accountRepository;
    private PasswordEncoder passwordEncoder;

    public AccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AccountResponse registerAccount(AccountRequest accountRequest) {
        accountRequest.setPassword(passwordEncoder.encode(accountRequest.getPassword()));
        Account account = mapper.map(accountRequest, Account.class);
        Account saveAccount = accountRepository.save(account);

        return mapper.map(saveAccount, AccountResponse.class);
    }

    public AccountResponse getAccountToResponse(Long id) {
        Account account = getAccount(id);

        return mapper.map(account, AccountResponse.class);
    }

    private Account getAccount(Long id) {
        Optional<Account> getAccount = accountRepository.findById(id);
        Account account = getAccount.orElseThrow(() -> new UsernameNotFoundException("Not found id"));
        return account;
    }

    public AccountResponse updateAccount(AccountRequest accountRequest) {
        Account account = getAccount(accountRequest.getId());
        Account update = Account.builder()
                .id(account.getId())
                .name(accountRequest.getName())
                .password(passwordEncoder.encode(accountRequest.getPassword()))
                .build();
        accountRepository.save(update);

        return mapper.map(update, AccountResponse.class);
    }
}
