package com.notoday.toyou.security;

import com.notoday.toyou.domain.Account;
import com.notoday.toyou.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
public class CustomUserDetailService implements UserDetailsService {

    private AccountRepository repository;

    public CustomUserDetailService(AccountRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = repository.findByNameOrEmail(username, username)
                .orElseThrow(()-> new UsernameNotFoundException("User not found with username or email : " + username));
        return UserPrincipal.create(account);
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        Account account = repository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found with id : " + id));
        return UserPrincipal.create(account);

    }
}
