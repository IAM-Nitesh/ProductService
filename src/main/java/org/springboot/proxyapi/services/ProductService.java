package org.springboot.proxyapi.services;
import org.springboot.proxyapi.models.Product;
import java.util.List;

public interface ProductService {
    Product getProductById(Long id);
    List<Product> getAllProducts();
    Product replaceProduct(Long id, Product product);

}
