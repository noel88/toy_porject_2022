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

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public AccountResponse registerAccount(RegisterAccount registerAccount) {
        Account account = mapper.map(registerAccount, Account.class);
        Account saveAccount = accountRepository.save(account);

        return mapper.map(saveAccount, AccountResponse.class);
    }

    public AccountResponse getAccount(Long id) {
        Optional<Account> getAccount = accountRepository.findById(id);
        Account account = getAccount.orElseThrow(() -> new UsernameNotFoundException("Not found id"));

        return mapper.map(account, AccountResponse.class);
    }
}
