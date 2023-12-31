import { put, all, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import ROUTES from 'shared/constants/routes';
import toast from 'shared/utils/toast';

import myAccountService from 'screens/my-account/service';
import { SAVE_SESSION_TO_STORAGE } from 'shared/actions/actionTypes';
import {
  INITIAL_LOAD_INIT,
  INITIAL_LOAD_SUCCESS,
  INITIAL_LOAD_FAILURE,
  INITIAL_LOAD_AUTH_INIT,
  INITIAL_LOAD_AUTH_SUCCESS,
  INITIAL_LOAD_AUTH_FAILURE,
  RESERVE_SESSION_INIT,
  RESERVE_SESSION_SUCCESS,
  RESERVE_SESSION_FAILURE,
  CANCEL_SESSION_INIT,
  CANCEL_SESSION_SUCCESS,
  CANCEL_SESSION_FAILURE,
  SIGNUP_BOOK_SESSION,
  BUY_CREDITS_AND_BOOK_SESSION,
  JOIN_SESSION_WAITLIST_INIT,
  JOIN_SESSION_WAITLIST_SUCCESS,
  JOIN_SESSION_WAITLIST_FAILURE,
  SHOW_WAITLIST_MODAL,
  CLOSE_WAITLIST_MODAL,
  CLOSE_ADD_GUEST_MODAL,
  REMOVE_SESSION_WAITLIST_INIT,
  REMOVE_SESSION_WAITLIST_SUCCESS,
  REMOVE_SESSION_WAITLIST_FAILURE,
  VOTE_SESSION_INIT,
  VOTE_SESSION_SUCCESS,
  VOTE_SESSION_FAILURE,
  REMOVE_VOTE_SESSION_INIT,
  REMOVE_VOTE_SESSION_SUCCESS,
  REMOVE_VOTE_SESSION_FAILURE,
  ADD_SESSION_GUEST_INIT,
  ADD_SESSION_GUEST_SUCCESS,
  ADD_SESSION_GUEST_FAILURE,
  REMOVE_SESSION_GUEST_INIT,
  REMOVE_SESSION_GUEST_SUCCESS,
  REMOVE_SESSION_GUEST_FAILURE,
} from './actionTypes';
import sessionService from './service';

export function* initialLoadFlow({ payload }) {
  try {
    const sessionInfoPayload = yield call(
      sessionService.getSessionInfo,
      payload.sessionId,
      payload.date
    );

    yield put({
      type: INITIAL_LOAD_SUCCESS,
      payload: { sessionInfo: sessionInfoPayload },
    });
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put(push(ROUTES.LOCATIONS));
    yield put({ type: INITIAL_LOAD_FAILURE, error: err.response.data.error });
  }
}

export function* initialLoadAuthFlow({ payload }) {
  try {
    const [sessionInfoPayload, userProfilePayload] = yield all([
      call(sessionService.getSessionInfo, payload.sessionId, payload.date),
      call(myAccountService.getUserProfile),
    ]);
    yield put({
      type: INITIAL_LOAD_AUTH_SUCCESS,
      payload: {
        sessionInfo: sessionInfoPayload,
        userProfile: userProfilePayload,
      },
    });
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put(push(ROUTES.LOCATIONS));
    yield put({ type: INITIAL_LOAD_AUTH_FAILURE, error: err.response.data.error });
  }
}

export function* reserveSessionFlow({ payload }) {
  try {
    if (payload.profileRequiredValues) {
      yield call(myAccountService.editUserProfile, payload.profileRequiredValues);
    }

    const userSession = yield call(
      sessionService.reserveSession,
      payload.sessionId,
      payload.date,
      payload.referralCode,
      payload.goal,
      payload.shootingMachineIds,
      payload.scouting
    );
    yield put({
      type: RESERVE_SESSION_SUCCESS,
      payload: { userSession, sessionId: payload.sessionId },
    });
    yield put(push(payload.redirectTo || ROUTES.SESSIONRESERVED));
    yield call(toast.success, 'Session booked.');
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put({
      type: RESERVE_SESSION_FAILURE,
      error: err.response.data.error,
      payload: { sessionId: payload.sessionId },
    });
  }
}

export function* cancelSessionFlow({ payload }) {
  try {
    yield call(sessionService.cancelSession, payload.sessionId);

    yield put({
      type: CANCEL_SESSION_SUCCESS,
    });
    yield call(toast.success, 'Session canceled.');
    yield put(push(ROUTES.LOCATIONS));
  } catch (err) {
    yield put({ type: CANCEL_SESSION_FAILURE, error: err.response.data.error });
  }
}

export function* joinSessionWaitlistFlow({ payload }) {
  try {
    const response = yield call(
      sessionService.joinSessionWaitlist,
      payload.sessionId,
      payload.sessionDate
    );
    yield put({
      type: JOIN_SESSION_WAITLIST_SUCCESS,
      payload: {
        sessionId: payload.sessionId,
        sessionDate: payload.sessionDate,
        waitlistPlacement: response.waitlistPlacement,
      },
    });
    yield put({
      type: SHOW_WAITLIST_MODAL,
      payload: { sessionId: payload.sessionId },
    });
  } catch (err) {
    yield call(toast.error, err.response.data.error);
    yield put({
      type: JOIN_SESSION_WAITLIST_FAILURE,
      error: err.response.data.error,
      payload: { sessionId: payload.sessionId },
    });
  }
}

export function* removeSessionWaitlistFlow({ payload }) {
  try {
    yield call(sessionService.removeSessionWaitlist, payload.sessionId, payload.sessionDate);
    yield put({
      type: REMOVE_SESSION_WAITLIST_SUCCESS,
      payload: { sessionId: payload.sessionId, sessionDate: payload.sessionDate },
    });
    yield put({ type: CLOSE_WAITLIST_MODAL });
    yield call(toast.success, 'You have been removed from the waitlist.');
  } catch (err) {
    const errorMessage = err.response.data.error;
    yield put({
      type: REMOVE_SESSION_WAITLIST_FAILURE,
      error: errorMessage,
      payload: { sessionId: payload.sessionId },
    });
    yield call(toast.error, errorMessage);
  }
}

export function* signupBookSessionFlow({ payload }) {
  try {
    yield put({ type: SAVE_SESSION_TO_STORAGE, payload });
    yield put(push(ROUTES.SIGNUP));
  } catch (err) {}
}

export function* buyCreditsAndBookSessionFlow({ payload }) {
  try {
    yield put({ type: SAVE_SESSION_TO_STORAGE, payload });
    yield put(push(ROUTES.MEMBERSHIPS));
  } catch (err) {}
}

export function* voteSessionFlow({ payload }) {
  try {
    yield call(sessionService.voteSession, payload.sessionId, payload.sessionDate);
    yield put({
      type: VOTE_SESSION_SUCCESS,
      payload: { sessionId: payload.sessionId, sessionDate: payload.sessionDate },
    });
    yield call(toast.success, 'Session voted.');
  } catch (err) {
    const errorMessage = err.response.data.error;
    yield call(toast.error, errorMessage);
    yield put({ type: VOTE_SESSION_FAILURE, error: errorMessage });
  }
}

export function* removeVoteSessionFlow({ payload }) {
  try {
    yield call(sessionService.removeVoteSession, payload.sessionId, payload.sessionDate);
    yield put({
      type: REMOVE_VOTE_SESSION_SUCCESS,
      payload: { sessionId: payload.sessionId, sessionDate: payload.sessionDate },
    });
    yield call(toast.success, 'Session vote removed.');
  } catch (err) {
    const errorMessage = err.response.data.error;
    yield call(toast.error, errorMessage);
    yield put({ type: REMOVE_VOTE_SESSION_FAILURE, error: errorMessage });
  }
}

export function* addSessionGuestFlow({ payload, options }) {
  try {
    const { callAction } = options;

    const sessionGuest = yield call(
      sessionService.addSessionGuest,
      payload.userSessionId,
      payload.guestInfo
    );

    yield put({
      type: ADD_SESSION_GUEST_SUCCESS,
      payload: { sessionGuest },
    });
    yield put({
      type: CLOSE_ADD_GUEST_MODAL,
      payload: { sessionGuest },
    });

    if (callAction) {
      yield put(callAction);
    }

    yield call(toast.success, 'Guest added to the session.');
  } catch (err) {
    const errorMessage = err.response.data.error;
    yield call(toast.error, errorMessage);
    yield put({ type: ADD_SESSION_GUEST_FAILURE, error: errorMessage });
  }
}

export function* removeSessionGuestFlow({ payload, options }) {
  try {
    const { callAction } = options;

    yield call(sessionService.removeSessionGuest, payload.userSessionId, payload.sessionGuestId);
    yield put({
      type: REMOVE_SESSION_GUEST_SUCCESS,
      payload: { sessionGuestId: payload.sessionGuestId },
    });

    if (callAction) {
      yield put(callAction);
    }

    yield call(toast.success, 'Guest removed from the session.');
  } catch (err) {
    const errorMessage = err.response.data.error;
    yield call(toast.error, errorMessage);
    yield put({ type: REMOVE_SESSION_GUEST_FAILURE, error: errorMessage });
  }
}

export default function* rootSessionSaga() {
  yield all([
    takeLatest(INITIAL_LOAD_INIT, initialLoadFlow),
    takeLatest(INITIAL_LOAD_AUTH_INIT, initialLoadAuthFlow),
    takeLatest(RESERVE_SESSION_INIT, reserveSessionFlow),
    takeLatest(CANCEL_SESSION_INIT, cancelSessionFlow),
    takeLatest(JOIN_SESSION_WAITLIST_INIT, joinSessionWaitlistFlow),
    takeLatest(REMOVE_SESSION_WAITLIST_INIT, removeSessionWaitlistFlow),
    takeLatest(SIGNUP_BOOK_SESSION, signupBookSessionFlow),
    takeLatest(BUY_CREDITS_AND_BOOK_SESSION, buyCreditsAndBookSessionFlow),
    takeLatest(VOTE_SESSION_INIT, voteSessionFlow),
    takeLatest(REMOVE_VOTE_SESSION_INIT, removeVoteSessionFlow),
    takeLatest(ADD_SESSION_GUEST_INIT, addSessionGuestFlow),
    takeLatest(REMOVE_SESSION_GUEST_INIT, removeSessionGuestFlow),
  ]);
}
