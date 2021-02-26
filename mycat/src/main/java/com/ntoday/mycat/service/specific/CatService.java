package com.ntoday.mycat.service.specific;

import com.ntoday.mycat.dto.CatDTO;
import org.springframework.stereotype.Service;

@Service
public interface CatService {

    void save(CatDTO catDTO);
}
