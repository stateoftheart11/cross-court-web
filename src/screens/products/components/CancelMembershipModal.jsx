import React, { useState } from 'react';
import Modal from 'shared/components/Modal';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import useWindowSize from 'shared/hooks/useWindowSize';
import { size } from 'shared/styles/mediaQueries';

const CancelMembershipModal = ({ cancelSubscriptionAction, setShowCancelModal, ...props }) => {
  const { width: windowSize } = useWindowSize();
  const [showCancelMsg, setShowCancelMsg] = useState(false);

  const handleClick = async () => {
    await cancelSubscriptionAction();
    setShowCancelMsg(true);
  };

  const closeHandler = () => {
    setShowCancelMsg(false);
    setShowCancelModal(false);
  };

  return (
    <Modal
      {...props}
      closeHandler={closeHandler}
      style={{
        borderRadius: 0,
        width: windowSize < size.desktop ? '80%' : '35rem',
        height: windowSize < size.desktop ? '' : '15rem',
      }}
      showCloseButton
    >
      <div className="flex flex-col items-center my-4">
        {showCancelMsg ? (
          <>
            <p>We&apos;ll miss you on the CCTeam!</p>
            <p>Hope you come back soon!</p>
          </>
        ) : (
          <>
            <p className="mb-4">Are you sure you want to cancel your membership?</p>
            <PrimaryButton onClick={handleClick}>YES</PrimaryButton>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CancelMembershipModal;