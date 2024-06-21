import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { UserDataService } from 'src/app/service/user-data.service';
import { Options } from '@angular-slider/ngx-slider';
import { Emitters } from 'src/app/emitters/emitter';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    public userDataService: UserDataService,
    public cartService: CartService,
    private route: Router
  ) { }

  searchKey!: string;

  ngOnInit(): void {
    this.getAllProducts();
  }

  minValue: number = 0;
  highValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 200
  };

  listOfProducts: any = [];
  filterCategoryList: any = []

  getAllProducts() {
    this.productService.getListOfProducts().subscribe((response) => {
      this.listOfProducts = response;

      this.listOfProducts.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
        return a.price >= this.minValue && a.price <= this.highValue;
      });
    })
  }

  filters(category: any) {
    this.listOfProducts.filter((a: any) => {
      if (a.category == category || a.category == '') {
        return a.category;
      }
    })
  }

  sortMinPrice() {
    this.listOfProducts.sort(function (a: any, b: any) {
      return a.price - b.price
    });
  }
  sortMaxPrice() {
    this.listOfProducts.sort(function (a: any, b: any) {
      return b.price - a.price
    });
  }

  sortStarRate() {
    this.listOfProducts.sort(function (a: any, b: any) {
      return a.starRate - b.starRate
    });
  }

  addtoCart(item: any) {
    this.cartService.addtoCart(item);
  }

  getProductByCategory() {
    this.productService.getProductByCategory(this.listOfProducts.category).subscribe((res) => {
      this.listOfProducts = res;
    })
  }

  logout() {
    this.userDataService.clearUser();
    window.location.href = window.location.href;
  }

}
