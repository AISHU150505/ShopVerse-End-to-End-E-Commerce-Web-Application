/*
import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product-service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle-model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  product: Product = {
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  }

  constructor(private productService: ProductService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void { }

  addProduct(productForm: NgForm) {
    const productFormData = this.prepareFormData(this.product);
    
    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        productForm.reset();
        console.log("Product added successfully:", response);
        this.product.productImages = [];
      },
      (error: HttpErrorResponse) => {
        console.error("Error adding product:", error);
      }
    );
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append("productName", product.productName);
    formData.append("productDescription", product.productDescription);
    formData.append("productDiscountedPrice", product.productDiscountedPrice.toString());
    formData.append("productActualPrice", product.productActualPrice.toString());

    for (let i = 0; i < product.productImages.length; i++) {
      formData.append(
        "imageFile",
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.product.productImages = this.product.productImages || [];
      this.product.productImages.push(fileHandle);
    }
  }

  removeImages(i: number) {
    this.product.productImages.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }
}
*/
import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product-service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle-model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {
  isNewProduct =true;
  product: Product = {
    productId : null,
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: []
  }

  constructor(private productService: ProductService,
     private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.product=this.activatedRoute.snapshot.data['product'];
    if(this.product&&this.product.productId){
      this.isNewProduct=false;
    }
   }
   addProduct(productForm: NgForm) {
    const productFormData = this.prepareFormData(this.product);
  
    if (this.isNewProduct) {
      // Adding a new product
      this.productService.addProduct(productFormData).subscribe(
        (response: Product) => {
          productForm.reset();
          console.log("✅ Product added successfully:", response);
          this.product.productImages = [];
        },
        (error: HttpErrorResponse) => {
          console.error("❌ Error adding product:", error);
        }
      );
    } else {
      // Updating an existing product
      this.productService.updateProduct(this.product.productId, productFormData).subscribe(
        (response: Product) => {
          productForm.reset();
          console.log("✅ Product updated successfully:", response);
          this.product.productImages = [];
        },
        (error: HttpErrorResponse) => {
          console.error("❌ Error updating product:", error);
        }
      );
    }
  }
  /*
  addProduct(productForm: NgForm) {
    const productFormData = this.prepareFormData(this.product);
    
    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        productForm.reset();      
        console.log(this.isNewProduct ? "✅ Product added successfully:" : "✅ Product updated successfully:", response);

        this.product.productImages = [];
      },
      (error: HttpErrorResponse) => {
        console.error("❌ Error adding product:", error);
      }
    );
  }*/
  

  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    // ✅ Convert product object to JSON string and append
    formData.append("product", new Blob([JSON.stringify({
      productName: product.productName,
      productDescription: product.productDescription,
      productDiscountedPrice: product.productDiscountedPrice,
      productActualPrice: product.productActualPrice
    })], { type: "application/json" }));

    // ✅ Append images
    for (let i = 0; i < product.productImages.length; i++) {
      formData.append(
        "imageFile",
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.product.productImages = this.product.productImages || [];
      this.product.productImages.push(fileHandle);
    }
  }

  removeImages(i: number) {
    this.product.productImages.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }
}
