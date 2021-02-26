package com.ntoday.mycat.service;

import com.ntoday.mycat.domain.Cat;
import com.ntoday.mycat.domain.repository.CatRepository;
import com.ntoday.mycat.dto.CatDTO;
import com.ntoday.mycat.service.mapper.CatMapper;
import com.ntoday.mycat.service.specific.CatService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;

@RequiredArgsConstructor
public class CatServiceImpl implements CatService {

    private final CatRepository catRepository;
    private final CatMapper mapper;

    @Override
    public void save(CatDTO catDTO) {
        catRepository.save();
    }
}
