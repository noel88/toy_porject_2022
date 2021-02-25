package com.ntoday.mycat.api;


import com.ntoday.mycat.domain.repository.CatRepository;
import com.ntoday.mycat.dto.CatDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cat")
public class CatApi {

    private final CatRepository catRepository;


    @GetMapping()
    public String getCat() {
        return "getCat";
    }

    @PostMapping()
    public ResponseEntity CatSave(@RequestBody CatDTO catDTO) {
        System.out.println("catDTO" + catDTO.toString());
        return new ResponseEntity("created", HttpStatus.CREATED);
    }
}
