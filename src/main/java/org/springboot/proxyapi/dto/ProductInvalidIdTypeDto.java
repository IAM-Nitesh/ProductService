package org.springboot.proxyapi.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductInvalidIdTypeDto {
    String errorMessage;
    String resolution;
}
