import { Routes } from '@angular/router';
import {ClientPageComponent} from './pages/client-page/client-page.component';
import {ProductPageComponent} from './pages/product-page/product-page.component';
import {OrderPageComponent} from './pages/order-page/order-page.component';

export const routes: Routes = [
  {path:"",component:ClientPageComponent},
  {path:"products",component: ProductPageComponent},
  {path:"orders",component:OrderPageComponent},
  {path: "**", redirectTo: ''},
];
