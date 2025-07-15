package com.youtube.ecommerce.Service;

import com.youtube.ecommerce.Config.JwtRequestFilter;
import com.youtube.ecommerce.Dao.CartDao;
import com.youtube.ecommerce.Dao.ProductDao;
import com.youtube.ecommerce.Dao.UserDao;
import com.youtube.ecommerce.Entity.Cart;
import com.youtube.ecommerce.Entity.Product;
import com.youtube.ecommerce.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartService {
    @Autowired
    private CartDao cartDao;
    @Autowired
    private ProductDao productDao;
    @Autowired
    private UserDao userDao;
    private static final String DEFAULT_USERNAME = "raj123";

    public Cart addToCart(Integer productId) {
        Optional<Product> productOpt = productDao.findById(productId);
        if (!productOpt.isPresent()) {
            // Log error or handle case where product is not found
            return null;
        }
        Product product = productOpt.get();

        Optional<User> userOpt = userDao.findById(DEFAULT_USERNAME);
        if (!userOpt.isPresent()) {
            // Log error or handle case where user is not found
            return null;
        }
        User user = userOpt.get();
        List<Cart>cartList=cartDao.findByUser(user);
        List<Cart> filteredList=cartList.stream().filter(x->x.getProduct().getProductId()==productId).collect(Collectors.toList());
        if(filteredList.size()>0){
            return null;
        }

        Cart cart = new Cart(product, user);
        return cartDao.save(cart);
    }
    public void deleteCartItem(Integer cartId){
        cartDao.deleteById(cartId);
    }
    public List<Cart> getCartDetails() {
        System.out.println("🔍 Fetching cart for user: " + DEFAULT_USERNAME);

        Optional<User> userOpt = userDao.findById(DEFAULT_USERNAME);
        if (!userOpt.isPresent()) {
            System.out.println("🚨 User not found: " + DEFAULT_USERNAME);
            return Collections.emptyList(); // ✅ Works on all Java versions
        }
        User user = userOpt.get();

        List<Cart> cartItems = cartDao.findByUser(user);
        System.out.println("📦 Cart Items Retrieved: " + cartItems);
        return cartItems;
    }



}
