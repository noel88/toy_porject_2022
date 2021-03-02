package com.ntoday.mycat.service;

import com.ntoday.mycat.domain.Cat;
import com.ntoday.mycat.domain.Vomit;
import com.ntoday.mycat.domain.Weight;
import com.ntoday.mycat.domain.repository.CatRepository;
import com.ntoday.mycat.dto.CatDTO;
import com.ntoday.mycat.dto.VomitDTO;
import com.ntoday.mycat.dto.WeightDTO;
import com.ntoday.mycat.service.specific.ApiService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ApiServiceImpl implements ApiService {

    private final CatRepository catRepository;
    private final ModelMapper mapper;

    @Override
    public List<CatDTO> get() {
        List<Cat> cats = catRepository.findAll();
        return mapper.map(cats, new TypeToken<List<CatDTO>>() {}.getType());
    }

    @Override
    public List<WeightDTO> getFindAllWeightByCatId(Long id) {
        Optional<Cat> getByCatId = catRepository.findById(id);
        //TODO: Make custom Exception
        Cat cat = getByCatId.orElseThrow(RuntimeException::new);
        return mapper.map(cat.getWeights(), new TypeToken<List<CatDTO>>() {}.getType());
    }

    @Override
    public List<VomitDTO> getFindAllVomitByCatId(Long id) {
        Optional<Cat> getByCatId = catRepository.findById(id);
        //TODO: Make custom Exception
        Cat cat = getByCatId.orElseThrow(RuntimeException::new);
        return mapper.map(cat.getVomits(), new TypeToken<List<CatDTO>>() {}.getType());
    }

    @Override
    public CatDTO getFindById(Long id) {
        Optional<Cat> getFindById = catRepository.findById(id);
        //TODO: Make custom Exception
        Cat cat = getFindById.orElseThrow(RuntimeException::new);
        return mapper.map(cat, CatDTO.class);
    }

    @Override
    public void addWeight(Long id, WeightDTO weightDTO) {
        Optional<Cat> getByCatId = catRepository.findById(id);
        //TODO: Make custom Exception
        Cat cat = getByCatId.orElseThrow(RuntimeException::new);
        cat.addWeight(mapper.map(weightDTO, Weight.class));
        catRepository.save(cat);
    }

    @Override
    public void addVomit(Long id, VomitDTO vomitDTO) {
        Optional<Cat> getByCatId = catRepository.findById(id);
        //TODO: Make custom Exception
        Cat cat = getByCatId.orElseThrow(RuntimeException::new);
        cat.addVomit(mapper.map(vomitDTO, Vomit.class));
        catRepository.save(cat);
    }

    @Override
    public void addCat(CatDTO catDTO) {
        Cat map = mapper.map(catDTO, Cat.class);
        catRepository.save(map);
    }

    @Override
    public void UpdateCat(Long id, CatDTO catDTO) {
        Optional<Cat> getCat = catRepository.findById(id);
        Cat cat = getCat.orElseThrow(RuntimeException::new);
        cat.setAge(catDTO.getAge());
        cat.setBirthday(catDTO.getBirthday());
        cat.setGender(catDTO.getGender());
        cat.setName(catDTO.getName());
        cat.setDead(catDTO.isDead());
        cat.setNeutering(catDTO.isNeutering());
        cat.setBreeds(catDTO.getBreeds());

        catRepository.save(cat);
    }

    @Override
    public void DeleteCat(Long id) {
        Optional<Cat> getCat = catRepository.findById(id);
        getCat.ifPresent(catRepository::delete);
    }
}
