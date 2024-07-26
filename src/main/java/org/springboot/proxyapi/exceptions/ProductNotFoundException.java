package org.springboot.proxyapi.exceptions;
import lombok.Getter;
import lombok.Setter;

/* Notes :
 - This is a custom exception handler class for when the product id is not found
 - This class extends the Exception class so that it can be a checked exception
 - This class has product id and message which will be useful to send info back to client
*/

@Getter
@Setter
public class ProductNotFoundException extends Exception{

    private Long id;
    private String errorMessage;
    private String resolution;

    public ProductNotFoundException(Long id, String errorMessage, String resolution) {
        super(errorMessage);
        this.errorMessage = errorMessage;
        this.resolution = resolution;
        this.id =id;
    }
}
