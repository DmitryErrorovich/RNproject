import { createAppContainer, NavigationRouteConfigMap } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Routes } from './routes';
import { ProductsList } from 'features/ProductsList/ProductsList';
import { ProductInfo } from 'features/ProductInfo/Productinfo';

const stackConfig: StackNavigatorConfig = {
  initialRouteName: Routes.ProductsList,
  headerMode: 'screen',
};

const routeConfigMap: NavigationRouteConfigMap = {
  [Routes.ProductsList]: {
    screen: ProductsList,
    navigationOptions: { header: null },
  },
  [Routes.ProductInfo]: {
    screen: ProductInfo,
    navigationOptions: { header: null },
  },
};

const appNavigator = createStackNavigator(routeConfigMap, stackConfig);

export const ProductStack = createAppContainer(appNavigator);
