import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/models/product.model";
import { tap } from 'rxjs/operators';
import { ProductResponse } from "src/app/models/product-response.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product: ProductResponse;

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product>('https://ourshopbackend.herokuapp.com/products/getAll');
  }

  getProduct(label:any) {
    return this.http.get<Product>(`https://ourshopbackend.herokuapp.com/products?id=${label}`);
  }

  setProduct(product: Product): Observable<ProductResponse>  {
    return this.http.post<ProductResponse>(`https://ourshopbackend.herokuapp.com/products/`, product)
    .pipe(tap(
      (res:ProductResponse) => {
        if(res){
          this.saveProduct(res);
        }
      }
      ));
  }

  editProduct(product: Product, label:string): Observable<ProductResponse> {
    return this.http.put<ProductResponse>(`https://ourshopbackend.herokuapp.com/products?id=${label}`, product);
  }

  saveProduct(res:ProductResponse) {
    this.product = res;
  }
  
  deleteProduct(label:string) {
    return this.http.delete(`https://ourshopbackend.herokuapp.com/products?id=${label}`);
  }
}
