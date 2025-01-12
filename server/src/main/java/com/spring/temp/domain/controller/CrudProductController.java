package com.spring.temp.domain.controller;

import com.spring.temp.product.Product;
import com.spring.temp.product.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("productCrud")
public class CrudProductController {

    private final ProductService productService;
    @PostMapping
    public String addProducts(@RequestBody List<Product> product){
        productService.addProduct(product);
        return "ok";
    }
}
