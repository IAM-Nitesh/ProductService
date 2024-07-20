package org.springboot.proxyapi.services;

import org.springboot.proxyapi.dto.FakeStoreDTO;
import org.springboot.proxyapi.models.Category;
import org.springboot.proxyapi.models.Product;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.util.ArrayList;
import java.util.List;

@Service
public class FakeStoreProductService implements ProductService {

    private final HandlerExceptionResolver handlerExceptionResolver;
    private RestTemplate restTemplate;

    FakeStoreProductService(RestTemplate restTemplate, @Qualifier("handlerExceptionResolver") HandlerExceptionResolver handlerExceptionResolver) {
        this.restTemplate = restTemplate;
        this.handlerExceptionResolver = handlerExceptionResolver;
    }

    public Product ConvertFakeStoreDTOtoProduct(FakeStoreDTO fakeStoreDTO){

        Product product = new Product();
        product.setId(fakeStoreDTO.getId());
        product.setTitle(fakeStoreDTO.getTitle());
        product.setPrice(fakeStoreDTO.getPrice());
        product.setDescription(fakeStoreDTO.getDescription());

        Category category = new Category();
        category.setDescription(fakeStoreDTO.getCategory());
        // category id is not yet set
        product.setCategory(category);

        return product;
    }

    @Override
    public Product getProductById(Long id) {
        // Saving the response from Fake store api to DTO object
        // Using RestTemplate which takes input api url and return type ( dto object)
        // add some kind of exception for line 44
        FakeStoreDTO fakeStoreDTO = restTemplate.getForObject("https://fakestoreapi.com/products/"+id, FakeStoreDTO.class);

        // Converting the DTO object into Product Object
        if (fakeStoreDTO == null) {
            return null;
        }
        return ConvertFakeStoreDTOtoProduct(fakeStoreDTO);
    }

    @Override
    public List<Product> getAllProducts() {

        // 1. Creating a array of fakestoredto objects to store the response from the url using rest template
        FakeStoreDTO[] fakeStoreDTOList = restTemplate.getForObject("https://fakestoreapi.com/products",FakeStoreDTO[].class);

        List<Product> products = new ArrayList<>();

        // 2. convert dto objects to array of Product objects
        for ( FakeStoreDTO fakeStoreDTO : fakeStoreDTOList ) {
            products.add(ConvertFakeStoreDTOtoProduct(fakeStoreDTO));
        }
        return products;
    }
}
