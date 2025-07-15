package com.youtube.ecommerce.Controller;

import com.youtube.ecommerce.Entity.OrderDetail;
import com.youtube.ecommerce.Entity.OrderInput;
import com.youtube.ecommerce.Service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
//import org.springframework.http.ResponseEntity;
//@RestController
//public class OrderDetailController {
//    @Autowired
//    private OrderDetailService orderDetailService;
//
//    @PreAuthorize("hasRole('User')")
//
//
//    @PostMapping("/placeOrder")
//    public ResponseEntity<?> placeOrder(@RequestBody OrderInput orderInput){
//        try {
//            orderDetailService.placeOrder(orderInput); // Assuming this method might throw an exception on failure
//            return ResponseEntity.ok("Order placed successfully!");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Error placing order: " + e.getMessage());
//        }
//    }
//
//
//}
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class OrderDetailController {

    private static final Logger logger = LoggerFactory.getLogger(OrderDetailController.class);

    @Autowired
    private OrderDetailService orderDetailService;

    @PostMapping("/placeOrder/{isSingleProductCheckout}")
    public ResponseEntity<Map<String, Object>> placeOrder(@PathVariable (name="isSingleProductCheckout")boolean isSingleProductCheckout,
            @RequestBody OrderInput orderInput) {
        Map<String, Object> response = new HashMap<>();

        try {
            logger.info("Attempting to place order: {}", orderInput);

            // Check for empty fields
            if (orderInput.getFullName() == null || orderInput.getFullName().isEmpty()) {
                response.put("success", false);
                response.put("error", "Full name is required!");
                return ResponseEntity.badRequest().body(response);
            }

            orderDetailService.placeOrder(orderInput,isSingleProductCheckout);

            response.put("success", true);
            response.put("message", "Order placed successfully!");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error placing order: ", e);

            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    //@PreAuthorize("hasRole('User')")

    @GetMapping({"/getOrderDetails"})
    public List<OrderDetail> getOrderDetails(){
        return orderDetailService.getOrderDetails();
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping({"/getAllOrderDetails/{status}"})
    public List<OrderDetail> getAllOrderDetails(@PathVariable(name="status")String status){
        return orderDetailService.getAllOrderDetails(status);
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping({"/markOrderAsDelivered/{orderId}"})
    public void markOrderAdDelivered(@PathVariable(name="orderId")Integer orderId){
orderDetailService.markOrderAsDelivered(orderId);
    }

}