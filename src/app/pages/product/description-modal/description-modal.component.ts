import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { ProductService } from "src/app/services/Product/product.service";
import { Product } from "src/app/models/product.model";
import { NavController, LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-description-modal',
  templateUrl: './description-modal.component.html',
  styleUrls: ['./description-modal.component.scss'],
})
export class DescriptionModalComponent implements OnInit {

  @Input() label: string;

  product:Product;
  constructor(
    private modalCtrl: ModalController,
    private serviceProduct: ProductService,
    private load: LoadingController,
  ) { 
  }

  ngOnInit() {
    console.log(this.label)
    this.getProduct()
  }

  async getProduct(){
    const loading = await this.load.create({
      message: 'Cargando Description...'
    });
    await loading.present();
    this.serviceProduct.getProduct(this.label).subscribe(success => {
      loading.dismiss();
      this.product = success;
      console.log(success);
    });
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }
}
