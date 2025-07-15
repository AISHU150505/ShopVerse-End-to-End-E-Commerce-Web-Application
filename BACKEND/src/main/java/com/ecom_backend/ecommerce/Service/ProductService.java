package com.youtube.ecommerce.Service;

import com.youtube.ecommerce.Config.JwtRequestFilter;
import com.youtube.ecommerce.Dao.CartDao;
import com.youtube.ecommerce.Dao.ProductDao;
import com.youtube.ecommerce.Dao.UserDao;
import com.youtube.ecommerce.Entity.Cart;
import com.youtube.ecommerce.Entity.Product;
import com.youtube.ecommerce.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductDao productDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private CartDao cartDao;

    public Product addNewProduct(Product product) {

        return productDao.save(product);
    }

//    public List<Product> getAllProducts(int pageNumber,String searchKey) {
//        Pageable pageable = PageRequest.of(pageNumber,12);
//      //  Page<Product> productPage = productDao.findAll(pageable);
//        if(searchKey.equals("")){
//
//
//            return (List<Product>)productDao.findAll(pageable);// Extracts list from Page
//        }
//        else{
//            return (List<Product>) productDao.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(
//                    searchKey,searchKey,pageable
//            );
//        }
//    }
    public List<Product> getAllProducts(){
        return (List<Product>) productDao.findAll();
    }

    public void deleteProductDetails(Integer productId) {
        productDao.deleteById(productId);
    }

    public Product getProductDetailsById(Integer productId) {
        return productDao.findById(productId).orElse(null); // Avoid NoSuchElementException
    }

    public Product updateProduct(Product product) {
        return productDao.save(product);
    }

    public List<Product> getProductDetails(boolean isSingleProductCheckout, Integer productId) {
        if (isSingleProductCheckout&&productId!=0) {
            List<Product> list = new ArrayList<>();
            Optional<Product> product = productDao.findById(productId);
            product.ifPresent(list::add);  // Add only if present
            return list;
        } else {
           String username= JwtRequestFilter.CURRENT_USER;
           User user=userDao.findById(username).get();
           List<Cart>carts=cartDao.findByUser(user);
           return carts.stream().map(x->x.getProduct()).collect(Collectors.toList());
            //return (List<Product>) productDao.findAll(); // Fetch all products if not single checkout
        }}
}
