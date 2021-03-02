package com.ntoday.mycat.service.specific;

import com.ntoday.mycat.dto.CatDTO;
import com.ntoday.mycat.dto.VomitDTO;
import com.ntoday.mycat.dto.WeightDTO;

import java.util.List;

public interface ApiService {
    List<CatDTO> get();
    CatDTO getFindById(Long id);

    List<WeightDTO> getFindAllWeightByCatId(Long id);
    List<VomitDTO> getFindAllVomitByCatId(Long id);

    void addWeight(Long id, WeightDTO weightDTO);
    void addVomit(Long id, VomitDTO vomitDTO);

    void addCat(CatDTO catDTO);
    void UpdateCat(Long id, CatDTO catDTO);
    void DeleteCat(Long id);
}
