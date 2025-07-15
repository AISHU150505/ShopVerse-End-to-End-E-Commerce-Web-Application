package com.youtube.ecommerce.Controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youtube.ecommerce.Entity.ImageModel;
import com.youtube.ecommerce.Entity.Product;
import com.youtube.ecommerce.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import javax.persistence.PreRemove;
import javax.transaction.Transactional;
import java.io.IOException;

@RestController
public class ProductController {
    @Autowired
    private ProductService productService;
    //@PreAuthorize("hasRole('Admin')")
   // @PostMapping(value={"/addNewProduct"},consumes  ={MediaType.MULTIPART_FORM_DATA_VALUE})

//    public Product  addNewProduct(@RequestPart ("product") String productJson){
//                                //  @RequestPart("imageFile")MultipartFile[] file) throws JsonProcessingException {
//       //return productService.addNewProduct(product);
//        ObjectMapper objectMapper = new ObjectMapper();
//        Product product = objectMapper.readValue(productJson, Product.class);
//
//        try{
//            Set<ImageModel> images=uploadImage(file);
//            product.setProductImages(images);
//            return productService.addNewProduct(product);
//        }catch(Exception e){
//            System.out.print(e.getMessage());
//            return null;
//        }
//    }'
    @PostMapping(value = "/addNewProduct", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product addNewProduct(
            @RequestPart("product") String productJson,
            @RequestPart(value = "imageFile", required = false) MultipartFile[] imageFiles) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        Product product = objectMapper.readValue(productJson, Product.class);

        if (imageFiles != null && imageFiles.length > 0) {
            Set<ImageModel> images = uploadImage(imageFiles);
            product.setProductImages(images);
        }

        return productService.addNewProduct(product);
    }


//    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
//        Set<ImageModel> imageModels=new HashSet<>();
//        for(MultipartFile file:multipartFiles){
//            ImageModel imageModel=new ImageModel(
//            file.getOriginalFilename(),
//            file.getContentType(),
//            file.getBytes()
//            );
//            imageModels.add(imageModel);
//        }
//        return imageModels;
//    }

    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();

        for (MultipartFile file : multipartFiles) {
            if (file.isEmpty()) continue;

            ImageModel imageModel = new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );

            imageModels.add(imageModel);
        }
        return imageModels;
    }





//    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
//        Set<ImageModel> imageModels = new HashSet<>();
//
//        for (MultipartFile file : multipartFiles) {
//            if (file.isEmpty()) {
//                System.out.println("⚠ Skipping empty file: " + file.getOriginalFilename());
//                continue;
//            }
//
//            try {
//                // Sanitize file name (remove spaces and special characters)
//                String sanitizedFileName = file.getOriginalFilename().replaceAll("[^a-zA-Z0-9.]", "_");
//
//                ImageModel imageModel = new ImageModel(
//                        sanitizedFileName,            // Ensure filename is safe
//                        file.getContentType() != null ? file.getContentType() : "application/octet-stream", // Default MIME type
//                        file.getBytes()
//                );
//
//                imageModels.add(imageModel);
//                System.out.println("✅ Image uploaded: " + sanitizedFileName);
//            } catch (IOException e) {
//                System.err.println("❌ Error processing file: " + file.getOriginalFilename() + " -> " + e.getMessage());
//            }
//        }
//
//        return imageModels;
//    }


    @GetMapping("/getAllProducts")
    //public List<Product> getAllProducts(@RequestParam(defaultValue = "0") int pageNumber,
      //                                  @RequestParam(defaultValue = "") String searchKey){

     public List<Product> getAllProducts(){
         List<Product>result=productService.getAllProducts();

//        System.out.println("Result Size : "+result.size());
return result;
    }
    @GetMapping({"/getProductDetailsById/{productId}"})
    public Product getProductDetailsById(@PathVariable("productId") Integer productId){
       return  productService.getProductDetailsById(productId);
    }
    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/deleteProductDetails/{productId}")
    @Transactional
    public void deleteProductDetails(@PathVariable("productId") Integer productId) {
        productService.deleteProductDetails(productId);
    }






    @PreAuthorize("hasRole('Admin')")
    @PutMapping(value = "/updateProduct/{productId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Product updateProduct(@PathVariable("productId") Integer productId,
                                 @RequestPart("product") Product updatedProduct,
                                 @RequestPart(value = "imageFile", required = false) MultipartFile[] file) {
        try {
            // Fetch the existing product from the database
            Product existingProduct = productService.getProductDetailsById(productId);
            if (existingProduct == null) {
                throw new RuntimeException("Product not found with ID: " + productId);
            }

            // Update only product details
            existingProduct.setProductName(updatedProduct.getProductName());
            existingProduct.setProductDescription(updatedProduct.getProductDescription());
            existingProduct.setProductDiscountedPrice(updatedProduct.getProductDiscountedPrice());
            existingProduct.setProductActualPrice(updatedProduct.getProductActualPrice());

//            // If new images are provided, update images
//            if (file != null && file.length > 0) {
//                Set<ImageModel> images = uploadImage(file);
//                existingProduct.setProductImages(images);
//            }

            return productService.updateProduct(existingProduct);
        } catch (Exception e) {
            System.out.println("Error updating product: " + e.getMessage());
            return null;
        }
    }
    @PreAuthorize("hasRole('User')")
        @GetMapping({"/getProductDetails/{isSingleProductCheckout}/{productId}"})

    public List<Product> getProductDetails(@PathVariable(name="isSingleProductCheckout") boolean isSingleProductCheckout,
                                  @PathVariable(name="productId") Integer productId){
      return   productService.getProductDetails(isSingleProductCheckout, productId);
      //true - single product false -entire cart

        }










}

