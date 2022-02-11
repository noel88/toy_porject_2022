package com.notoday.toyou.util;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.experimental.Accessors;

@Getter
@Accessors(chain = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class PageMetadata {
    private final int size;
    private final long totalElements;
    private final int totalPages;
    private final int number;

    public PageMetadata(int size, long totalElements, int totalPages, int number) {
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.number = number;
    }
}
