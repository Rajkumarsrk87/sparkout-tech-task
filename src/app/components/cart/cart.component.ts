import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal!: number;

  constructor(
    public cartService: CartService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  removeProduct(item: any) {
    this.cartService.removeCartItem(item);
  }

  removeAllProduct() {
    this.cartService.removeAllCart();
  }

}
