import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PhotoService } from "src/app/services/Photos/photo.service";

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
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ngDoCheck() {
    console.log(this.photoSvc.photos[0]?.filepath);
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
}
