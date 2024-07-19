package org.springboot.proxyapi.models;

import lombok.Setter;
import lombok.Getter;

@Getter
@Setter
public class Product {
private Long id; // can use UUID as well
private String title;
private String description;
private double price;
private String image;
private Category category;
}
