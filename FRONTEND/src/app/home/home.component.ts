import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product-service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   productDetails=[];
   showLoadButton=false;
   pageNumber:number=0;
  constructor(private productService: ProductService,private imageProcessingService: ImageProcessingService
    , private router: Router

  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
  /*
  public getAllProducts() {
    this.productService.getAllProducts()
      .pipe(
        map((products: Product[]) => {
          console.log("Raw API Response:", products); // Debugging
  
          return products.map((product: Product) => {
            if (!product.productImages || product.productImages.length === 0) {
              console.warn(`Product ${product.productName} has no images`);
              return { ...product, productImages: [{ url: 'assets/premam1.jpg' }] }; // Use a default image
            }
            return this.imageProcessingService.createImages(product);
          });
        })
      )
      .subscribe(
        (resp: Product[]) => {
          console.log("Processed Products:", resp);
          this.productDetails = resp;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
  
  
*/
public getAllProducts(searchKey: string = "") {
  this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      mergeMap((products: Product[]) => {
        const processedProducts$ = products.map(product =>
          this.imageProcessingService.createImages(product)
        );
        return forkJoin(processedProducts$); // waits for all to complete
      })
    )
    .subscribe(
      (processedProducts: Product[]) => {
        console.log("Processed products:", processedProducts);
        this.showLoadButton = processedProducts.length === 12;
        this.productDetails.push(...processedProducts);
      },
      (error: HttpErrorResponse) => {
        console.error("Error fetching products:", error);
      }
    );
}




  public showProductDetails(productId){
    this.router.navigate(['/productViewDetails',{productId:productId}]);
  }
  public loadMoreProduct(){
    this.pageNumber=this.pageNumber+1;
    this.getAllProducts();
  }
  searchByKeyword(searchKeyword){
    console.log(searchKeyword);
    this.pageNumber=0;
    this.productDetails=[];
    this.getAllProducts(searchKeyword);
  }

}
