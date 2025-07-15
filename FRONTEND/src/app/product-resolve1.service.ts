import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/product.model';
import { Observable, of } from 'rxjs';
import { Product1 } from './_model/product1.model';

import { ProductService } from './_services/product-service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolve1Service implements Resolve<Product1> {

  constructor(private productService:ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product1 | Observable<Product1> | Promise<Product1> {
    const id = route.paramMap.get("id");
    if (id) {
      return this.productService.getProductDetialsById1(id);
    } else {
      return  of(this.get()); // now works correctly
    }
  }

  get(): Product1 {
    return {
      id: null,
      name: ""
    };
  }
}

