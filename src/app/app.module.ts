import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule} from '@angular-redux/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IAppState, rootReducer, INITIAL_STATE } from './store/store';
import { applyMiddleware, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';
import { ShoppingComponent } from './shopping/shopping.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

export const store: Store = createStore(
  rootReducer,
  INITIAL_STATE,
  // composeWithDevTools(applyMiddleware(createLogger()))
);


@NgModule({
  declarations: [
    AppComponent,
    ShoppingComponent,
    CheckoutComponent,
    CartComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgReduxModule,
    BrowserAnimationsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(public ngRedux: NgRedux<IAppState>) {
    ngRedux.provideStore(store);
  }
}