import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CloseButton from 'shared/components/CloseButton';
import ROUTES from 'shared/constants/routes';
import { logoutInit } from 'screens/auth/actionCreators';
import { getIsAuthenticated } from 'screens/auth/reducer';
import { getUserProfile } from 'screens/my-account/reducer';
import PrimaryButton from 'shared/components/buttons/PrimaryButton';

const SidebarMenu = ({ menuToggler }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const userProfile = useSelector(getUserProfile);

  const logoutAction = () => dispatch(logoutInit());

  return (
    <nav className="sidebar-nav flex flex-col h-screen justify-center bg-cc-black shadow-md px-12 relative list-none">
      <CloseButton className="close-button" onClick={menuToggler} />

      <div className="flex flex-col text-white text-lg md:text-2xl items-center md:items-end font-shapiro95_super_wide">
        <NavLink className="list-item" exact to={ROUTES.HOME} onClick={menuToggler}>
          HOME
        </NavLink>
        <NavLink className="list-item" exact to={ROUTES.HOWITWORKS} onClick={menuToggler}>
          {isAuthenticated ? 'LEARN MORE' : 'FIRST TIME?'}
        </NavLink>
        <NavLink className="list-item" exact to={ROUTES.LOCATIONS} onClick={menuToggler}>
          SCHEDULE
        </NavLink>
        <NavLink className="list-item" exact to={ROUTES.SERIES} onClick={menuToggler}>
          SERIES
        </NavLink>

        {isAuthenticated && (
          <>
            <NavLink className="list-item" exact to={ROUTES.MYACCOUNT} onClick={menuToggler}>
              MY ACCOUNT
            </NavLink>

            <NavLink className="list-item" type="button" onClick={() => logoutAction()}>
              LOGOUT
            </NavLink>
          </>
        )}

        {userProfile.isSem && (
          <NavLink className="list-item" exact to={ROUTES.SEMHANDBOOK} onClick={menuToggler}>
            SEM HANDBOOK
          </NavLink>
        )}

        {!isAuthenticated && (
          <>
            <Link
              to={ROUTES.LOGIN}
              className="font-shapiro95_super_wide text-4xl mt-32 hover:opacity-60 transition-opacity duration-300"
            >
              LOG IN
            </Link>

            <Link
              to={ROUTES.SIGNUP}
              className="font-shapiro95_super_wide text-4xl mb-16 hover:opacity-60 transition-opacity duration-300"
            >
              SIGN UP
            </Link>
          </>
        )}
      </div>

      <PrimaryButton
        className="w-max self-center md:self-end"
        inverted
        bg="transparent"
        to={ROUTES.LOCATIONS}
        onClick={menuToggler}
      >
        BOOK SESSION
      </PrimaryButton>
    </nav>
  );
};

SidebarMenu.propTypes = {
  menuToggler: PropTypes.func.isRequired,
};

export default SidebarMenu;
