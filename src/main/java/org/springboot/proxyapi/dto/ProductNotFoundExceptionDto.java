package org.springboot.proxyapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductNotFoundExceptionDto {
    private String errormessage;
    private String resolution;
}
