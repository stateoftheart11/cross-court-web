import React from 'react';

const NoSessionCredits = () => (
  <div className="no-session-credits relative text-white h-[200vh] bg-black">
    <div className="animate-fade fixed inset-x-0 top-1/2 transform -translate-y-1/2 text-center text-2xl md:text-4xl lg:text-5xl xl:text-6xl leading-none px-5">
      <div className="title">
        <div className="block font-shapiro95_super_wide tracking-wider md:pl-2 mb-1">
          NO SESSION CREDITS LEFT
        </div>
        <div className="block font-shapiro97_air_extd">SEE MEMBERSHIP BELOW</div>
      </div>
    </div>
    <div className="animate-slide-top fixed bottom-10 inset-x-0 text-center">
      <div className="scroll">
        <div className="w-1 h-20 sm:h-24 bg-white inline-block mb-4" />
        <div className="font-shapiro95_super_wide text-xs md:text-lg">SCROLL FOR PRICING</div>
      </div>
    </div>
  </div>
);

export default NoSessionCredits;
