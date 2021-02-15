import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  products = [];
  product_description = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get<any>('https://ourshopbackend.herokuapp.com/products/getAll').subscribe(res => {
      
    this.products[0] = res.product[0].name;
    this.products[1] = res.product[1].name;
    this.products[2] = res.product[2].name;
    this.products[3] = res.product[3].name;

    this.product_description[0] = res.product[0].description;
    this.product_description[1] = res.product[1].description;
    this.product_description[2] = res.product[2].description;
    this.product_description[3] = res.product[3].description;

    })
  }

}
