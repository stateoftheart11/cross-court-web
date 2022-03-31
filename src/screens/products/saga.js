import { put, takeLatest, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { INITIAL_LOAD_INIT as INITIAL_PAYMENT_METHODS_LOAD_INIT } from 'screens/payment-methods/actionTypes';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  CANCEL_SUBSCRIPTION_INIT,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_FAILURE,
  REACTIVATE_SUBSCRIPTION_INIT,
  REACTIVATE_SUBSCRIPTION_SUCCESS,
  REACTIVATE_SUBSCRIPTION_FAILURE,
  UPDATE_SUBSCRIPTION_PAYMENT_METHOD_INIT,
  UPDATE_SUBSCRIPTION_PAYMENT_METHOD_SUCCESS,
  UPDATE_SUBSCRIPTION_PAYMENT_METHOD_FAILURE,
  SUBSCRIPTION_FEEDBACK_INIT,
  SUBSCRIPTION_FEEDBACK_SUCCESS,
  SUBSCRIPTION_FEEDBACK_FAILURE,
} from './actionTypes';
import productsService from './service';

export function* initialLoadFlow() {
  try {
    const availableProductsPayload = yield call(productsService.getAllProducts);
    yield put({
      type: INITIAL_LOAD_SUCCESS,
      payload: { availableProducts: [...availableProductsPayload] },
    });
  } catch (err) {
    yield put({ type: INITIAL_LOAD_FAILURE, error: err.response.data.error });
  }
}

export function* cancelSubscriptionFlow(action) {
  try {
    const subscription = yield call(
      productsService.cancelSubscription,
      action.payload.subscription.id
    );
    yield put({
      type: CANCEL_SUBSCRIPTION_SUCCESS,
      payload: { subscription },
    });
  } catch (err) {
    yield put({ type: CANCEL_SUBSCRIPTION_FAILURE, error: err.response.data.error });
  }
}

export function* reactivateSubscriptionFlow(action) {
  try {
    const subscription = yield call(
      productsService.reactivateSubscription,
      action.payload.subscription.id
    );
    yield put({
      type: REACTIVATE_SUBSCRIPTION_SUCCESS,
      payload: { subscription },
    });
    yield call(toast.success, 'Your subscription has been reactivated successfully');
  } catch (err) {
    const error = err.response.data.error;
    yield put({ type: REACTIVATE_SUBSCRIPTION_FAILURE, error });
    yield call(toast.error, error);
  }
}

export function* updateSubscriptionPaymentMethodFlow(action) {
  try {
    const subscription = yield call(
      productsService.updateSubscriptionPaymentMethod,
      action.payload.subscription.id,
      action.payload.paymentMethod.id
    );
    yield put({
      type: UPDATE_SUBSCRIPTION_PAYMENT_METHOD_SUCCESS,
      payload: { subscription },
    });
    yield put({ type: INITIAL_PAYMENT_METHODS_LOAD_INIT });
    yield call(toast.success, 'You have updated your membership payment method successfully');
  } catch (err) {
    const error = err.response.data.error;
    yield put({ type: UPDATE_SUBSCRIPTION_PAYMENT_METHOD_FAILURE, error });
    yield call(toast.error, error);
  }
}

export function* subscriptionFeedbackFlow({ payload }) {
  try {
    yield call(productsService.subscriptionFeedback, payload);
    yield put({ type: SUBSCRIPTION_FEEDBACK_SUCCESS });
  } catch (err) {
    yield put({ type: SUBSCRIPTION_FEEDBACK_FAILURE, error: err.response.data.error });
  }
}

export default function* productsSaga() {
  yield all([
    takeLatest(INITIAL_LOAD_INIT, initialLoadFlow),
    takeLatest(CANCEL_SUBSCRIPTION_INIT, cancelSubscriptionFlow),
    takeLatest(REACTIVATE_SUBSCRIPTION_INIT, reactivateSubscriptionFlow),
    takeLatest(UPDATE_SUBSCRIPTION_PAYMENT_METHOD_INIT, updateSubscriptionPaymentMethodFlow),
    takeLatest(SUBSCRIPTION_FEEDBACK_INIT, subscriptionFeedbackFlow),
  ]);
}
