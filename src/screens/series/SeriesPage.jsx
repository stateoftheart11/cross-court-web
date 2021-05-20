import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loading from 'shared/components/Loading';
import ROUTES from 'shared/constants/routes';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import { identify, startedCheckout } from 'shared/utils/klaviyo';
import { initialLoad, setSelectedProduct } from './actionCreators';
import { getAvailableProducts, getPageLoading } from './reducer';

import Plans from './components/Plans';

import NoSessionCredits from './components/NoSessionCredits';
import styled from 'styled-components';
import colors from 'shared/styles/constants';

const StyledPage = styled.div`
  min-height: 100vh;
  background-color: ${colors.brandBlack};
`;

const SeriesPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const availableProducts = useSelector(getAvailableProducts);
  const isLoading = useSelector(getPageLoading);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const { email } = useSelector(getUserProfile);
  const userProfile = useSelector(getUserProfile);

  const selectProductHandler = (product) => {
    dispatch(setSelectedProduct(product));
    if (isAuthenticated) {
      identify(email);
      startedCheckout(product);
    }
    history.push(ROUTES.PAYMENTS);
  };

  const showAnimation = function () {
    return (
      userProfile.credits === 0 &&
      window.localStorage.getItem('previousPage').indexOf('session-') !== -1
    );
  };

  useEffect(() => {
    dispatch(initialLoad());
    if (showAnimation()) {
      document.body.setAttribute('data-page', 'no-session-credits');
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <StyledPage>
      {showAnimation() && <NoSessionCredits />}
      <Plans selectProductHandler={selectProductHandler} availableProducts={availableProducts} />
    </StyledPage>
  );
};

export default SeriesPage;
