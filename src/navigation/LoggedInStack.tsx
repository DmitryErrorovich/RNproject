import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Routes } from './routes';
import Icon from 'react-native-vector-icons/AntDesign';

import React from 'react';
import { theme } from '../components/sharedStyles';
import { ProductStack } from './ProductStack';
import { UserScreen } from 'features/UserScreen/UserScreen';

// const bottomTabNavigatorLiteElements = {
//   productGreen: React.createElement(Icon, name = 'home', size={30}, color='#fff'),
//   productGray: <Icon name='home' size={20} color='#000' />,
// };

export const LoggedInStack = createMaterialBottomTabNavigator(
  {
    [Routes.ProductStack]: {
      screen: ProductStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any) => {
          if (tintColor === theme.colors.primary) {
            return <Icon name="home" color="#fff" size={24} />;
          } else {
            return <Icon name="home" color="#eee" size={24} />;
          }
        },
      },
    },
    [Routes.UserScreen]: {
      screen: UserScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any) => {
          if (tintColor === theme.colors.primary) {
            return <Icon name="user" color="#fff" size={24} />;
          } else {
            return <Icon name="user" color="#eee" size={24} />;
          }
        },
      },
    },
  },
  {
    initialRouteName: Routes.ProductStack,
    activeColor: theme.colors.primary,
    barStyle: { backgroundColor: '#6d62ee' },
    labeled: false,
  },
);
