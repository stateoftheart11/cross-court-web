import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { longSessionDate, formatSessionTime } from 'shared/utils/date';
import { pluralize } from 'shared/utils/helpers';
import Modal from 'shared/components/Modal';
import Button from 'shared/components/Button';

export const CancelModal = ({ isOpen, closeHandler, cancelSession, session, user }) => {
  const [disableBtn, setDisableBtn] = useState(false);

  const { unlimitedCredits } = user;
  const { date, time, isOpenClub, costCredits, userSession, location } = session;
  const { lateCancellationFee, lateCancellationReimburseCredit } = location || {};
  const {
    inCancellationTime,
    isFreeSession,
    scouting,
    shootingMachineReservations,
    creditUsedTypeWasFree,
  } = userSession || {};

  const onCancelClick = () => {
    setDisableBtn(true);
    cancelSession();
  };

  const cancellationText = (() => {
    if (isOpenClub) {
      if (!shootingMachineReservations?.length) {
        return;
      }

      const shootingMachineReservationsPrice = shootingMachineReservations.reduce(
        (totalPrice, shootingMachineReservation) =>
          shootingMachineReservation.charged
            ? totalPrice + shootingMachineReservation.price
            : totalPrice,
        0
      );

      if (shootingMachineReservationsPrice > 0) {
        return (
          `Due to the late cancellation, the $${shootingMachineReservationsPrice} ` +
          'shooting machine(s) rental price will not be refunded.'
        );
      }

      return 'You will not be charged for the shooting machine(s) rental.';
    }

    if (unlimitedCredits) {
      if (inCancellationTime) {
        return null;
      }

      if (scouting) {
        let message =
          'The evaluation credit will not be refunded because of the late cancellation.';

        if (lateCancellationFee > 0) {
          message += ` You will also be charged a $${lateCancellationFee} late cancellation fee.`;
        } else {
          message += ' You will not be charged a late cancellation fee.';
        }

        return message;
      }

      if (lateCancellationFee > 0) {
        return `You will be charged a $${lateCancellationFee} late cancellation fee.`;
      }

      return 'You will not be charged a late cancellation fee.';
    }

    if (inCancellationTime) {
      if (creditUsedTypeWasFree) {
        return scouting ? 'The evaluation credit will be refunded to your account.' : null;
      }

      return scouting
        ? 'The session and evaluation credits will be refunded to your account.'
        : `The ${pluralize('credit', costCredits)} will be refunded to your account.`;
    }

    if (isFreeSession) {
      return `Your free session credit will remain in your account, but we do charge a $${
        import.meta.env.VITE_FREE_SESSION_CANCELED_OUT_OF_TIME_PRICE
      } late cancellation fee.`;
    }

    if (creditUsedTypeWasFree) {
      if (scouting) {
        let message =
          'The evaluation credit will not be refunded because of the late cancellation.';

        if (lateCancellationFee > 0) {
          message += ` You will also be charged a $${lateCancellationFee} late cancellation fee.`;
        }

        return message;
      }

      if (lateCancellationFee > 0) {
        return `You will be charged a $${lateCancellationFee} late cancellation fee.`;
      }

      return null;
    }

    let message = '';

    if (lateCancellationReimburseCredit) {
      message = `The ${pluralize(
        'credit',
        costCredits
      )} will be refunded to your account besides the late cancellation.`;

      if (lateCancellationFee > 0) {
        message += ` However, you will be charged a $${lateCancellationFee} fee.`;
      }

      if (scouting) {
        message += ' Your evaluation credit will not be refunded.';
      }
    } else {
      message = scouting
        ? 'The session and evaluation credits will not be refunded because of the late cancellation.'
        : `The ${pluralize(
            'credit',
            costCredits
          )} will not be refunded because of the late cancellation.`;

      if (lateCancellationFee > 0) {
        message += ` You will also be charged a $${lateCancellationFee} late cancellation fee.`;
      }
    }

    return message;
  })();

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <div className="text-center">
        <h2 className="font-shapiro95_super_wide text-lg sm:text-2xl mb-6">
          Are you sure you want to cancel your booking?
        </h2>
        <div className="mb-8">
          <div className="flex justify-center items-center">
            <span className="w-3 h-3 bg-cc-purple mr-3" />
            <span>{longSessionDate(date)}</span>
            <span className="mx-2">@</span>
            <span>{formatSessionTime(time)}</span>
          </div>
          {cancellationText && <div className="text-sm mt-5 font-bold">{cancellationText}</div>}
        </div>

        <Button
          onClick={onCancelClick}
          disabled={disableBtn}
          className="w-full sm:w-auto sm:mr-2 mb-2 sm:mb-0"
        >
          Yes, cancel it
        </Button>
        <Button
          onClick={closeHandler}
          variant="outline-purple"
          className="w-full sm:w-auto sm:ml-2"
        >
          No, keep it
        </Button>
      </div>
    </Modal>
  );
};

CancelModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  cancelSession: PropTypes.func.isRequired,
  session: PropTypes.shape(),
  user: PropTypes.shape(),
};

export default CancelModal;
