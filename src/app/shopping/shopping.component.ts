import { ApplicationRef, ViewChild, Component, OnInit } from '@angular/core';
import { NgRedux, select} from '@angular-redux/store';
import { IAppState } from '../store/store';
import { AppConstants} from '../constants/AppConstants';
import { AddToCartAction } from '../actions/cart';
import { AddProduct} from '../actions/product';


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingComponent implements OnInit {

  @select() products;

  @select() filtered_proudcts;

  @select() cart;

  @select() toasts;

  searchInput:string = "";
   
  show_filter:boolean = false; 


  constructor(
    private store: NgRedux<IAppState>
    ) {   
    const new_proudct_1 = {
          id : 13,
          title : 'Test title',
          category : 'Clothes',
          price : 20,
          image : 'default.png',
          qty : 0
    }
      
    //this.store.dispatch(AddProduct(new_proudct_1));
  }

  ngOnInit(){
    this.store.dispatch({type:AppConstants.LOAD_PRODUCTS}); 
  }

  onAddToCart(product){
    //this.store.dispatch({type:AppConstants.ADD_TO_CART, payload : product});
    //this.appRef.tick();
    this.store.dispatch(AddToCartAction(product));
  }

  
  onClearCart(){
    this.store.dispatch({type:AppConstants.CLEAR_CART});
  }

  onClickCategoryFilter(category){
    this.show_filter = true;
    this.store.dispatch({type:AppConstants.CATEGORY_FILTER, payload:category});  
  }

  onClickCategoryFilterAll(){
    this.show_filter = false;
    this.store.dispatch({type:AppConstants.LOAD_PRODUCTS});    
  }

}
