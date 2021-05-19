import { Component, OnInit, DoCheck} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
<<<<<<< HEAD
import { ProductService } from "src/services/Product/product.service";
=======
import { ProductService } from "src/app/services/Product/product.service";
import { AuthService } from 'src/app/services/auth/auth.service';
>>>>>>> master

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  products:any;
  userAuth:boolean;
  constructor(
    private http: HttpClient,
    private router: Router,
    private serviceProduct: ProductService,
    private serviceAuth: AuthService
  ) { }

  ngOnInit() {
    this.getAllproducts();
  }
  
  ngDoCheck(){
    this.isAuth();
  }

  getAllproducts() {
    this.serviceProduct.getAllProducts().subscribe(res => {
      this.products = res;
    });
  }

  goProduct(label:any) {
    this.router.navigate(['product/' + label]);
  }

  isAuth(){
    this.serviceAuth.isAuth().subscribe( response =>{
      this.userAuth = response;
      console.log('usuario registrado',this.userAuth)
    })
  }

  onLogout(){
    this.serviceAuth.logOut();
  }

}
