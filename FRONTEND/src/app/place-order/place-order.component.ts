import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
})
export class PlaceOrderComponent {
  orderInput = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    transactionId: '',
    orderProductQuantityList: [] // leave this as empty list for now
  };

  isSingleProductCheckout = true;

  constructor(private http: HttpClient) {}

  placeOrder() {
    const url = `http://localhost:9090/placeOrder/${this.isSingleProductCheckout}`;
    this.http.post(url, this.orderInput).subscribe({
      next: () => alert('✅ Order placed successfully'),
      error: (err) =>
        alert('❌ Order failed: ' + (err.error?.error || err.message)),
    });
  }
}
