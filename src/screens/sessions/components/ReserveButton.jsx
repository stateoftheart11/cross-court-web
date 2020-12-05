import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isNil, equals } from 'ramda';
import PropTypes from 'prop-types';

import Button from 'shared/components/Button';
import AlternativeButton from 'shared/components/AlternativeButton';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { isPast, formatSessionTime, formatSessionDate } from 'shared/utils/date';
import { getUserProfile } from 'screens/my-account/reducer';

import { getSessionDate } from '../reducer';

import { initialLoadInit } from 'screens/payments/actionCreators';
import { getAvailableCards } from 'screens/payments/reducer';
import ROUTES from 'shared/constants/routes';

const ReserveButton = ({
  reserveSessionAction,
  session,
  signupBookSessionAction,
  createAndReserveFreeSessionHandler,
}) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const sessionDate = useSelector(getSessionDate);
  const { phoneNumber } = useSelector(getUserProfile);

  const emailSessionDate = formatSessionDate(sessionDate);
  const sessionTime = formatSessionTime(session.time);
  const mailInfo = `mailto:info@crosscourt.com?subject=Join Waitlist&body=I would like to be added to the waitlist for the ${sessionTime} session on ${emailSessionDate} at ${session.location.name}. Please notify me if a spot opens up. You can reach me at ${phoneNumber}.`;

  /* START FSF FLOW VARS */
  const dispatch = useDispatch();
  const history = useHistory();
  const availableCards = useSelector(getAvailableCards);
  /* END FSF FLOW VARS */

  /* START FSF FLOW LOGIC */
  const userInfo = useSelector(getUserProfile);
  const freeSessionNotExpired = new Date(userInfo.freeSessionExpirationDate) > new Date();
  const freeSessionNotClaimed = userInfo.freeSessionState === 'not_claimed';
  const isFSFFlow = freeSessionNotExpired && freeSessionNotClaimed;
  /* END FSF FLOW LOGIC */

  useEffect(() => {
    dispatch(initialLoadInit());
  }, [dispatch]);

  if (isAuthenticated) {
    if (isNil(session.userSession)) {
      if (session.full) {
        return (
          <a href={mailInfo}>
            <AlternativeButton className="btn-alternative">JOIN WAITLIST</AlternativeButton>
          </a>
        );
      }
      return (
        <Button
          className="ar-button double reserve-btn"
          onClick={() => {
            if (!availableCards.length && isFSFFlow) {
              window.localStorage.setItem('redirect', window.location.pathname);
              history.push(ROUTES.PAYMENTS);
            } else {
              if (isFSFFlow) {
                createAndReserveFreeSessionHandler();
              } else {
                reserveSessionAction();
              }
            }
          }}
          disabled={isPast(sessionDate)}
        >
          <div className="ar-button-inner">CONFIRM RESERVATION</div>
          <div className="double-drop"></div>
        </Button>
      );
    }

    if (equals(session.userSession.state, 'reserved')) {
      return <></>;
    }
  } else {
    return (
      <Button
        className="ar-button reserve-btn inverted double"
        onClick={() => {
          window.localStorage.setItem('redirect', window.location.pathname);
          history.push(ROUTES.SIGNUP);
        }}
      >
        <div className="ar-button-inner">SIGN UP</div>
        <div className="double-drop"></div>
      </Button>
    );
  }

  return (
    <Button className="ar-button reserve-btn inverted double" onClick={signupBookSessionAction}>
      <div className="ar-button-inner">CONFIRM RESERVATION</div>
      <div className="double-drop"></div>
    </Button>
  );
};

ReserveButton.propTypes = {
  reserveSessionAction: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  signupBookSessionAction: PropTypes.func.isRequired,
};

export default ReserveButton;
