import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/services/Product/product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "src/app/models/product.model";
import { ModalController } from "@ionic/angular";
import { DescriptionModalComponent } from './description-modal/description-modal.component';
import { ToastController } from '@ionic/angular';
import { Cart } from "src/app/models/cart.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  label:any;
  product:any;
  completeInfo:Product;
  productCart: Cart;

  constructor(
    private serviceProduct: ProductService,
    private router: ActivatedRoute,
    private modalDescription: ModalController,
    private route: Router,
    private toast: ToastController,
  ) { 
    this.label = this.router.snapshot.paramMap.get('label');
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.serviceProduct.getProduct(this.label).subscribe((product:Product) => {
      this.completeInfo = product;
      console.log(this.completeInfo);
    });
  }

  async goDescription(label:string) {
    const modal = await this.modalDescription.create({
      component: DescriptionModalComponent,
       componentProps: {
         'label': label,
       }
    }).then( (modalSuccess):any => {
      modalSuccess.present();
    });
  }

  addCart() {
    this.productCart = {
      nameP: this.completeInfo.name,
      priceP: this.completeInfo.price,
      descriptionP: this.completeInfo.description,
      dateAdd: this.completeInfo.date_added,
    }
    console.log(this.productCart);
  }

  deleteProduct() {
    this.serviceProduct.deleteProduct(this.label).subscribe({
      next: async success => {
        console.log(success);
        await this.ToastSucess().then(() => {
          this.route.navigate(['/home']);
        })
      },
      error: error =>{
        console.error(error);
        this.ToastUnsucessful();
      }
    })
  }

  async ToastSucess(){
    const toast = await this.toast.create({
      message: '!Se elimino producto!',
      duration: 3000,
      position:'bottom',
      color:"success",
      animated:true
    });
    await toast.present();   
  }

  async ToastUnsucessful(){
    const toast = await this.toast.create({
      message: '¡No se pudo eliminar el producto!',
      duration: 3000,
      position:'bottom',
      color:"danger",
      animated:true
    });
    await toast.present();   
  }
}
