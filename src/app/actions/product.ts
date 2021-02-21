import {AppConstants} from '../constants/AppConstants.js';

export const AddProduct = (payload) => {
    return {
      type: AppConstants.ADD_PRODUCT,
      payload
    };
};