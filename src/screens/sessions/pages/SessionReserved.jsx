import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import ROUTES from 'shared/constants/routes';
import colors from 'shared/styles/constants';
import SportCharacter from 'shared/images/sport-character.png';
import confettiAnimation from 'shared/animations/confetti.json';

import SessionGuests from 'screens/sessions/components/SessionGuests';
import AddGuestModal from 'screens/sessions/components/modals/AddGuestModal';

import Animation from 'shared/components/Animation';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import ReferAFriend from 'shared/components/ReferAFriend';
import { getUserProfile } from 'screens/my-account/reducer';
import { getSessionInfo } from 'screens/sessions/reducer';
import { sessionGuestsAllowed } from 'screens/sessions/utils';

const SessionBookedContainer = styled.div`
  .title {
    font-family: shapiro95_super_wide;
    color: ${colors.brandBlack};
    font-size: 24px;
    line-height: 24px;
    @media (min-width: 992px) {
      font-size: 33px;
      line-height: 33px;
    }
  }

  .subtitle {
    color: ${colors.brandBlack};
    font-family: dharma_gothic_cexbold;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${colors.brandBlack};
    font-family: shapiro95_super_wide;
    font-size: 26px;
    line-height: 26px;
    @media (min-width: 992px) {
      font-size: 36px;
      line-height: 36px;
    }
  }

  .black-btn {
    border: 3px solid black;
    .content {
      border: 0;
      color: black;
      transition: 500ms background-color ease, 500ms color ease;
      :hover {
        background-color: black;
        color: white;
      }
    }
  }
`;

const SessionReserved = () => {
  const currentUser = useSelector(getUserProfile) || {};
  const sessionInfo = useSelector(getSessionInfo);

  const [showAddGuestModal, setShowAddGuestModal] = useState(false);

  const guestsAllowed = sessionGuestsAllowed(sessionInfo);

  return (
    <>
      <SessionBookedContainer className="relative px-4">
        <Animation animation={confettiAnimation} className="absolute inset-0" />
        <div className="min-h-screen flex flex-col items-center justify-center relative z-10">
          <img className="w-52" src={SportCharacter} alt="Sport Icon" />
          <p className="title">{sessionInfo?.isOpenClub ? 'OPEN CLUB' : 'SESSION'} BOOKED</p>
          <p className="subtitle">SUCCESSFULLY!</p>
          {guestsAllowed ? (
            <>
              <p className="my-6 text-lg">Easily invite a friend to your session below:</p>
              <SessionGuests
                session={sessionInfo}
                setShowAddGuestModal={setShowAddGuestModal}
                className="flex flex-col items-center w-[24rem] md:w-[34rem]"
              />
            </>
          ) : (
            <ReferAFriend code={currentUser.referralCode} className="text-center" />
          )}

          <PrimaryButton bg="transparent" className="black-btn mb-10" to={ROUTES.MYACCOUNT}>
            DONE
          </PrimaryButton>
        </div>
      </SessionBookedContainer>
      <AddGuestModal
        userSessionId={sessionInfo?.userSession?.id}
        showAddGuestModal={showAddGuestModal}
        setShowAddGuestModal={setShowAddGuestModal}
      />
    </>
  );
};

export default SessionReserved;
