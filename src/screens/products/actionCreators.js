import {
  INITIAL_LOAD_INIT,
  SET_SELECTED_PRODUCT,
  CANCEL_SUBSCRIPTION_INIT,
  REACTIVE_SUBSCRIPTION_INIT,
} from './actionTypes';

export const initialLoad = () => ({
  type: INITIAL_LOAD_INIT,
});

export const setSelectedProduct = (product) => ({
  type: SET_SELECTED_PRODUCT,
  payload: {
    selectedProduct: product,
  },
});

export const cancelSubscription = (subscription) => ({
  type: CANCEL_SUBSCRIPTION_INIT,
  payload: {
    subscription: subscription,
  },
});

export const reactiveSubscription = (subscription) => ({
  type: REACTIVE_SUBSCRIPTION_INIT,
  payload: {
    subscription: subscription,
  },
});
