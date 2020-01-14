import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Routes } from './routes';
import Icon from 'react-native-vector-icons/AntDesign';

import React from 'react';
import { theme } from '../components/sharedStyles';
import { ProductStack } from './ProductStack';
import { UserScreen } from 'features/UserScreen/UserScreen';
import { CameraScreen } from 'features/CameraScreen/CameraScreen';
import { UserStack } from './UserStack';

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
