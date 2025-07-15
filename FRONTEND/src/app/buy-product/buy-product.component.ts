import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../_model/order-details-model';
import { Product } from '../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product-service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {
  productDetails:Product[]=[];
  isSingleProductCheckout:string='';
  
  orderDetails:OrderDetails={
   
       fullName:'',
       fullAddress:'',
       contactNumber:'',
              alternateContactNumber:'',
       orderProductQuantityList:[]
   }
  
  constructor(private activatedRoute:ActivatedRoute,
  private productService:ProductService,
private router:Router){}
  ngOnInit(): void {
    this.productDetails=this.activatedRoute.snapshot.data['productDetails'];
   this.isSingleProductCheckout= this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
    this.productDetails.forEach(
      x=>this.orderDetails.orderProductQuantityList.push(
        {productId:x.productId,quantity:3}
      )
    );
    console.log(this.productDetails);
    console.log(this.orderDetails);
  }
  public placeOrder(orderForm:NgForm){
  this.productService.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe(
    (resp)=>{
      console.log(resp);
      alert("ORDER SUCCESSFULLY PLACED");  
      orderForm.reset();
      this.router.navigate(["/orderConfirm"]);
    },
    (err)=>{ console.error("Error Response:", err);  // Log full error
      alert("Error placing order: " + err.message);
    }
  )  }

  getQuantityForProduct(productId){
    const filteredProduct=this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=>productQuantity.productId==productId
    );
    return filteredProduct[0].quantity;
  }
  getCalculatedTotal(productId,productDiscountedPrice){
    const filteredProduct=this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=>productQuantity.productId==productId
    );
    return filteredProduct[0].quantity*productDiscountedPrice;

  }
  onQuantityChanged(q,productId){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct)=>orderProduct.productId==productId
    )[0].quantity=q;
  }
  getCalculatedGrandTotal(){
    let grandTotal=0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity)=>{
       const price= this.productDetails.filter(product=>product.productId==productQuantity.productId)[0].productDiscountedPrice
       grandTotal=grandTotal+price*productQuantity.quantity;
      }
    );
      return grandTotal;
  
  }


}


















/*
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderDetails } from '../_model/order-details-model';
import { Product } from '../_model/product.model';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit, OnDestroy {
  productDetails: Product[] = [];
  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  };

  private subscriptions = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.subscriptions.add(this.activatedRoute.data.subscribe(data => {
      this.productDetails = data['productDetails'];
      this.productDetails.forEach(p => this.orderDetails.orderProductQuantityList.push({ productId: p.productId, quantity: 1 }));
      console.log(this.productDetails);
      console.log(this.orderDetails);
    }));
  }

  placeOrder(orderForm: NgForm): void {
    this.subscriptions.add(this.productService.placeOrder(this.orderDetails).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
        // Maybe show a success message to the user
      },
      (err) => {
        console.log(err);
        // Maybe show an error message to the user
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}*/


/*
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderDetails } from '../_model/order-details-model';
import { Product } from '../_model/product.model';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit, OnDestroy {
  productDetails: Product[] = [];
  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  };

  private subscriptions = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.activatedRoute.data.subscribe(data => {
        console.log("ActivatedRoute Data:", data); // Debugging

        if (data && data['productDetails']) {
          this.productDetails = data['productDetails'];

          if (Array.isArray(this.productDetails) && this.productDetails.length > 0) {
            this.productDetails.forEach(p => 
              this.orderDetails.orderProductQuantityList.push({ productId: p.productId, quantity: 1 })
            );
          } else {
            console.warn("Warning: productDetails is empty or not an array.");
          }
        } else {
          console.error("Error: productDetails is undefined or null.");
        }

        console.log("Product Details:", this.productDetails);
        console.log("Order Details:", this.orderDetails);
      })
    );
  }

  placeOrder(orderForm: NgForm): void {
    if (!this.orderDetails.orderProductQuantityList.length) {
      console.error("Error: No products in order.");
      return;
    }

    this.subscriptions.add(
      this.productService.placeOrder(this.orderDetails).subscribe(
        (resp) => {
          console.log("Order placed successfully:", resp);
          orderForm.reset();
          alert("Order placed successfully!");
        },
        (err) => {
          console.error("Order placement failed:", err);
          alert("Failed to place order. Please try again.");
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}*/
