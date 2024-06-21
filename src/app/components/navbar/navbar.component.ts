import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'ngx-webstorage-service/src/storage.service';
import { Emitters } from 'src/app/emitters/emitter';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import { UserDataService } from 'src/app/service/user-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public totalItem: number = 0;

  constructor(
    public cartService: CartService,
    public userDataService: UserDataService,
    private route: Router
  ) { }

  cart = false

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });

    if (this.userDataService.getEmail() != null) {
      this.cart = true
    } else {
      this.cart = false
    }
  }

  gotoCart() {
    this.route.navigate(["./cart"])
  }

}
