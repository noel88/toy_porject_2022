package com.ntoday.mycat.api;
import com.ntoday.mycat.dto.CatDTO;
import com.ntoday.mycat.service.specific.ApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cat")
public class CatApi {

    private final ApiService service;

    @GetMapping()
    public ResponseEntity<Object> getCat() {
        List<CatDTO> catDTOs = service.get();
        return new ResponseEntity<>(catDTOs, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Object> save(@RequestBody CatDTO catDTO) {
        service.addCat(catDTO);
        return new ResponseEntity<>("created", HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> edit(@PathVariable Long id) {
        CatDTO getCat = service.getFindById(id);
        return new ResponseEntity<>(getCat, HttpStatus.OK);
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<Object> update(@PathVariable Long id, @RequestBody CatDTO catDTO) {
        service.UpdateCat(id, catDTO);
        return new ResponseEntity<>("update", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        service.DeleteCat(id);
        return new ResponseEntity<>("delete", HttpStatus.OK);
    }
}
