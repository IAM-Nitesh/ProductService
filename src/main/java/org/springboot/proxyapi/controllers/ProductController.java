package org.springboot.proxyapi.controllers;

import org.springboot.proxyapi.models.Product;
import org.springboot.proxyapi.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



import java.util.*;

@RestController
@RequestMapping({"/products"})
@CrossOrigin(origins = "http://localhost:3000") // this is the port where the react app is running

public class ProductController {

    @Autowired
    private ProductService productService;

    ProductController(ProductService productService) {
        this.productService = productService;
    }

    //localhost:8080/products/id
    @GetMapping({"/{id}"})
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id){
        Product product= productService.getProductById(id);
        if (product == null){
            return new ResponseEntity<>(product,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    //localhost:8080/products
    @GetMapping()
    public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> list = productService.getAllProducts();
        if (list == null){
            return new ResponseEntity<>(list,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @PutMapping({"/{id}"})
    public ResponseEntity<Product> replaceProduct(@PathVariable("id") Long id, @RequestBody Product product){
        Product prod = productService.replaceProduct(id, product);

        if (prod == null){
            return new ResponseEntity<>(product,HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(prod,HttpStatus.OK);
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
