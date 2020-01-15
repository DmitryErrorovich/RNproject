import { Field, InjectedFormikProps, withFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  NavigationParams,
  NavigationScreenProp,
} from 'react-navigation';
import CameraRoll from '@react-native-community/cameraroll';
import { i18n } from 'i18n/i18n';
import { Routes } from 'navigation/routes';
import { HeaderComponent } from 'components/headerComponent/headerComponent';
import { USER_SETTINGS_STORE, IUserSettingsStore } from 'store/userSettings';
import { Avatar } from 'react-native-elements';
import { isEmpty } from 'lodash';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import { styles } from './UserScreenStyles';

interface IProps {
  navigation: NavigationScreenProp<{}, NavigationParams>;
  [USER_SETTINGS_STORE]: IUserSettingsStore;
}
interface IState {
  photos: [];
  isPhotosCollapsed: boolean;
  nameFieldCollapse: boolean;
  surnameFieldCollapse: boolean;
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
  enableReinitialize: true,
  mapPropsToValues: () => ({
    [Fields.Name]: '',
    [Fields.Surname]: '',
  }),
  handleSubmit: async (values) => {
    console.log({ values });
  },
});

@inject(USER_SETTINGS_STORE)
@formikEnhance
@observer
export class UserScreen extends Component<
  InjectedFormikProps<IProps, IFormValues>,
  IState
> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      photos: [],
      isPhotosCollapsed: true,
      nameFieldCollapse: true,
      surnameFieldCollapse: true,
    };
  }

  public logout = () => {
    this.props[USER_SETTINGS_STORE].logout();
    this.props.navigation.navigate({ routeName: Routes.Entrypoint });
  };

  public changePhoto = () => {
    this.setState({ photos: [] });
    this.props.navigation.push(Routes.CameraScreen);
  };

  public changeName = () => {
    this.setState({ nameFieldCollapse: false });
  };

  public changeSurname = () => {
    this.setState({ surnameFieldCollapse: false });
  };

  public changeNameText = (text: string) => {
    this.props.setFieldValue(Fields.Name, text);
    this.props[USER_SETTINGS_STORE].setUserName(text);
  };

  public changeSurnameText = (text: string) => {
    this.props.setFieldValue(Fields.Surname, text);
    this.props[USER_SETTINGS_STORE].setUserSurname(text);
  };

  public surnameFieldBlur = () => {
    this.setState({ surnameFieldCollapse: true });
  };

  public nameFieldBlur = () => {
    this.setState({ nameFieldCollapse: true });
  };

  public renderNameFields = () => {
    if (!this.state.nameFieldCollapse) {
      return (
        <Field
          component={TextInput}
          name={Fields.Name}
          label={i18n.t('User.enter_name')}
          autoFocus={true}
          style={styles.editField}
          onChangeText={this.changeNameText}
          mode="flat"
          onBlur={this.nameFieldBlur}
          selectionColor="#6d62ee"
        />
      );
    }
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.nameTitle}>{i18n.t('User.your_name')}</Text>
        <View style={styles.nameContainer}>
          <Text numberOfLines={1} style={styles.name}>
            {this.props[USER_SETTINGS_STORE].user.name}
          </Text>
          <Icon style={{ flex: 1 }} name="edit" color="#3f51b5" size={18} />
        </View>
      </View>
    );
  };

  public renderSurnameFields = () => {
    if (!this.state.surnameFieldCollapse) {
      return (
        <Field
          component={TextInput}
          name={Fields.Surname}
          label={i18n.t('User.enter_surname')}
          autoFocus={true}
          style={styles.editField}
          onChangeText={this.changeSurnameText}
          mode="flat"
          onBlur={this.surnameFieldBlur}
          selectionColor="#6d62ee"
        />
      );
    }
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.nameTitle}>{i18n.t('User.your_surname')}</Text>
        <View style={styles.nameContainer}>
          <Text numberOfLines={1} style={styles.name}>
            {this.props[USER_SETTINGS_STORE].user.surname}
          </Text>
          <Icon style={{ flex: 1 }} name="edit" color="#3f51b5" size={18} />
        </View>
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
          this.setState({ photos: r.edges });
        })
        .catch((err) => {
          throw new Error(`error: ${err}`);
        });
    }
  };

  public setNewImage = (image: string) => () => {
    this.setState({ photos: [] });
    this.props[USER_SETTINGS_STORE].setUserPhoto(image);
  };

  public renderGallery = () =>
    this.state.photos.map((p, i) => (
      <View key={i} onTouchEnd={this.setNewImage(p.node.image.uri)}>
        <Image
          key={i}
          style={styles.galleryImage}
          source={{ uri: p.node.image.uri }}
        />
      </View>
    ));

  public render() {
    return (
      <View style={styles.container}>
        <HeaderComponent
          logout={this.logout}
          hideBackButton
          background
          screenTitle="User"
          navigation={this.props.navigation}
        />

        <View style={styles.alignCenter}>
          <View style={styles.alignCenter}>
            <Avatar
              size={100}
              icon={{ name: 'user', type: 'font-awesome' }}
              rounded
              onPress={this.changePhoto}
              source={{
                uri: `${this.props[USER_SETTINGS_STORE].user.photo}`,
              }}
              showEditButton
            />
            <Button mode="contained" onPress={this.handleAddPhoto}>
              {i18n.t('User.choose_gallery')}
            </Button>
          </View>
          <View>
            <Text style={styles.nameTitle}>{i18n.t('User.your_email')}</Text>
            <Text style={{ fontSize: 16 }}>
              {this.props[USER_SETTINGS_STORE].user.username}
            </Text>
          </View>
          <View
            style={{ justifyContent: 'space-evenly' }}
            onTouchEnd={this.changeName}>
            {this.renderNameFields()}
          </View>
          <View
            style={{ justifyContent: 'space-evenly' }}
            onTouchEnd={this.changeSurname}>
            {this.renderSurnameFields()}
          </View>
          <ScrollView
            contentContainerStyle={styles.scrollView}
          >
            {this.renderGallery()}
          </ScrollView>
        </View>
      </View>
    );
  }
}
