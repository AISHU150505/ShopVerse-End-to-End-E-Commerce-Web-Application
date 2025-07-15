import { Injectable } from '@angular/core';
import { Product } from './_model/product.model';
import { FileHandle } from './_model/file-handle-model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer:DomSanitizer) { }
    public createImages(product:Product){

      const productImages:any[]=product.productImages;
      const productImagesToFileHandle : FileHandle[] =[];
      if (!product.productImages) {
    product.productImages = [];  // fallback for missing field
  }
      for(let i=0;i<productImages.length;i++){
        const imageFileData=productImages[i];
        const imageBlob=this.dataURItoBlob(imageFileData.picBytes,imageFileData.type);
        const imageFile=new File([imageBlob],imageFileData.name,{type:imageFileData.type});
        const finalFileHandle: FileHandle = {
          file:imageFile,
          url:this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
        };
        productImagesToFileHandle.push(finalFileHandle);
      }
      product.productImages=productImagesToFileHandle;
      return product;
    }
    /*
    public dataURItoBlob(picBytes,imageType){
      const byteString=window.atob(picBytes);
      const arrayBuffer=new ArrayBuffer(byteString.length);
      const intBArray=new Uint8Array(arrayBuffer);
      for (let i=0;i<byteString.length;i++){
        intBArray[i]=byteString.charCodeAt(i);
      }
      const blob=new Blob([intBArray],{type:imageType});
      return blob;
    }
   */
   public dataURItoBlob(picBytes: string, imageType: string) {
        try {
          // Ensure the input is a valid Base64 string
          if (!picBytes || !imageType) {
            throw new Error("Invalid image data");
          }
      
          // Remove extra characters from Base64
          picBytes = picBytes.replace(/\s/g, '');
      
          const byteString = window.atob(picBytes); // Decode Base64
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const intBArray = new Uint8Array(arrayBuffer);
      
          for (let i = 0; i < byteString.length; i++) {
            intBArray[i] = byteString.charCodeAt(i);
          }
      
          return new Blob([intBArray], { type: "image/png"});
        } catch (error) {
          console.error("Error decoding Base64 image:", error);
          return null;
        }
      }
        
      
  }