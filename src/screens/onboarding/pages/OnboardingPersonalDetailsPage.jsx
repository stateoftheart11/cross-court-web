import React from 'react';

import OnboardingLayout from 'shared/components/layout/OnboardingLayout';
import PersonalDetailsForm from 'screens/onboarding/components/PersonalDetailsForm';

const OnboardingPersonalDetailsPage = () => (
  <OnboardingLayout disableLink>
    <PersonalDetailsForm />
  </OnboardingLayout>
);

export default OnboardingPersonalDetailsPage;
