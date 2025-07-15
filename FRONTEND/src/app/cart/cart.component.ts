import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product-service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price','Action'];
  cartDetails = new MatTableDataSource<any>([]); // ✅ Initialize properly

  constructor(private productService: ProductService,
    private cdr: ChangeDetectorRef,private router:Router
  ) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (response: any) => {
        console.log("API Response:", response);
        this.cartDetails.data = response; // ✅ Use .data to update
        this.cdr.detectChanges(); // Force UI update
      },
      (error) => {
        console.log("API Error:", error);
      }
    );
  }
  delete(cartId){
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (response)=>{
        console.log(response);
        this.getCartDetails();
      },
      (err)=>{
        console.log(err);
      }
    )
  }
  checkout() {
  this.router.navigate(['/buyProduct'], {
    queryParams: {
      isSingleProductCheckout: false,
      id: 0
    }
  });
}

    /*this.productService.getProductDetails(false,0).subscribe(
      (resp)=>{
        console.log(resp);
      },(err)=>{
      console.log(err);
  }
  );*/
  }
