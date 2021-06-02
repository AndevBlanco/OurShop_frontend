import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { MenuComponent } from './pages/menu/menu.component';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/user/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/user/signup/signup.component';
import { ProductComponent } from './pages/product/product.component';
import { DescriptionModalComponent } from './pages/product/description-modal/description-modal.component';
import { OpinionsComponent } from './pages/product/opinions/opinions.component';
import { ProductAddComponent } from "./pages/product/product-add/product-add.component";

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './pages/user/account/account.component';
import { PasswordComponent } from './pages/user/password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ProductComponent,
    DescriptionModalComponent,
    OpinionsComponent,
    ProductAddComponent,
    AccountComponent,
    PasswordComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  exports: [MenuComponent],
})
export class AppModule {}
