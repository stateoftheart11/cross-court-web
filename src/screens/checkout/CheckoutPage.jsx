import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isNil } from 'ramda';

import ROUTES from 'shared/constants/routes';
import { getSelectedProduct } from 'screens/series/reducer';
import { getSelectedCard } from 'screens/payments/reducer';
import BackButton from 'shared/components/BackButton';
import { createPurchase, createSubscription } from './actionCreators';
import ProductDetails from './components/PurchaseDetails';

const RECURRING = 'recurring';

const CheckoutPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .button-container {
    width: 100%;
  }

  @media (max-width: 991px) {
    h1 {
      font-size: 1.5rem;
      margin-top: 2rem;
    }
  }
`;

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector(getSelectedProduct);
  const paymentDetails = useSelector(getSelectedCard);

  if (isNil(productDetails) || isNil(paymentDetails)) {
    return <Redirect to={ROUTES.LOCATIONS} />;
  }

  const isSubscription = productDetails.productType === RECURRING;
  const createPurchaseHandler = () =>
    dispatch(isSubscription ? createSubscription() : createPurchase());

  return (
    <CheckoutPageContainer className="checkout">
      <div className="button-container">
        <BackButton />
      </div>
      <h1>PURCHASE DETAILS</h1>
      <ProductDetails
        productDetails={productDetails}
        paymentDetails={paymentDetails}
        createPurchaseHandler={createPurchaseHandler}
      />
    </CheckoutPageContainer>
  );
};

export default CheckoutPage;
