import { Component, OnInit } from '@angular/core';
import { NgRedux, select} from '@angular-redux/store';
import { IAppState } from '../store/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @select() cart;

  isShown:boolean = false;
  
  constructor(private store: NgRedux<IAppState>) { }

  ngOnInit(){
    this.cart.subscribe(
      state => {
        console.log('store_changed');
      }
    )
  }

}
