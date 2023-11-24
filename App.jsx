import React from 'react';
import AppNavigation from './navigation/appNavigation';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

export default App;
