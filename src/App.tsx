import { Provider } from 'mobx-react';
import React, { Component } from 'react';

import { RootNavigator } from './navigation/Navigator';
import { stores } from './store/stores';

export class App extends Component {
  public render() {
    return (
      <Provider {...stores}>
        <RootNavigator />
      </Provider>
    );
  }
}
