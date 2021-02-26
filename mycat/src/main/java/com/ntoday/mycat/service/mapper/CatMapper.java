package com.ntoday.mycat.service.mapper;

import com.ntoday.mycat.domain.Cat;
import com.ntoday.mycat.dto.CatDTO;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CatMapper {
    private final ModelMapper modelMapper = new ModelMapper();

    @Bean
    public ModelMapper mapper() {
        // 매핑 전략 설정
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT);
        modelMapper.createTypeMap(Cat.class, CatDTO.class);
        return modelMapper;
    }
}
