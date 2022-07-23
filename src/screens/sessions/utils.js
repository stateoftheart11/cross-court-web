import React from 'react';
import { longSessionDate, hourRange } from 'shared/utils/date';

export const getSessionsMessageContainerText = (
  isSessionComplete,
  isSessionFull,
  isSkillSession,
  isAuthenticated,
  userProfile
) => {
  const {
    activeSubscription,
    totalCredits,
    subscriptionSkillSessionCredits,
    unlimitedCredits,
    unlimitedSkillSessionCredits,
  } = userProfile;

  if (isSessionComplete) {
    return 'SESSION COMPLETE';
  } else if (isSessionFull) {
    return 'SESSION FULL';
  }

  if (!isAuthenticated) {
    return '';
  }

  if (isSkillSession) {
    if (unlimitedSkillSessionCredits) {
      return 'YOU HAVE UNLIMITED SKILL SESSIONS';
    }

    if (subscriptionSkillSessionCredits) {
      return `YOU HAVE ${subscriptionSkillSessionCredits} SKILL SESSION${
        subscriptionSkillSessionCredits === 1 ? '' : 'S'
      } LEFT THIS MONTH`;
    }
  }

  if (unlimitedCredits) {
    return 'YOU HAVE UNLIMITED SESSIONS';
  }

  if (totalCredits) {
    return `YOU HAVE ${totalCredits} SESSION${totalCredits === 1 ? '' : 'S'} ${
      activeSubscription ? 'LEFT THIS MONTH' : 'AVAILABLE'
    }`;
  }

  return '';
};

export const sessionData = (date, sessionInfo) => [
  { title: 'DATE', value: longSessionDate(date) },
  { title: 'TIME', value: hourRange(sessionInfo.time, sessionInfo.durationMinutes) },
  {
    title: 'LOCATION',
    value: [
      `${sessionInfo?.location?.address}`,
      <br key="br" />,
      `${sessionInfo?.location?.city}, ${sessionInfo?.location?.state} ${sessionInfo?.location?.zipcode}`,
    ],
  },
];
