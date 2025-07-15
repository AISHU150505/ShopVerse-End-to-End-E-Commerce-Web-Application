/*import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialog ,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FileHandle } from '../_model/file-handle-model';

@Component({
  selector: 'app-show-product-images-dialog',
  templateUrl: './show-product-images-dialog.component.html',
  styleUrls: ['./show-product-images-dialog.component.css']
})
export class ShowProductImagesDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.recieveImages();
  }
  recieveImages(){
    console.log("Product Data Received:", this.data);
    if (this.data && this.data.productImages) {
      console.log("Product Images:", this.data.productImages);
    } else {
      console.warn("No images found in data!");
    }
  }
  

}*/
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-show-product-images-dialog',
  templateUrl: './show-product-images-dialog.component.html',
  styleUrls: ['./show-product-images-dialog.component.css']
})
export class ShowProductImagesDialogComponent implements OnInit {
  
  safeImages: SafeUrl[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.recieveImages();
  }

  recieveImages() {
  console.log("Product Data Received:", this.data);

  if (this.data?.productImages) {
   // console.log("Raw Images Data:", this.data.images);
    this.safeImages = this.data.productImages
    .filter((image: any) => image.picByte && image.type) // Ensure valid images
    .map((image: any) => {
      const imageUrl = `data:${image.type};base64,${image.picByte}`;
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    });
  
    /*this.safeImages = this.data.images.map((image: any) => {
      console.log("Checking Image Object:", image); // Debugging each image object

      // Ensure 'picByte' and 'type' exist
      if (!image.picByte || !image.type) {
        console.error("Invalid image data!", image);
        return null; // Skip invalid images
      }

      // Generate Base64 Image URL
      const imageUrl = `data:${image.type};base64,${image.picByte}`;
      console.log("Generated Image URL:", imageUrl);

      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
    });

    console.log("Sanitized Images:", this.safeImages);
  } else {
    console.warn("No images found in data!");
  }*/
}

  
  
  }}

