import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { ProductService } from "src/app/services/Product/product.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  products:any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private serviceProduct: ProductService
  ) { }

  ngOnInit() {
    this.getAllproducts();
  }

  getAllproducts() {
    this.serviceProduct.getAllProducts().subscribe(res => {
      this.products = res;
    });
  }

  goProduct(label:any) {
    this.router.navigate(['product/' + label]);
  }
}
