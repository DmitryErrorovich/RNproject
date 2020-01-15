import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Routes } from './routes';
import Icon from 'react-native-vector-icons/AntDesign';

import React from 'react';
import { theme } from '../components/sharedStyles';
import { ProductStack } from './ProductStack';
import { UserStack } from './UserStack';

export const LoggedInStack = createMaterialBottomTabNavigator(
  {
    [Routes.ProductStack]: {
      screen: ProductStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any) => {
          if (tintColor === theme.colors.primary) {
            return <Icon name="home" color="#fff" size={24} />;
          } else {
            return <Icon name="home" color="#666" size={24} />;
          }
        },
      },
    },
    [Routes.UserStack]: {
      screen: UserStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any) => {
          if (tintColor === theme.colors.primary) {
            return <Icon name="user" color="#fff" size={24} />;
          } else {
            return <Icon name="user" color="#666" size={24} />;
          }
        },
      },
    },
  },
  {
    shifting: true,
    initialRouteName: Routes.ProductStack,
    activeColor: theme.colors.primary,
    barStyle: { backgroundColor: '#6d62ee' },
    labeled: false,
  },
);
