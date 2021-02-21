import { Component, OnInit } from '@angular/core';

import { NgRedux, select} from '@angular-redux/store';
import { IAppState } from '../store/store';
import { AppConstants} from '../constants/AppConstants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @select() cart;

  cart_items:any;

  cart_total:number;

  constructor( private store: NgRedux<IAppState>) { }

  ngOnInit() {
    this.cart.subscribe(
      state => {
       this.cart_items = state['product_list'];
       this.cart_total = state['total'];
      }
    )
  }

  onRemoveItem(item){
    this.store.dispatch({type:AppConstants.REMOVE_FROM_CART, payload:item});
  }

  decreaseQty(item){
    if(item.qty > 1){
      this.store.dispatch({type:AppConstants.DECREASE_QTY, payload:item});
    }
  }

  increaseQty(item){
    this.store.dispatch({type:AppConstants.INCREASE_QTY, payload:item});
  }

  ngOnDestroy() {
    this.cart.unsubscribe();
  }

}
