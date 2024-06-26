import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  backendUrl = 'http://localhost:3000';

  public createProduct(product: Product, data: File): Observable<any> {
    const formData = new FormData();
    formData.append('category', product.category);
    formData.append('productName', product.productName);
    formData.append('price', (product.price).toString());
    formData.append('offer', (product.offer).toString());
    formData.append('starRate', product.starRate);
    formData.append('image', product.image);
    formData.append('file', data);

    return this.http.post(this.backendUrl + "/createProduct", formData);
  }

  public getAllProducts(): Observable<any> {
    return this.http.get(this.backendUrl + "/getProduct");
  }

  getImageFromBlobUrl(blobUrl: string): Observable<Blob> {
    // Make HTTP request to fetch the image data
    return this.http.get(blobUrl, { responseType: 'blob' });
  }

  public getProductByCategories(category: any): Observable<any> {
    return this.http.get(this.backendUrl + "/getProductByCategory/" + category);
  }

  // public getListOfProducts(): Observable<any> {
  //   return this.http.get("../.././assets/data/product.json");
  // }

  // public getProductByCategory(category: string): Observable<any> {
  //   return this.http.get("../.././assets/data/product.json/" + category);
  // }
}
