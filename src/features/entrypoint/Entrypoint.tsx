import AsyncStorage from "@react-native-community/async-storage";
import { create } from "mobx-persist";
import { inject } from "mobx-react";
import React, { Component } from "react";
import {
  NavigationActions,
  NavigationParams,
  NavigationScreenProp,
  StackActions
} from "react-navigation";

import { Routes } from "navigation/routes";
import { IUserSettingsStore, USER_SETTINGS_STORE } from "store/userSettings";
import { PRODUCT_STORE, IProductsStore } from "store/productsStore";

interface IProps {
  navigation: NavigationScreenProp<{}, NavigationParams>;
  [PRODUCT_STORE]: IProductsStore;
  [USER_SETTINGS_STORE]: IUserSettingsStore;
}

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
});

@inject(PRODUCT_STORE, USER_SETTINGS_STORE)
export class Entrypoint extends Component<IProps> {
  public async componentDidMount() {
    const {
      [PRODUCT_STORE]: productStore,
      [USER_SETTINGS_STORE]: userSettings,
      navigation
    } = this.props;
    await hydrate(PRODUCT_STORE, productStore);
    await hydrate(USER_SETTINGS_STORE, userSettings);
    const destinationRoute = userSettings.user.token
      ? Routes.LoggedInStack
      : Routes.Auth;
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: destinationRoute })]
      })
    );
  }

  public render() {
    return null;
  }
}
