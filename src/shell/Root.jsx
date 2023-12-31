/* eslint-disable import/no-named-as-default-member */

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'shared/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './app/Routes';

const { store, persistor } = configureStore();

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes />
    </PersistGate>
  </Provider>
);

export default Root;
