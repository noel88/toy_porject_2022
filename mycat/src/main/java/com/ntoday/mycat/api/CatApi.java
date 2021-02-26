package com.ntoday.mycat.api;


import com.ntoday.mycat.dto.CatDTO;
import com.ntoday.mycat.service.specific.CatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cat")
public class CatApi {

    private final CatService service;

    @GetMapping()
    public String getCat() {
        return "getCat";
    }

    @PostMapping()
    public ResponseEntity<Object> CatSave(@RequestBody CatDTO catDTO) {
        service.save(catDTO);
        System.out.println("catDTO" + catDTO.toString());
        return new ResponseEntity<>("created", HttpStatus.CREATED);
    }
}
