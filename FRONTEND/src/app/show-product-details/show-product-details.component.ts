import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../_model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {
  showLoadMoreProductButton=false;
  showTable=false;
  pageNumber:number=0;
  productDetails: Product[]=[];
  displayedColumns: string[] = ['productId', 'productName', 'productDescription', 'productDiscountedPrice', 'productActualPrice','Actions'];

  constructor(private productService : ProductService, 
    public imagesDialog : MatDialog,
    private imageProcessingService:ImageProcessingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
  public getAllProducts(searchKeyword:string=""){

    this.showTable=false;

    this.productService.getAllProducts(this.pageNumber,searchKeyword)
      .pipe(
  map((products) =>
    products.map((product: Product) =>
      this.imageProcessingService.createImages(product)
    )
  )
)

    
  
     .subscribe(
      (resp:Product[])=>{
      //  console.log(resp);
        resp.forEach(product=>this.productDetails.push(product));
        console.log('msg'+this.productDetails);
        this.showTable=true;
        if(resp.length==12){
          this.showLoadMoreProductButton=true;
        }
        else{
          this.showLoadMoreProductButton=false;
        }
       // this.productDetails=resp;
    },(error:HttpErrorResponse)=>{
      console.log(error);
    }
  );
    }
    deleteProduct(productId: number) {
      this.productService.deleteProduct(productId).subscribe(
        (resp)=>{
          this.getAllProducts();
        },
        (error:HttpErrorResponse)=>{
          console.log(error);
        }
      );
    }
    showImages(product : Product){
      console.log(product);
      this.imagesDialog.open(ShowProductImagesDialogComponent,{
        data:{
          images:product.productImages || []
        },
        height:'500px',
        width: '800px'
      });
    }
    editProductDetails(productId){
      this.router.navigate(['/addNewProduct',{productId:productId}]);
    }
    loadMoreProduct(){
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



