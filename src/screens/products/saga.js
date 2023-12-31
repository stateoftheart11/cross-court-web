import { put, takeLatest, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import toast from 'shared/utils/toast';
import ROUTES from 'shared/constants/routes';
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
  REMOVE_SUBSCRIPTION_CANCEL_AT_NEXT_PERIOD_END_INIT,
  REMOVE_SUBSCRIPTION_CANCEL_AT_NEXT_PERIOD_END_SUCCESS,
  REMOVE_SUBSCRIPTION_CANCEL_AT_NEXT_PERIOD_END_FAILURE,
  UPDATE_SUBSCRIPTION_PAYMENT_METHOD_INIT,
  UPDATE_SUBSCRIPTION_PAYMENT_METHOD_SUCCESS,
  UPDATE_SUBSCRIPTION_PAYMENT_METHOD_FAILURE,
  SUBSCRIPTION_REQUEST_CANCELLATION_INIT,
  SUBSCRIPTION_REQUEST_CANCELLATION_SUCCESS,
  SUBSCRIPTION_REQUEST_CANCELLATION_FAILURE,
  CANCEL_SUBSCRIPTION_REQUEST_CANCELLATION_INIT,
  CANCEL_SUBSCRIPTION_REQUEST_CANCELLATION_SUCCESS,
  CANCEL_SUBSCRIPTION_REQUEST_CANCELLATION_FAILURE,
  PAUSE_SUBSCRIPTION_INIT,
  PAUSE_SUBSCRIPTION_SUCCESS,
  PAUSE_SUBSCRIPTION_FAILURE,
  CANCEL_PAUSE_SUBSCRIPTION_INIT,
  CANCEL_PAUSE_SUBSCRIPTION_SUCCESS,
  CANCEL_PAUSE_SUBSCRIPTION_FAILURE,
  UNPAUSE_SUBSCRIPTION_INIT,
  UNPAUSE_SUBSCRIPTION_SUCCESS,
  UNPAUSE_SUBSCRIPTION_FAILURE,
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
    yield call(toast.success, 'Your membership has been reactivated.');
  } catch (err) {
    const { error } = err.response.data;
    yield put({ type: REACTIVATE_SUBSCRIPTION_FAILURE, error });
    yield call(toast.error, error);
  }
}

export function* removeSubscriptionCancelAtNextPeriodEndFlow({ payload }) {
  try {
    const { subscription } = yield call(
      productsService.removeSubscriptionCancelAtNextPeriodEnd,
      payload.subscription.id
    );
    yield put({
      type: REMOVE_SUBSCRIPTION_CANCEL_AT_NEXT_PERIOD_END_SUCCESS,
      payload: { subscription },
    });
    yield call(toast.success, 'Your membership has been reactivated.');
  } catch (err) {
    const { error } = err.response.data;
    yield call(toast.error, error);
    yield put({
      type: REMOVE_SUBSCRIPTION_CANCEL_AT_NEXT_PERIOD_END_FAILURE,
      error,
    });
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
    yield call(toast.success, 'You have updated your membership payment method.');
  } catch (err) {
    const { error } = err.response.data;
    yield put({ type: UPDATE_SUBSCRIPTION_PAYMENT_METHOD_FAILURE, error });
    yield call(toast.error, error);
  }
}

export function* createSubscriptionRequestCancellationFlow({ payload }) {
  try {
    const { subscription } = yield call(
      productsService.createSubscriptionRequestCancellation,
      payload
    );
    yield put({ type: SUBSCRIPTION_REQUEST_CANCELLATION_SUCCESS, payload: { subscription } });
    yield call(toast.success, 'Your cancellation request has been submitted.');
  } catch (err) {
    yield put({ type: SUBSCRIPTION_REQUEST_CANCELLATION_FAILURE, error: err.response.data.error });
  }
}

export function* cancelSubscriptionRequestCancellationFlow({ payload }) {
  try {
    const { subscription } = yield call(
      productsService.cancelSubscriptionRequestCancellation,
      payload
    );
    yield put({
      type: CANCEL_SUBSCRIPTION_REQUEST_CANCELLATION_SUCCESS,
      payload: { subscription },
    });
    yield call(toast.success, 'Your cancellation request has been removed.');
  } catch (err) {
    const { error } = err.response.data;
    yield call(toast.error, error);
    yield put({
      type: CANCEL_SUBSCRIPTION_REQUEST_CANCELLATION_FAILURE,
      error,
    });
  }
}

export function* pauseSubscriptionFlow({ payload }) {
  try {
    const subscription = yield call(
      productsService.pauseSubscription,
      payload.subscription.id,
      payload.reason
    );
    yield put({ type: PAUSE_SUBSCRIPTION_SUCCESS, payload: { subscription } });
    yield call(toast.success, 'Your membership will be paused.');
  } catch (err) {
    yield put({ type: PAUSE_SUBSCRIPTION_FAILURE, error: err.response.data.error });
  }
}

export function* cancelPauseSubscriptionFlow({ payload }) {
  try {
    const subscription = yield call(
      productsService.cancelPauseSubscription,
      payload.subscription.id
    );
    yield put({ type: CANCEL_PAUSE_SUBSCRIPTION_SUCCESS, payload: { subscription } });
    yield call(toast.success, 'Your membership pause has been canceled.');
  } catch (err) {
    yield put({ type: CANCEL_PAUSE_SUBSCRIPTION_FAILURE, error: err.response.data.error });
  }
}

export function* unpauseSubscriptionFlow({ payload }) {
  try {
    const subscription = yield call(productsService.unpauseSubscription, payload.subscription.id);

    yield put({ type: UNPAUSE_SUBSCRIPTION_SUCCESS, payload: { subscription } });
    yield call(toast.success, 'Your membership has been unpaused.');
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put({ type: UNPAUSE_SUBSCRIPTION_FAILURE, error: err.response.data.error });
    yield put(push(ROUTES.MYACCOUNT));
  }
}

export default function* productsSaga() {
  yield all([
    takeLatest(INITIAL_LOAD_INIT, initialLoadFlow),
    takeLatest(CANCEL_SUBSCRIPTION_INIT, cancelSubscriptionFlow),
    takeLatest(REACTIVATE_SUBSCRIPTION_INIT, reactivateSubscriptionFlow),
    takeLatest(
      REMOVE_SUBSCRIPTION_CANCEL_AT_NEXT_PERIOD_END_INIT,
      removeSubscriptionCancelAtNextPeriodEndFlow
    ),
    takeLatest(UPDATE_SUBSCRIPTION_PAYMENT_METHOD_INIT, updateSubscriptionPaymentMethodFlow),
    takeLatest(SUBSCRIPTION_REQUEST_CANCELLATION_INIT, createSubscriptionRequestCancellationFlow),
    takeLatest(
      CANCEL_SUBSCRIPTION_REQUEST_CANCELLATION_INIT,
      cancelSubscriptionRequestCancellationFlow
    ),
    takeLatest(PAUSE_SUBSCRIPTION_INIT, pauseSubscriptionFlow),
    takeLatest(CANCEL_PAUSE_SUBSCRIPTION_INIT, cancelPauseSubscriptionFlow),
    takeLatest(UNPAUSE_SUBSCRIPTION_INIT, unpauseSubscriptionFlow),
  ]);
}
