package com.ntoday.mycat.api;

import com.ntoday.mycat.dto.VomitDTO;
import com.ntoday.mycat.dto.WeightDTO;
import com.ntoday.mycat.service.specific.ApiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vomit")
public class VomitApi {

    private final ApiService service;

    @GetMapping("/{id}")
    public ResponseEntity<Object> getVomit(@PathVariable Long id) {
        List<WeightDTO> getFindAllWeightByCatId = service.getFindAllWeightByCatId(id);
        return new ResponseEntity<>(getFindAllWeightByCatId, HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<Object> addVomit(@PathVariable Long id, @RequestBody VomitDTO vomitDTO) {
        service.addVomit(id, vomitDTO);
        return new ResponseEntity<>("created", HttpStatus.CREATED);
    }
}
