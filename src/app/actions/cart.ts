import {AppConstants} from '../constants/AppConstants.js';


export const AddToCartAction = (payload) => {
    return {
      type: AppConstants.ADD_TO_CART,
      payload
    };
};


    
