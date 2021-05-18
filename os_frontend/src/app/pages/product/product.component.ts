import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/services/Product/product.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { ModalController } from "@ionic/angular";
import { DescriptionModalComponent } from './description-modal/description-modal.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  label:any;
  product:any;
  completeInfo:Product;

  constructor(
    private serviceProduct: ProductService,
    private router: ActivatedRoute,
    private modalDescription: ModalController,
  ) { 
    this.label = this.router.snapshot.paramMap.get('label');
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.serviceProduct.getProduct(this.label).subscribe((product:Product) => {
      this.completeInfo = product;
      console.log(product);
    });
  }

  goDescription() {
    this.modalDescription.create({
      component: DescriptionModalComponent,
      // componentProps: {
      //   'firstName': this.product.name,
      //   'lastName': 'Adams',
      //   'middleInitial': 'N'
      // }
    }).then( (modalSuccess):any => {
      modalSuccess.present();
    });
  }

}
