package com.ntoday.mycat.service.specific;

import com.ntoday.mycat.dto.CatDTO;

import java.util.List;

public interface CatService {
    List<CatDTO> get();
    CatDTO getFindById(Long id);
    void save(CatDTO catDTO);
    void update(Long id, CatDTO catDTO);
    void delete(Long id);
}
