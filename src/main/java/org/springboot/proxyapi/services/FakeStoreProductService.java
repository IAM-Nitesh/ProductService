package org.springboot.proxyapi.services;

import org.springboot.proxyapi.dto.ProductNotFoundExceptionDto;
import org.springboot.proxyapi.exceptions.ProductNotFoundException;
import org.springboot.proxyapi.dto.FakeStoreDto;
import org.springboot.proxyapi.models.Category;
import org.springboot.proxyapi.models.Product;
import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpMessageConverterExtractor;
import org.springframework.web.client.RequestCallback;
//import org.springframework.web.client.ResponseExtractor;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.HandlerExceptionResolver;
import java.util.*;

@Service
public class FakeStoreProductService implements ProductService {

    private final HandlerExceptionResolver handlerExceptionResolver;
    private RestTemplate restTemplate;

    FakeStoreProductService(RestTemplate restTemplate, @Qualifier("handlerExceptionResolver") HandlerExceptionResolver handlerExceptionResolver) {
        this.restTemplate = restTemplate;
        this.handlerExceptionResolver = handlerExceptionResolver;
    }

    public Product ConvertFakeStoreDTOtoProduct(FakeStoreDto fakeStoreDTO){

        Product product = new Product();
        product.setId(fakeStoreDTO.getId());
        product.setTitle(fakeStoreDTO.getTitle());
        product.setPrice(fakeStoreDTO.getPrice());
        product.setDescription(fakeStoreDTO.getDescription());
        product.setImage(fakeStoreDTO.getImage());
        Category category = new Category();
        category.setDescription(fakeStoreDTO.getCategory());
        // category id is not yet set
        // category.setId(1L);
        product.setCategory(category);

        return product;
    }

    public FakeStoreDto convertProductToFakeStoreDTO(Product product){
        FakeStoreDto fakeStoreDTO = new FakeStoreDto();
        fakeStoreDTO.setTitle(product.getTitle());
        fakeStoreDTO.setPrice(product.getPrice());
        fakeStoreDTO.setDescription(product.getDescription());
        fakeStoreDTO.setImage(product.getImage());
        Category category = new Category();
        category.setDescription(product.getCategory().getDescription());
        category.setId(1L);
        fakeStoreDTO.setCategory(product.getCategory().getDescription());
        return fakeStoreDTO;
    }

    @Override
    public Product getProductById(Long id) throws ProductNotFoundException {
        // Saving the response from Fake store api to DTO object
        // Using RestTemplate which takes input api url and return type ( dto object)
        // add some kind of exception for line 44
        FakeStoreDto fakeStoreDTO = restTemplate.getForObject("https://fakestoreapi.com/products/"+id, FakeStoreDto.class);
        ProductNotFoundExceptionDto dto = new ProductNotFoundExceptionDto();
        // Converting the DTO object into Product Object
        if (fakeStoreDTO == null) {
            throw new ProductNotFoundException(id,"Product with id:"+id+" was not found","Retry with new id");
        }
        return ConvertFakeStoreDTOtoProduct(fakeStoreDTO);
    }

    @Override
    public List<Product> getAllProducts() {

        // 1. Creating a array of fakestoredto objects to store the response from the url using rest template
        FakeStoreDto[] fakeStoreDtoList = restTemplate.getForObject("https://fakestoreapi.com/products", FakeStoreDto[].class);

        List<Product> products = new ArrayList<>();

        // 2. convert dto objects to array of Product objects
        // check fakeStoreDTOList for null pointer exception
        for ( FakeStoreDto fakeStoreDTO : fakeStoreDtoList) {
            products.add(ConvertFakeStoreDTOtoProduct(fakeStoreDTO));
        }
        return products;
    }

    @Override
    public Product replaceProduct(Long id, Product product) {
        FakeStoreDto fakeStoreDTO = convertProductToFakeStoreDTO(product);
        RequestCallback requestCallback = restTemplate.httpEntityCallback(fakeStoreDTO, FakeStoreDto.class);
        HttpMessageConverterExtractor<FakeStoreDto> responseExtractor = new HttpMessageConverterExtractor<>(FakeStoreDto.class,
                restTemplate.getMessageConverters());

        FakeStoreDto resp = restTemplate.execute("https://fakestoreapi.com/products/"+id,HttpMethod.PUT,requestCallback,responseExtractor);
        // check rest for null pointer exception
        return ConvertFakeStoreDTOtoProduct(resp);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        return null;
    }

    @Override
    public Product createProduct(Product product) {
        return null;
    }

    @Override
    public void deleteProduct() {

    }


}
