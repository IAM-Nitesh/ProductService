package org.springboot.proxyapi.services;
import org.springboot.proxyapi.exceptions.ProductNotFoundException;
import org.springboot.proxyapi.models.Product;
import java.util.List;

// notes :
// all the return types are wrt product and not fakestoreProduct Service
// cons :
// - avoiding any hardcore dependency on the 3rd party application
// - in case there is any change wrt 3rd party application -
// then it can be easily handled by adding new class and implementing ProductService interface

public interface ProductService {
    Product getProductById(Long id) throws ProductNotFoundException;
    List<Product> getAllProducts();
    Product replaceProduct(Long id, Product product);
    Product updateProduct(Long id, Product product);
    Product createProduct(Product product);
    void deleteProduct();
}
