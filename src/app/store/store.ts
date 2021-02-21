import { EventEmitter, Injectable } from '@angular/core';

import { IToast } from './itoast';
import { IProduct } from './iproduct';
import { ICart } from './icart';
import { productsOriginal } from './seeds';
import { AppConstants } from '../constants/AppConstants';

export interface IAppState {
    toasts : IToast[];
    products : IProduct[];
    filtered_proudcts : IProduct[];
    cart : ICart;
    lastUpdate: Date;
}

export const INITIAL_STATE: IAppState = {
    toasts : [],
    cart : {
        product_list: [],
        total: 0,
        count : 0
    },
    products : productsOriginal,
    filtered_proudcts : [],
    lastUpdate: null
}


let cartTotal = 0;


const reducer = (accumulator, currentValue) => {
    if (typeof accumulator === "number") {
      return (
        accumulator + Number(currentValue.qty) * Number(currentValue.price)
      );
    } else {
      return (
        Number(accumulator.qty) * Number(accumulator.price) +
        Number(currentValue.qty) * Number(currentValue.price)
      );
    }
};

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case AppConstants.ADD_TOAST:{
            const toasts = [...state.toasts, action.toast];
            return {
              ...state,
              toasts,
            };
        }
        case (AppConstants.REMOVE_TOAST): {
            const toasts = [...state.toasts].filter((n) => n._id !== action.id);
            return {
              ...state,
              toasts,
            };
        }
        case (AppConstants.LOAD_PRODUCTS): {
            const products = [...state.products];
            return {
              ...state,
              products
            };
        }
        case (AppConstants.ADD_PRODUCT):{
            const products = [...state.products, action.payload];
            return {
              ...state,
              products,
            };
        }

        case (AppConstants.ADD_TO_CART): {
            if (state.cart.product_list.some(p => p.title === action.payload.title)) {

                let selected = state.cart.product_list.find(
                    p => p.title === action.payload.title
                );

                selected.qty += 1;

                let noSelected = state.cart.product_list.filter(
                    p => p.title !== action.payload.title
                );

                let cartProducts = [...noSelected, selected];

                if (cartProducts.length > 1) {
                    cartTotal = cartProducts.reduce(reducer);
                } else if (cartProducts.length === 1) {
                    cartTotal = Number(cartProducts[0].qty) * Number(cartProducts[0].price);
                }

                  return {
                    ...state,
                    cart: {
                      ...state.cart,
                      product_list: cartProducts,
                      total: cartTotal,
                      count : state.cart.count + 1
                    }
                  };
            }else{
                let product = action.payload;

                product.qty = 1;

                let product_list = [...state.cart.product_list, product];

                if (product_list.length > 1) {
                   cartTotal = product_list.reduce(reducer);
                } else if (product_list.length === 1) {
                   cartTotal = Number(product_list[0].qty) * Number(product_list[0].price);
                }

                return {
                    ...state,
                    cart: {
                        ...state.cart, 
                        product_list: product_list,
                        total: cartTotal,
                        count : state.cart.count + 1
                    }
                };
            }
            
        }

        case(AppConstants.REMOVE_FROM_CART): {
              let cartProducts = [
                ...state.cart.product_list.filter(p => p.title !== action.payload.title)
              ];
              if (cartProducts.length > 1) {
                cartTotal = cartProducts.reduce(reducer);
              } else if (cartProducts.length === 1) {
                cartTotal = Number(cartProducts[0].qty) * Number(cartProducts[0].price);
              }else{
                cartTotal = 0; 
              }

              return {
                ...state,
                cart: {
                  ...state.cart,
                  product_list: cartProducts,
                  total:  cartTotal,
                  count : state.cart.count - 1
                }
              };
        }

        case (AppConstants.INCREASE_QTY): {
          let selected = state.cart.product_list.find(
            p => p.title === action.payload.title
          );

          selected.qty += 1;

          let noSelected = state.cart.product_list.filter(
            p => p.title !== action.payload.title
          );

          let cartProducts = [...noSelected, selected];

          if (cartProducts.length > 1) {
            cartTotal = cartProducts.reduce(reducer);
          } else if (cartProducts.length === 1) {
              cartTotal = Number(cartProducts[0].qty) * Number(cartProducts[0].price);
          }

          return {
            ...state,
            cart: {
              ...state.cart,
              product_list: state.cart.product_list.map((product, index) => {
                if(product.title === action.payload.title) {
                  return {
                    ...product,
                    qty: product.qty++
                  }
                }
                return product;
              }),
              total: cartTotal,
              count : state.cart.count + 1
            }
          };
      }

      case (AppConstants.DECREASE_QTY): {
        let selected = state.cart.product_list.find(
          p => p.title === action.payload.title
        );

        selected.qty -= 1;

        let noSelected = state.cart.product_list.filter(
          p => p.title !== action.payload.title
        );

        let cartProducts = [...noSelected, selected];

        if (cartProducts.length > 1) {
          cartTotal = cartProducts.reduce(reducer);
        } else if (cartProducts.length === 1) {
            cartTotal = Number(cartProducts[0].qty) * Number(cartProducts[0].price);
        }
        

        return {
          ...state,
          cart: {
            ...state.cart,
            product_list: state.cart.product_list.map((product, index) => {
              if(product.title === action.payload.title) {
                return {
                  ...product,
                  qty: product.qty--
                }
              }
              return product;
            }),
            total: cartTotal,
            count : state.cart.count -= 1
          }
        }


      }

      case(AppConstants.CLEAR_CART): {
            return  {
                ...state,
                cart : {
                    product_list : [],
                    count : 0,
                    total : 0
                }
    
            };

        }
        case(AppConstants.CATEGORY_FILTER): {

            const filtered_proudcts = state.products.filter(product => {
                if(action.payload){
                    if(product.category.toLowerCase() === action.payload.toLowerCase()){
                        return product;
                    }
                }
            })
            return {
                ...state,
                filtered_proudcts :  filtered_proudcts
            };

        }

        case(AppConstants.LOAD_CART_ITEMS): {
            
            return {
              ...state,
              cart : state.cart
            };

        }
        default: {
            return state;
        }
    
            
    }
}

