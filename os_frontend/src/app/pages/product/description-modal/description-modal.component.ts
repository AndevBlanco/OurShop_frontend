import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "src/services/Product/product.service";
import { Product } from "src/app/models/product.model";

@Component({
  selector: 'app-description-modal',
  templateUrl: './description-modal.component.html',
  styleUrls: ['./description-modal.component.scss'],
})
export class DescriptionModalComponent implements OnInit {

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  label:any;
  product:Product;
  constructor(
    private modalCtrl: ModalController,
    private router: ActivatedRoute,
    private serviceProduct: ProductService,
  ) { 
    this.label = this.router.snapshot.paramMap.get('label');
  }

  ngOnInit() {
    console.log(this.label)
    this.getProduct()
  }

  getProduct(){
    this.serviceProduct.getProduct(this.label).subscribe(success => {
      this.product = success;
      console.log(success);
    });
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
