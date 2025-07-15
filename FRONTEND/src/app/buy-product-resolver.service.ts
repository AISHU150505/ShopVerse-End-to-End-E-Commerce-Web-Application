/*import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from './_model/product.model';
import { ProductService } from './_services/product-service';
import { ImageProcessingService } from './image-processing.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]> {

  constructor(private productService:ProductService,
    private imageProcessingService:ImageProcessingService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id=route.paramMap.get("id");
    const isSingleProductCheckout=route.paramMap.get("isSingleProductCheckout");
    return this.productService.getProductDetails(isSingleProductCheckout,id)
    .pipe(
      map(
        (x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product))
        
      )
    )
  }
}
*/import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Product } from './_model/product.model';
import { ProductService } from './_services/product-service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    const id = route.paramMap.get("id");
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout");

    if (!id || !isSingleProductCheckout) {
      console.error("Invalid route parameters");
      return of([] as Product[]); // Return an empty observable array with correct type
    }

    return this.productService.getProductDetails(isSingleProductCheckout, id).pipe(
      map(response => response as Product[]), // Ensure the response is cast to Product[]
      catchError(error => {
        console.error("Error fetching product details:", error);
        return of([] as Product[]); // Ensures correct return type
      })
    );
  }
}
