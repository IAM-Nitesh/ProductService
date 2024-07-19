package org.springboot.proxyapi.controllers;

import org.springboot.proxyapi.models.Product;
import org.springboot.proxyapi.services.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
@RequestMapping({"/products"})
public class ProductController {

    ProductService productService;

    ProductController(ProductService productService) {
        this.productService = productService;
    }

    //localhost:8080/products/id
    @GetMapping({"/{id}"})
    public Product getProductById(@PathVariable("id") Long id){
        return productService.getProductById(id);
    }

    //localhost:8080/products
    @GetMapping()
    public List<Product> getAllProducts(){
        return new ArrayList<Product>();
    }

    // createProduct
    // deleteProduct
    // updateProduct
    // replaceProduct
}
