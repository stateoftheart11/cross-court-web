import { put, takeLatest, call, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import toast from 'shared/utils/toast';

import ROUTES from 'shared/constants/routes';
import { SIGNUP_STATE_COMPLETED } from 'screens/onboarding/constants';
import {
  SET_PAYMENT_METHOD_INIT,
  SET_PAYMENT_METHOD_SUCCESS,
  SET_PAYMENT_METHOD_FAILURE,
  SET_PROMO_CODE_INIT,
  SET_PROMO_CODE_SUCCESS,
  SET_PROMO_CODE_FAILURE,
  COMPLETE_ONBOARDING_INIT,
  COMPLETE_ONBOARDING_SUCCESS,
  COMPLETE_ONBOARDING_FAILURE,
} from 'screens/onboarding/actionTypes';
import paymentMethodsService from 'screens/payment-methods/service';
import checkoutService from 'screens/checkout/service';
import myAccountService from 'screens/my-account/service';

export function* setPaymentMethodFlow({ payload }) {
  try {
    const { stripe, cardElement } = payload;

    const paymentMethod = yield call(
      paymentMethodsService.createPaymentMethod,
      stripe,
      cardElement
    );

    yield put({
      type: SET_PAYMENT_METHOD_SUCCESS,
      payload: { paymentMethod },
    });
    yield put(push(ROUTES.ONBOARDING_REVIEW));
  } catch (err) {
    yield call(toast.error, err.message);
    yield put({ type: SET_PAYMENT_METHOD_FAILURE });
  }
}

export function* setPromoCodeFlow({ payload }) {
  try {
    const { promoCode: promoCodeString, product } = payload;

    const { promoCode } = yield call(checkoutService.checkPromoCode, promoCodeString, product.id);

    yield put({
      type: SET_PROMO_CODE_SUCCESS,
      payload: { promoCode },
    });
  } catch (err) {
    const error = err.response.data.error || 'Invalid discount code';
    yield call(toast.error, error);
    yield put({ type: SET_PROMO_CODE_FAILURE });
  }
}

export function* completeOnboardingFlow() {
  try {
    yield call(myAccountService.editUserProfile, { signupState: SIGNUP_STATE_COMPLETED });
    yield put({ type: COMPLETE_ONBOARDING_SUCCESS });
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put({ type: COMPLETE_ONBOARDING_FAILURE });
  }
}

export default function* onboardingSaga() {
  yield all([
    takeLatest(SET_PAYMENT_METHOD_INIT, setPaymentMethodFlow),
    takeLatest(SET_PROMO_CODE_INIT, setPromoCodeFlow),
    takeLatest(COMPLETE_ONBOARDING_INIT, completeOnboardingFlow),
  ]);
}
