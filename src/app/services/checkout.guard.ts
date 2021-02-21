import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {select} from '@angular-redux/store';


@Injectable()

export class CheckOutGuard implements CanActivate {

  @select() cart;

  cart_items:any;

  constructor(private router: Router) { 
    this.cart.subscribe(
        state => {
         this.cart_items = state['product_list'];
        }
      )
  }

  canActivate() {
    if (this.cart_items.length > 0) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }

}
