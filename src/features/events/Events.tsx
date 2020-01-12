import { Field, InjectedFormikProps, withFormik } from 'formik';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {
  NavigationActions,
  NavigationParams,
  NavigationScreenProp,
  StackActions
} from 'react-navigation';
import * as Yup from 'yup';

import { CustomButton } from 'components/button/Button';
import { InputField } from 'components/inputField/Input';
import { CustomModal } from 'components/modal/Modal';
import { Routes } from 'navigation/routes';
import {
  EVENTS_SETTINGS_STORE,
  IEventsSettingsStore
} from 'store/eventsSettings';
import { IUserSettingsStore, USER_SETTINGS_STORE } from 'store/userSettings';
import { styles } from './styles';

interface IFormValues {
  eventTitle: string;
  eventDescription: string;
}

interface IProps {
  navigation: NavigationScreenProp<{}, NavigationParams>;
  [USER_SETTINGS_STORE]: IUserSettingsStore;
  [EVENTS_SETTINGS_STORE]: IEventsSettingsStore;
}

@inject(USER_SETTINGS_STORE)
@observer
export class Events extends Component<
  InjectedFormikProps<IProps, IFormValues>
> {
  @observable public isOpenModal: boolean = false;
  public handleExit = () => {
    const { [USER_SETTINGS_STORE]: userSettings, navigation } = this.props;
    userSettings.clean();
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: Routes.Auth })]
      })
    );
  }

  public handleModal = () => {
    this.isOpenModal = true;
  }

  public modalContent = () => (
    <View style={styles.safeArea}>
      <Text style={styles.welcomeText}>Hello</Text>
      <Field
        name="eventTitle"
        component={InputField}
        placeholder="Event title"
        wrapperStyle={styles.inputWrapper}
      />
      <Field
        name="eventDescription"
        component={InputField}
        placeholder="Event description"
        wrapperStyle={styles.inputWrapper}
      />
      <View style={styles.buttonModalContainer}>
        <CustomButton
          text="Cancel"
          textStyle={styles.cancelButtonText}
          buttonStyle={styles.cancelButton}
          onPress={() => {}}
        />
        <CustomButton
          text="Create"
          textStyle={styles.createButtonText}
          buttonStyle={styles.createButton}
          onPress={this.props.handleSubmit}
        />
      </View>
    </View>
  )

  public render() {
    return (
      <View style={styles.container}>
        <CustomButton
          buttonStyle={styles.buttonStyle}
          textStyle={styles.buttonTextStyle}
          text="LOGOUT"
          onPress={this.handleExit}
        />
        <View>
          <Text style={styles.headerStyle}>Events page</Text>
          <CustomButton
            text="create event"
            onPress={this.handleModal}
            buttonStyle={styles.createButton}
          />
          <CustomModal isVisible={this.isOpenModal}>
            {this.modalContent()}
          </CustomModal>
        </View>
      </View>
    );
  }
}

const validationSchema = Yup.object().shape({
  eventTitle: Yup.string().required('Title is required')
});

const formikEnhance = withFormik<IProps, IFormValues>({
  validationSchema,
  enableReinitialize: true,
  mapPropsToValues: ({
    [EVENTS_SETTINGS_STORE]: {
      event: { eventTitle, eventDescription }
    }
  }) => ({
    eventTitle,
    eventDescription
  }),
  handleSubmit: async (
    { eventTitle, eventDescription }: IFormValues,
    formikBag
  ) => {}
});

export const Auth = inject(EVENTS_SETTINGS_STORE)(
  formikEnhance(observer(Events))
);
