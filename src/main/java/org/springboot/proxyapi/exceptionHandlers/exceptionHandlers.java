package org.springboot.proxyapi.exceptionHandlers;

import org.springboot.proxyapi.dto.ProductInvalidIdTypeDto;
import org.springboot.proxyapi.dto.ProductNotFoundExceptionDto;
import org.springboot.proxyapi.exceptions.ProductNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

/*
notes :




*/

@ControllerAdvice
public class exceptionHandlers {

    @ExceptionHandler(ArrayIndexOutOfBoundsException.class)
    public ResponseEntity<Void> handleArrayOutOfBoundException() {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ProductNotFoundExceptionDto> handleProductNotFoundException(ProductNotFoundException productNotFoundException) {
        ProductNotFoundExceptionDto dto = new ProductNotFoundExceptionDto();
        dto.setErrormessage(productNotFoundException.getErrorMessage());
        dto.setResolution(productNotFoundException.getResolution());
        return new ResponseEntity<>(dto,HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ProductInvalidIdTypeDto> handleProductInvalidTypeException(MethodArgumentTypeMismatchException e){
        ProductInvalidIdTypeDto dto = new ProductInvalidIdTypeDto();
        dto.setErrorMessage("Invalid Id type.");
        dto.setResolution("Please Retry with the id of type:"+e.getRequiredType());
        return new ResponseEntity<>(dto, HttpStatus.BAD_REQUEST);
    }
}
