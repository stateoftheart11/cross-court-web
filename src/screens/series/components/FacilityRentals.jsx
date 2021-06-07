import React from 'react';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import styled from 'styled-components';

const StyledP = styled.p`
  color: white;
  font-family: shapiro95_super_wide;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: white;
  font-size: 20px;
  line-height: 20px;
  @media (min-width: 992px) {
    font-size: 48px;
    line-height: 48px;
  }
`;

const FacilityRentals = () => {
  return (
    <div className="flex flex-col p-4 md:p-12 mt-40 md:mt-0">
      <p className="font-shapiro95_super_wide text-white text-xl md:text-5xl">FACILITY RENTALS</p>
      <StyledP>& PRIVATE GROUPS</StyledP>
      <PrimaryButton
        inverted
        bg="transparent"
        className="my-20 w-min"
        onClick={() => document.querySelector('.eapps-form-floating-button').click()}
      >
        EMAIL US
      </PrimaryButton>
    </div>
  );
};

export default FacilityRentals;
