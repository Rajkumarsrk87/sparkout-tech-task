import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { UserDataService } from 'src/app/service/user-data.service';
import { Options } from '@angular-slider/ngx-slider';
import { Emitters } from 'src/app/emitters/emitter';
import { DomSanitizer } from '@angular/platform-browser';

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
    private route: Router,
    private sanitizer: DomSanitizer
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
  filterCategoryList: any = [];

  imageSrc: any;


  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      this.listOfProducts = response;

      this.listOfProducts.forEach((a: any) => {
        const byteNumbers = new Uint8Array(a.image.data);
        const blob = new Blob([byteNumbers], { type: 'image/jpeg' });
        const imageUrl = URL.createObjectURL(blob);
        const image = new Image();
        image.src = imageUrl
        this.imageSrc = image.src
        // this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(image.src);

        Object.assign(a, { quantity: 1, total: a.price });
        return a.price >= this.minValue && a.price <= this.highValue;
      });
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

  getProductByCategory(category: any) {
    this.productService.getProductByCategories(category).subscribe((res) => {
      this.listOfProducts = res;
    })
  }

  gotoCreateProduct() {
    this.route.navigate(["/createProduct"])
  }

  logout() {
    this.userDataService.clearUser();
    window.location.href = window.location.href;
  }

}
