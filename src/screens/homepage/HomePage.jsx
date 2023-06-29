import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';

import ROUTES from 'shared/constants/routes';
import { openContactForm, openContactFormForUser } from 'shared/utils/contactForm';
import { getUserProfile, getPageLoading } from 'screens/my-account/reducer';
import { getIsAuthenticated } from 'screens/auth/reducer';
import SessionSurveyModal from 'screens/surveys/sessions/components/SessionSurveyModal';
import PageLayout from 'shared/components/layout/PageLayout';
import UnlockYourPotential from 'screens/homepage/sections/UnlockYourPotential';
import CrosscourtGoal from 'screens/homepage/sections/CrosscourtGoal';
import PlatformForProgress from 'screens/homepage/sections/PlatformForProgress';
import Testimonials from 'screens/homepage/sections/Testimonials';
import TrustTheProgress from 'screens/homepage/sections/TrustTheProgress';
import Faq from 'screens/homepage/sections/Faq';
import ScheduleTourButton from 'screens/homepage/components/ScheduleTourButton';

const HomePage = () => {
  const { search } = useLocation();
  const { openForm, openSurvey } = queryString.parse(search);

  const userInfo = useSelector(getUserProfile);
  const loading = useSelector(getPageLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const openFormParam = openForm === 'true';
  const openSurveyParam = openSurvey === 'true';

  const [showSurveyModal, setShowSurveyModal] = useState(false);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (openFormParam) {
          isAuthenticated ? openContactFormForUser(userInfo) : openContactForm();
        }
      }, 1500);
    }
  }, [search, userInfo, isAuthenticated, loading, openFormParam]);

  useEffect(() => {
    if ((isAuthenticated && userInfo?.lastCheckedInUserSession) || openSurveyParam) {
      if (!userInfo.lastCheckedInUserSession.surveyAnswered) {
        setShowSurveyModal(true);
      } else {
        setShowSurveyModal(false);
      }
    }
  }, [isAuthenticated, userInfo, openSurveyParam]);

  if (!isAuthenticated && openSurveyParam) {
    return <Redirect to={ROUTES.LOGIN} />;
  }

  return (
    <>
      <PageLayout className="overflow-hidden">
        <UnlockYourPotential />
        <CrosscourtGoal />
        <PlatformForProgress />
        <Testimonials />
        <TrustTheProgress />
        <Faq />
        <ScheduleTourButton />
      </PageLayout>
      <SessionSurveyModal
        showSurveyModal={showSurveyModal}
        setShowSurveyModal={setShowSurveyModal}
        userSessionInfo={userInfo.lastCheckedInUserSession}
      />
    </>
  );
};

export default HomePage;
