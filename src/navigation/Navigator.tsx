import { createAppContainer, NavigationRouteConfigMap } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Auth } from 'features/auth/Auth';
import { Entrypoint } from 'features/entrypoint/Entrypoint';
import { Register } from 'features/register/Register';
import { Routes } from './routes';
import { LoggedInStack } from './LoggedInStack';
import { CameraScreen } from 'features/CameraScreen/CameraScreen';

const stackConfig: StackNavigatorConfig = {
  initialRouteName: Routes.Entrypoint,
  headerMode: 'screen',
};

const routeConfigMap: NavigationRouteConfigMap = {
  [Routes.Entrypoint]: {
    screen: Entrypoint,
    navigationOptions: { header: null },
  },
  [Routes.Auth]: {
    screen: Auth,
    navigationOptions: { header: null },
  },
  [Routes.Register]: {
    screen: Register,
    navigationOptions: { header: null },
  },
  [Routes.CameraScreen]: {
    screen: CameraScreen,
    navigationOptions: { header: null },
  },
  [Routes.LoggedInStack]: {
    screen: LoggedInStack,
    navigationOptions: { header: null },
  },
};

const appNavigator = createStackNavigator(routeConfigMap, stackConfig);

export const RootNavigator = createAppContainer(appNavigator);
