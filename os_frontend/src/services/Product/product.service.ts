import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "src/app/models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product>('https://ourshopbackend.herokuapp.com/products/getAll');
  }

  getProduct(label:any) {
    return this.http.get<Product>(`https://ourshopbackend.herokuapp.com/products?id=${label}`);
  }

}
