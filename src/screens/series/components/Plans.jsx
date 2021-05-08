import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import currency from 'currency.js';

import PurpleBg from '../images/circle-purple-bg.png';

import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const PlansContainer = styled.div`
  .plans-container {
    margin: 0 6rem;
    padding-top: 2rem;
    display: flex;
    flex-wrap: wrap;
  }

  @media (max-width: 991px) {
    .plans-container {
      margin: 0;
      flex-direction: column;
      padding: 0;
    }
  }
`;

const PlanContainer = styled.div`
  position: relative;
  margin: 2rem auto 0;
  height: 30vw;
  width: 30vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.75rem;
  justify-content: flex-end;

  .sticker {
    position: absolute;
    background-image: url(${PurpleBg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 202px;
    width: 202px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 3rem;
    right: 2rem;
    color: #fff;
    flex-direction: column;

    .price {
      font-weight: bold;
      font-size: 4rem;
      line-height: 5rem;
      font-family: 'Space Mono';
    }

    .text {
      font-weight: 500;
      font-size: 1.5rem;
      letter-spacing: 0.04em;
    }
  }

  .title {
    display: flex;
    font-size: 3.5rem;
    line-height: 4rem;
    letter-spacing: 0.04em;
    color: #fff;
    text-transform: uppercase;
    align-self: flex-start;
    margin-bottom: 1rem;
    flex-direction: column;

    .first-word {
      padding: 0 0.75rem;
    }

    .second-word {
      background-color: #000;
      font-weight: bold;
      padding: 0 0.75rem;
    }
  }

  .button-container {
    width: 100%;
    hr {
      display: none;
    }
    button {
      width: 100%;
    }
  }
`;

const Plans = ({ selectProductHandler, availableProducts }) => {
  const formatPrice = (price) =>
    currency(price, {
      symbol: '$',
      precision: 0,
    });

  const products = availableProducts.filter((product) => product.name !== 'Free Session');
  return (
    <PlansContainer className="series-plans-container">
      <section className="title-block">
        <p className="heading-sprite"></p>
      </section>
      <div className="plans-container">
        {products.map((product) => {
          const sessionLabel = `${product.credits} ${product.credits > 1 ? 'SESSIONS' : 'SESSION'}`;
          const sessionPrice = `$${formatPrice(product.price)}`;
          const sessionPPS = `$${formatPrice(product.price / product.credits)}/SESSION`;
          const buyLabel = 'BUY';
          const mostPopular = sessionLabel === '5 SESSIONS';
          const bestValue = sessionLabel === '10 SESSIONS';

          return (
            <PlanContainer key={product.id} className="plan-container" product={product}>
              <div
                className="click-block"
                onClick={(e) => {
                  e.preventDefault();
                  selectProductHandler(product);
                }}
              >
                {mostPopular ? (
                  <div className="rotate-wrapper">
                    <span className="most-popular ">MOST POPULAR</span>
                  </div>
                ) : (
                  ''
                )}
                {bestValue ? (
                  <div className="rotate-wrapper">
                    <span className="best-value">BEST VALUE</span>
                  </div>
                ) : (
                  ''
                )}
                <div className="session-info">
                  <div className="session-label">{sessionLabel}</div>
                  <div className="session-price">{sessionPrice}</div>
                  <div className="session-pps">{sessionPPS}</div>
                </div>
                <div className="button-container">
                  <PrimaryButton inverted w="100%">
                    {buyLabel}
                  </PrimaryButton>
                </div>
              </div>
            </PlanContainer>
          );
        })}
      </div>
    </PlansContainer>
  );
};

Plans.propTypes = {
  selectProductHandler: PropTypes.func.isRequired,
  availableProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Plans;
