import { createAppContainer, NavigationRouteConfigMap } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { Auth } from "features/auth/Auth";
import { CityPage } from "features/cityWeather/CityWeather";
import { Entrypoint } from "features/entrypoint/Entrypoint";
import { Register } from "features/register/Register";
import { Favorites } from "features/ProductItem/Favorites";
import { Routes } from "./routes";
import { LoggedInStack } from './LoggedInStack';

const stackConfig: StackNavigatorConfig = {
  initialRouteName: Routes.Entrypoint,
  headerMode: "screen"
};

const routeConfigMap: NavigationRouteConfigMap = {
  [Routes.Entrypoint]: Entrypoint,
  [Routes.Auth]: {
    screen: Auth,
    navigationOptions: { header: null }
  },
  [Routes.Register]: {
    screen: Register,
    navigationOptions: { header: null }
  },
  [Routes.LoggedInStack]: {
    screen: LoggedInStack,
    navigationOptions: { header: null }
  },
};

const appNavigator = createStackNavigator(routeConfigMap, stackConfig);

export const RootNavigator = createAppContainer(appNavigator);
