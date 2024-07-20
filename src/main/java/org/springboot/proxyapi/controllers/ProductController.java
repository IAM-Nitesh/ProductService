package org.springboot.proxyapi.controllers;

import org.springboot.proxyapi.models.Product;
import org.springboot.proxyapi.services.ProductService;
import org.springframework.web.bind.annotation.*;

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
        return productService.getAllProducts();
    }

    @PutMapping({"/{id}"})
    public Product replaceProduct(@PathVariable("id") Long id, @RequestBody Product product){
        return productService.replaceProduct(id, product);
    }


//    @PostMapping()
//    public Product createProduct(@RequestBody Product product){
//
//    }
    // createProduct
    // deleteProduct
    // updateProduct
    // replaceProduct
}
