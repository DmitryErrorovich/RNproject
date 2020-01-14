import { Field, InjectedFormikProps, withFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Alert, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-swipeable';
import {
  NavigationParams,
  NavigationScreenProp,
  FlatList,
  SafeAreaView,
} from 'react-navigation';
import * as Yup from 'yup';

import { CustomButton } from 'components/button/Button';
import { InputField } from 'components/inputField/Input';
import { i18n } from 'i18n/i18n';
import { Routes } from 'navigation/routes';
import { PRODUCT_STORE, IProductsStore } from 'store/productsStore';
import { styles } from './styles';
import { HeaderComponent } from 'components/headerComponent/headerComponent';
import { theme } from 'components/sharedStyles';
import { WeatherIcon } from 'components/weatherIcon/WeatherIcon';
import { ProductItem } from 'features/ProductItem/ProductItem';
import { IProduct } from '../../models/Products';
import NetInfo from '@react-native-community/netinfo';
import { USER_SETTINGS_STORE, IUserSettingsStore } from 'store/userSettings';
import { Avatar, Divider } from 'react-native-elements';

interface IProps {
  navigation: NavigationScreenProp<{}, NavigationParams>;
  [USER_SETTINGS_STORE]: IUserSettingsStore;
}

export enum Fields {
  CommentField = 'COMMENT_FIELD',
  RateField = 'RATE_FIELD',
}

export interface IFormValues {
  [Fields.CommentField]: string;
  [Fields.RateField]: number;
}

const formikEnhance = withFormik<IProps, IFormValues>({
  // validationSchema,
  enableReinitialize: true,
  mapPropsToValues: () => ({
    [Fields.CommentField]: '',
    [Fields.RateField]: 0,
  }),
  handleSubmit: async (values, formikBag) => {
    console.log({ values });
  },
});

@inject(USER_SETTINGS_STORE)
@formikEnhance
@observer
export class UserScreen extends Component<
  InjectedFormikProps<IProps, IFormValues>
> {
  public changePhoto = () => {
    console.log('asd');
  };

  public render() {
    return (
      <View style={{ backgroundColor: '#465881', flex: 1 }}>
        <HeaderComponent
          logout={this.logout}
          hideBackButton
          style={{ marginTop: -100 }}
          background
          screenTitle="User"
          navigation={this.props.navigation}
        />
        <View style={{ alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>
              Your photo:
            </Text>
            <Avatar
              size="large"
              icon={{ name: 'user', type: 'font-awesome' }}
              rounded
              onPress={this.changePhoto}
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
              showEditButton
            />
          </View>
          <View>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>
              Your name:
            </Text>
            <Text style={{ color: '#fff', fontSize: 16 }}>
              {this.props[USER_SETTINGS_STORE].user.username}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
