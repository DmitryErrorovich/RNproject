import { Field, InjectedFormikProps, withFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Alert, Text, View, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-swipeable';
import {
  NavigationParams,
  NavigationScreenProp,
  FlatList,
  SafeAreaView,
} from 'react-navigation';
import * as Yup from 'yup';
import CameraRoll from '@react-native-community/cameraroll';

import { CustomButton } from 'components/button/Button';
import { InputField } from 'components/inputField/Input';
import { i18n } from 'i18n/i18n';
import { Routes } from 'navigation/routes';
import { PRODUCT_STORE, IProductsStore } from 'store/productsStore';
import { styles } from './UserScreenStyles';
import { HeaderComponent } from 'components/headerComponent/headerComponent';
import { theme } from 'components/sharedStyles';
import { WeatherIcon } from 'components/weatherIcon/WeatherIcon';
import { ProductItem } from 'features/ProductItem/ProductItem';
import { IProduct } from '../../models/Products';
import NetInfo from '@react-native-community/netinfo';
import { USER_SETTINGS_STORE, IUserSettingsStore } from 'store/userSettings';
import { Avatar, Divider } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import { CameraPermission } from 'models/defaults';
import { isEmpty } from 'lodash';
import { Button, TextInput } from 'react-native-paper';

interface IProps {
  navigation: NavigationScreenProp<{}, NavigationParams>;
  [USER_SETTINGS_STORE]: IUserSettingsStore;
}

export enum Fields {
  Name = 'NAME_FIELD',
  Surname = 'SURNAME_FIELD',
}

export interface IFormValues {
  [Fields.Name]: string;
  [Fields.Surname]: string;
}

const formikEnhance = withFormik<IProps, IFormValues>({
  // validationSchema,
  enableReinitialize: true,
  mapPropsToValues: () => ({
    [Fields.Name]: '',
    [Fields.Surname]: 0,
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
  constructor(props: IProps) {
    super(props);
    this.state = {
      photos: [],
      isPhotosCollapsed: true,
      nameFieldCollapse: true,
    };
  }

  public changePhoto = () => {
    this.setState({ photos: [] });
    this.props.navigation.push(Routes.CameraScreen);
  };

  public changeName = () => {
    this.setState({ nameFieldCollapse: false });
  };

  public renderNameFields = () => {
    if (!this.state.nameFieldCollapse) {
      return (
        <Field
          component={TextInput}
          name={Fields.Name}
          style={{ width: 100 }}
          onChangeText={this.changeNameText}
          mode="flat"
          selectionColor="#6d62ee"
        />
      );
    }
    return (
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Your name:</Text>
        <Text style={{ fontSize: 16 }}>
          {this.props[USER_SETTINGS_STORE].user.name}
        </Text>
      </View>
    );
  };

  public handleAddPhoto = () => {
    if (isEmpty(this.state.photos)) {
      CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
        .then((r) => {
          console.log({ r });
          this.setState({ photos: r.edges });
        })
        .catch((err) => {
          //Error Loading Images
        });
    }
  };

  public setNewImage = (image: string) => () => {
    this.setState({ photos: [] });
    this.props[USER_SETTINGS_STORE].setUserPhoto(image);
  };

  public render() {
    console.log({ photos: this.state.photos });
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
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
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
              Your photo:
            </Text>
            <Avatar
              size="xlarge"
              icon={{ name: 'user', type: 'font-awesome' }}
              rounded
              onPress={this.changePhoto}
              source={{
                uri: `${this.props[USER_SETTINGS_STORE].user.photo}`,
              }}
              showEditButton
            />
            <Button mode="contained" onPress={this.handleAddPhoto}>
              Choose from Gallery
            </Button>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
              Your email:
            </Text>
            <Text style={{ fontSize: 16 }}>
              {this.props[USER_SETTINGS_STORE].user.username}
            </Text>
          </View>
          <View onTouchEnd={this.changeName}>{this.renderNameFields()}</View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
              Your surname:
            </Text>
            <Text style={{ fontSize: 16 }}>
              {this.props[USER_SETTINGS_STORE].user.surname}
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
            {this.state.photos.map((p, i) => {
              return (
                <View onTouchEnd={this.setNewImage(p.node.image.uri)}>
                  <Image
                    key={i}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 12,
                    }}
                    source={{ uri: p.node.image.uri }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}
