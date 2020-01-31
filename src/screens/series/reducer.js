import { createSelector } from 'reselect';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  SET_SELECTED_PRODUCT,
} from './actionTypes';

const initialState = {
  pageLoading: false,
  availableProducts: [],
  selectedProduct: null,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIAL_LOAD_INIT:
      return {
        ...state,
        pageLoading: true,
      };
    case INITIAL_LOAD_SUCCESS:
      return {
        pageLoading: false,
        availableProducts: [...action.payload.availableProducts],
      };
    case INITIAL_LOAD_FAILURE:
      return {
        ...state,
        pageLoading: false,
        error: action.error,
      };
    case SET_SELECTED_PRODUCT:
      return {
        ...state,
        selectedProduct: { ...action.payload.selectedProduct },
      };
    default:
      return state;
  }
};

export const getSeries = state => state.series;

export const getPageLoading = createSelector(getSeries, series => series.pageLoading);

export const getError = createSelector(getSeries, series => series.error);

export const getAvailableProducts = createSelector(getSeries, series => series.availableProducts);

export const getSelectedProduct = createSelector(getSeries, series => series.selectedProduct);