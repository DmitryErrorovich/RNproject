import { createAppContainer, NavigationRouteConfigMap } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Routes } from './routes';
import { UserScreen } from 'features/UserScreen/UserScreen';

const stackConfig: StackNavigatorConfig = {
  initialRouteName: Routes.UserScreen,
  headerMode: 'screen',
};

const routeConfigMap: NavigationRouteConfigMap = {
  [Routes.UserScreen]: {
    screen: UserScreen,
    navigationOptions: { header: null },
  },
};

const appNavigator = createStackNavigator(routeConfigMap, stackConfig);

export const UserStack = createAppContainer(appNavigator);
