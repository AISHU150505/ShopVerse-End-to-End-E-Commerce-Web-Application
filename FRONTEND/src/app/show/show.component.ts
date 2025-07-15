import { Component, OnInit } from '@angular/core';
import { Product1 } from '../_model/product1.model';
import { ProductService } from '../_services/product-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  [x: string]: any;
  productDetails: Product1[]=[];
  displayedColumns : string[]=['id','name','Actions'];
  

  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.get();
  }
  public get(){
    this.productService.get().subscribe(
  (resp: Product1) => {
    console.log(resp);
    this.productDetails = [resp];  // Wrap in array if ShowComponent expects an array
    this.router.navigate(['/show']);
  },
  (error: HttpErrorResponse) => {
    console.log(error);
  }
);

  }
  public delete(id:number){
    this.productService.delete(id).subscribe(
      (resp:Product1[])=>{
        console.log(resp);
        this.get();
      },
    (error:HttpErrorResponse)=>{
      console.log(error);
    }
    )
  }
  edit(id){
    this.router.navigate(['/addNewProduct1',{id:id}]);
  }

}
