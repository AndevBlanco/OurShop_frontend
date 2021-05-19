import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import {ProductAddComponent} from './pages/product/product-add/product-add.component';
import { ProductComponent } from './pages/product/product.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  // },
  {
    path: 'home', component: HomeComponent, pathMatch: 'full'
   
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
     path: 'login', component: LoginComponent , pathMatch: 'full'
  },
  {
    path:'signup', component:SignupComponent , pathMatch:'full'
  },
  {
    path:'account',component:AccountComponent, pathMatch:'full'
  },
  {
    path: 'product',
    children: [
      {
        path: ':label',
        component: ProductComponent
      }
    ]
  },
  {
    path: 'crear-producto',
    component: ProductAddComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
