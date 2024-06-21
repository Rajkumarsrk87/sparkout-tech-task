import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  backendUrl = 'http://localhost:3000';

  public search = new BehaviorSubject<string>("")

  public getListOfProducts(): Observable<any> {
    return this.http.get("../.././assets/data/product.json");
  }

  public getProductByCategory(category: string): Observable<any> {
    return this.http.get("../.././assets/data/product.json/" + category);
  }
}
