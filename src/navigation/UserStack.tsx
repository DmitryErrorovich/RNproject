import { createAppContainer, NavigationRouteConfigMap } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Auth } from 'features/auth/Auth';
import { CityPage } from 'features/cityWeather/CityWeather';
import { Entrypoint } from 'features/entrypoint/Entrypoint';
import { Register } from 'features/register/Register';
import { Favorites } from 'features/ProductItem/Favorites';
import { Routes } from './routes';
import { ProductsList } from 'features/ProductsList/ProductsList';
import { ProductInfo } from 'features/ProductInfo/Productinfo';
import { UserScreen } from 'features/UserScreen/UserScreen';
import { CameraScreen } from 'features/CameraScreen/CameraScreen';

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
