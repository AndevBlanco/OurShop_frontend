import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Product } from 'src/app/models/product.model';
import { PhotoService } from "src/app/services/Photos/photo.service";
import { ProductService } from "src/app/services/Product/product.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
})
export class ProductAddComponent implements OnInit {

  form:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private photoSvc: PhotoService,
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.label = route.snapshot.paramMap.get('label');
   }

   label:any;
   product:Product;

  ngOnInit() {
    if (this.label) {
      this.getProduct();
    }
    this.buildForm();
    console.log(this.label);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  addNewToGallery() {
    this.photoSvc.addNewToGallery();
  }

  getProduct() {
    this.productSvc.getProduct(this.label).subscribe({
      next: success => {
        this.product = success;
        this.form.patchValue({
          name: this.product.name,
          price: this.product.price,
          description: this.product.description,
        });
        console.log(this.product);
      },
      error: error => {
        console.error(error);
      }
    })
  }

  reload() {
    window.location.reload();
  }

  onEdit() {
    if(this.form.valid) {
      console.log('valido')
      const product: Product = {
        name: this.form.value.name,
        price : this.form.value.price,
        description: this.form.value.description,
        stock: this.form.value.stock,
      } 
    this.productSvc.editProduct(product, this.label).subscribe({
      next: success => {
        console.log(success);
      },
      error: error => {
        console.error(error);
      }
    })
  }
  }

  onPublish() {
    if(this.form.valid) {
      console.log('valido')
      const productData: Product = {
        name: this.form.value.name,
        price : this.form.value.price,
        description: this.form.value.description,
        stock: this.form.value.stock,
        // country: 'colombia',
        // date_added: new Date('10/12/2021'),
        // date_manufacture: new Date('5/12/2021'),
        // type: '1',
      } 
      this.productSvc.setProduct(productData).subscribe((response)=>{
        console.log('registro', productData)
        this.form.reset();
        window.open('/home', '_self');
      })
      console.log('registro', productData)
    }else{
      console.log('in-valido')
    }
  }
}
