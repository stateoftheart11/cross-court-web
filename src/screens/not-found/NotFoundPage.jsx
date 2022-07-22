import React from 'react';
import ROUTES from 'shared/constants/routes';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';
import BallHit from 'shared/images/ball-hit.gif';

const NotFoundPage = () => {
  return (
    <div className="mt-20 mb-64 flex flex-col items-center justify-center">
      <p className="font-shapiro95_super_wide text-9xl text-transparent text-stroke-cc-black text-stroke-width-3">
        404
      </p>
      <img src={BallHit} alt="404" className="rounded my-6 w-2/3 md:w-auto" />
      <p className="font-shapiro95_super_wide text-6xl text-transparent text-stroke-cc-purple text-stroke-width-2 text-center uppercase">
        Oops!
      </p>
      <p className="font-shapiro95_super_wide text-lg md:text-3xl text-center uppercase text-cc-purple">
        It seems that you are lost
      </p>
      <PrimaryButton to={ROUTES.HOME} w="100%" className="mt-10">
        Back home
      </PrimaryButton>
    </div>
  );
};

export default NotFoundPage;
