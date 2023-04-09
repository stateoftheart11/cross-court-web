import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ROUTES from 'shared/constants/routes';
import Loading from 'shared/components/Loading';
import PageLayout from 'shared/components/layout/PageLayout';
import SectionLayout from 'shared/components/layout/SectionLayout';
import { add, isPast, startOfWeek, getUTCDate } from 'shared/utils/date';
import { isUserInFirstSessionFlow, isUserInFirstFreeSessionFlow } from 'shared/utils/user';

import { getUserProfile } from 'screens/my-account/reducer';
import LocationPicker from './components/LocationPicker';
import WeekSelector from './components/WeekSelector';
import SessionsList from './components/SessionsList';
import FreeSessionCreditAdded from './components/FreeSessionCreditAdded';
import {
  getPageLoading,
  getAvailableLocations,
  getAvailableSessions,
  getSelectedLocation,
  getSessionsLoading,
  getSelectedDate,
} from './reducer';
import {
  getLocations,
  getSessionsByLocation,
  getSessionsByDate,
  setSelectedDate,
} from './actionCreators';

const LocationsPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isPageLoading = useSelector(getPageLoading);
  const isSessionsLoading = useSelector(getSessionsLoading);
  const availableLocations = useSelector(getAvailableLocations);
  const availableSessions = useSelector(getAvailableSessions);
  const selectedLocation = useSelector(getSelectedLocation);
  const selectedDate = useSelector(getSelectedDate);
  const userInfo = useSelector(getUserProfile);
  const isFirstSessionFlow = isUserInFirstSessionFlow(userInfo);
  const isFirstFreeSessionFlow = isUserInFirstFreeSessionFlow(userInfo);

  const [showingFreeSessionCreditAdded, setShowingFreeSessionCreditAdded] = useState(true);

  const getSessionsByDateHandler = (date) => dispatch(getSessionsByDate(date));
  const setSelectedDateHandler = (date) => dispatch(setSelectedDate(date));
  const setLocationHandler = useCallback(
    (locationId) => dispatch(getSessionsByLocation(locationId)),
    [dispatch]
  );

  const increaseCurrentWeekHandler = () => {
    const nextWeekDate = startOfWeek(add(selectedDate, 1, 'weeks'));
    setSelectedDateHandler(nextWeekDate);
    getSessionsByDateHandler(nextWeekDate);
  };

  const decreaseCurrentWeekHandler = () => {
    const pastWeekDate = add(selectedDate, -1, 'weeks');

    if (isPast(pastWeekDate)) {
      setSelectedDateHandler(getUTCDate());
      getSessionsByDateHandler(getUTCDate());
    } else {
      setSelectedDateHandler(pastWeekDate);
      getSessionsByDateHandler(pastWeekDate);
    }
  };

  useEffect(() => {
    if (availableLocations.length > 0 && !selectedLocation) {
      setLocationHandler(availableLocations[0].id);
    }
  }, [availableLocations, selectedLocation, setLocationHandler]);

  useEffect(() => {
    setShowingFreeSessionCreditAdded(isFirstFreeSessionFlow);
  }, [isFirstFreeSessionFlow]);

  useEffect(() => {
    if (isFirstSessionFlow) {
      history.push(ROUTES.LOCATIONSFIRST);
    }
  }, [history, isFirstSessionFlow]);

  useEffect(() => {
    dispatch(getLocations());

    if (selectedLocation) {
      setLocationHandler(selectedLocation);
    }
    // eslint-disable-next-line
  }, [dispatch]);

  return isPageLoading ? (
    <Loading />
  ) : (
    <PageLayout>
      {isFirstFreeSessionFlow && (
        <FreeSessionCreditAdded onFinishAnimation={() => setShowingFreeSessionCreditAdded(false)} />
      )}
      <SectionLayout>
        <div className="sm:flex sm:justify-between sm:items-center mb-4">
          <h1 className="font-shapiro95_super_wide text-3xl md:text-4xl mb-3 sm:mb-0">Schedule</h1>
          <LocationPicker
            availableLocations={availableLocations}
            setLocationHandler={setLocationHandler}
            selectedLocationId={selectedLocation}
          />
        </div>
        <WeekSelector
          availableSessions={availableSessions}
          selectedDate={selectedDate}
          increaseHandler={increaseCurrentWeekHandler}
          decreaseHandler={decreaseCurrentWeekHandler}
          setSelectedDateHandler={setSelectedDateHandler}
          className="mb-10"
        />
        {isSessionsLoading ? (
          <Loading />
        ) : (
          <SessionsList
            availableSessions={availableSessions}
            selectedDate={selectedDate}
            showingFreeSessionCreditAdded={showingFreeSessionCreditAdded}
          />
        )}
      </SectionLayout>
    </PageLayout>
  );
};

export default LocationsPage;
