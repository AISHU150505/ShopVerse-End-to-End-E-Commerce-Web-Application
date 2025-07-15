import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details-model';
import { Observable } from 'rxjs';
import { MyOrderDetails } from '../_model/order.model';
import { Product1 } from '../_model/product1.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  public markAsDelivered(orderId){
    return this.httpClient.get("http://localhost:9090/markOrderAsDelivered/"+orderId);
  }
    public addProduct(product:FormData){
      return this.httpClient.post<Product>("http://localhost:9090/addNewProduct",product);
    }
    public add(product: Product1) {
      return this.httpClient.post<Product1>("http://localhost:9090/add", product);
    }
    
    
    public getAllProducts(pageNumber,searchByKeyword :string=""){
      return this.httpClient.get<Product>("http://localhost:9090/getAllProducts?pageNumber="+pageNumber+"&searchKey="+searchByKeyword);
    }
    public get(){
      return this.httpClient.get<Product1>("http://localhost:9090/get");
    }
    public deleteProduct(productId: number) {
      return this.httpClient.delete("http://localhost:9090/deleteProductDetails/"+productId);
    }
    public getProductDetailsById(productId){
      return this.httpClient.get<Product>("http://localhost:9090/getProductDetailsById/"+productId);
    }
    updateProduct(productId: number, productData: FormData) {
      return this.httpClient.put<Product>(
        "http://localhost:9090/updateProduct/"+productId, 
        productData
      );
    }
    public getProductDetails(isSingleProductCheckout,productId){
      return this.httpClient.get("http://localhost:9090/getProductDetails/"+isSingleProductCheckout+"/"+productId);

     }
     public placeOrder(orderDetails:OrderDetails,isCartCheckout){
      return this.httpClient.post("http://localhost:9090/placeOrder/"+isCartCheckout,orderDetails);
     }
     public addToCart(productId){
    return this.httpClient.post("http://localhost:9090/addToCart/" + productId, null);
     }
     public getCartDetails(): Observable<any[]> {
      return this.httpClient.get<any[]>("http://localhost:9090/getCartDetails");
    }
    public deleteCartItem(cartId){
      return this.httpClient.delete("http://localhost:9090/deleteCartItem/"+cartId);
    }
    public getMyOrders():Observable<MyOrderDetails[]>{
      return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getOrderDetails");
    }
    public getAllOrderDetailsForAdmin(status:string): Observable<MyOrderDetails[]>{
      return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getAllOrderDetails/"+status);
    }
    
    public delete(id:number){
      return this.httpClient.delete("http://localhost:9090/delete/"+id);
    }
    public getProductDetialsById1(id){
      return this.httpClient.get<Product1>("http://localhost:9090/getProductDetailsById1/"+id);
    }
    
    
    
    
    
    }
  

