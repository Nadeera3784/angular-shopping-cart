import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions} from '@angular/router';
import {ShoppingComponent} from '../app/shopping/shopping.component';
import {CheckoutComponent} from '../app/checkout/checkout.component';
import {CartComponent} from '../app/cart/cart.component';
import {CheckOutGuard} from '../app/services/checkout.guard';

const routes: Routes = [
  {path: '' , component: ShoppingComponent},
  {path: 'cart' , component: CartComponent},
  {path: 'checkout' , component: CheckoutComponent, canActivate: [CheckOutGuard]}
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  providers: [
    CheckOutGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


