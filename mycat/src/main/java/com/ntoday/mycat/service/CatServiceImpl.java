package com.ntoday.mycat.service;

import com.ntoday.mycat.domain.Cat;
import com.ntoday.mycat.domain.repository.CatRepository;
import com.ntoday.mycat.dto.CatDTO;
import com.ntoday.mycat.service.specific.CatService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CatServiceImpl implements CatService {

    private final CatRepository catRepository;
    private final ModelMapper mapper;

    @Override
    public List<CatDTO> get() {
        List<Cat> cats = catRepository.findAll();
        return mapper.map(cats, new TypeToken<List<CatDTO>>() {}.getType());
    }

    @Override
    public CatDTO getFindById(Long id) {
        Optional<Cat> getFindById = catRepository.findById(id);
        //TODO: Make custom Exception
        Cat cat = getFindById.orElseThrow(RuntimeException::new);
        return mapper.map(cat, CatDTO.class);
    }

    @Override
    public void save(CatDTO catDTO) {
        Cat map = mapper.map(catDTO, Cat.class);
        catRepository.save(map);
    }

    @Override
    public void update(Long id, CatDTO catDTO) {
        Optional<Cat> getCat = catRepository.findById(id);
        getCat.ifPresent(cat -> Cat.builder()
                .age(catDTO.getAge())
                .birthday(catDTO.getBirthday())
                .gender(catDTO.getGender())
                .isDead(catDTO.isDead())
                .isNeutering(catDTO.isNeutering())
                .name(catDTO.getName())
                .breeds(catDTO.getBreeds())
                .build());
    }

    @Override
    public void delete(Long id) {
        Optional<Cat> getCat = catRepository.findById(id);
        getCat.ifPresent(catRepository::delete);
    }
}
