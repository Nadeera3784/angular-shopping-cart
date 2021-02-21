import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {select} from '@angular-redux/store';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkOutForm: FormGroup;

  @select() cart;

  cart_items:any;

  cart_total:number;

  constructor(private fb: FormBuilder) { }

  
  ngOnInit(){
    this.cart.subscribe(
      state => {
       this.cart_items = state['product_list'];
       this.cart_total = state['total'];
      }
    )

    this.checkOutForm = this.fb.group({
      email:     ['', [Validators.required, Validators.email]],
      firstname: ['', [Validators.required]],
      lastname:  ['', [Validators.required]],
      address:   ['', [Validators.required]],
      city:      ['', [Validators.required]],
      state:     ['', [Validators.required]],
      zip:       ['', [Validators.required]],
    });
    
  }
  
  onCheckoutSubmit(){

  }

  ngOnDestroy() {
    this.cart.unsubscribe();
  }

}
