import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  createProduct = new FormGroup({
    category: new FormControl('', Validators.required),
    productName: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    offer: new FormControl('', Validators.required),
    starRate: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  message = false;
  responseMessage?: string;
  responseColor = 'black';
  response: any;

  statusMessage: string = '';
  messageColor = "black";

  file: any;
  onChange(event: any) {
    ;
    if (event.target.files) {
      const file = event.target.files[0];
      this.file = file;
    }
  }

  gotoProducts() {
    this.route.navigate(['/product'])
  }

  product: Product = new Product();
  createProducts() {
    this.product.category = JSON.parse(
      JSON.stringify(this.createProduct.value.category)
    );
    this.product.productName = JSON.parse(
      JSON.stringify(this.createProduct.value.productName)
    );
    this.product.price = JSON.parse(
      JSON.stringify(this.createProduct.value.price)
    );
    this.product.offer = JSON.parse(
      JSON.stringify(this.createProduct.value.offer)
    );
    this.product.starRate = JSON.parse(
      JSON.stringify(this.createProduct.value.starRate)
    );
    this.product.image = JSON.parse(
      JSON.stringify(this.createProduct.value.image)
    );

    const formData = new FormData();
    formData.append('file', this.file);

    this.productService.createProduct(this.product, this.file).subscribe((resp) => {
      this.response = resp;

      if (this.response.status == 200) {
        this.message = true;
        this.statusMessage = this.response.message;
        this.messageColor = 'green';
        this.createProduct.reset();
      } else {
        this.message = true;
        this.statusMessage = this.response.message;
        this.messageColor = 'red';
      }
    })
  }
}
