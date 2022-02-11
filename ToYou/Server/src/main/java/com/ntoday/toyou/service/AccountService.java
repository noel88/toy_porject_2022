package com.ntoday.toyou.service;


import com.ntoday.toyou.controller.dto.AccountDto;
import com.ntoday.toyou.domain.Account;
import com.ntoday.toyou.repository.AccountRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final ModelMapper mapper = new ModelMapper();
    private AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public AccountDto registerAccount(AccountDto accountDto) {
        Account account = mapper.map(accountDto, Account.class);
        Account saveAccount = accountRepository.save(account);

        return mapper.map(saveAccount, AccountDto.class);
    }
}
