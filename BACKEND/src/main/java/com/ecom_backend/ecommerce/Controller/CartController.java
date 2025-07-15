package com.youtube.ecommerce.Controller;

import com.youtube.ecommerce.Entity.Cart;
import com.youtube.ecommerce.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CartController {
    @Autowired
    private CartService cartService;
   // @PreAuthorize("hasRole('User')")
    @PostMapping("/addToCart/{productId}")
    public Cart addToCart(@PathVariable(name="productId")Integer productId){
        return cartService.addToCart(productId);

    }

    @GetMapping("/getCartDetails")
    public List<Cart> getCartDetails(){
        List<Cart> cartList = cartService.getCartDetails();
        System.out.println("Cart Items: " + cartList); // Debugging log
        return cartList;
    }
    @PreAuthorize("hasRole('User')")
    @DeleteMapping({"/deleteCartItem/{cartId}"})
    public void deleteCartItem(@PathVariable(name="cartId")Integer cartId){
        cartService.deleteCartItem(cartId);
    }

}
