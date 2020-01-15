import { Field, InjectedFormikProps, withFormik } from 'formik';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { NavigationParams, NavigationScreenProp } from 'react-navigation';
import * as Yup from 'yup';

import { CustomButton } from 'components/button/Button';
import { InputField } from 'components/inputField/Input';
import { Routes } from 'navigation/routes';
import { IUserSettingsStore, USER_SETTINGS_STORE } from 'store/userSettings';
import { styles } from './styles';

interface IFormValues {
  email: string;
  password: string;
}

interface IProps {
  navigation: NavigationScreenProp<{}, NavigationParams>;
  [USER_SETTINGS_STORE]: IUserSettingsStore;
}

interface IState {
  isError: boolean;
}

class AuthForm extends Component<
  InjectedFormikProps<IProps, IFormValues>,
  IState
> {
  public dismissSnackbar = () => {
    this.props[USER_SETTINGS_STORE].clean();
  };

  public toRegister = () => {
    const { navigation } = this.props;
    navigation.navigate({ routeName: Routes.Register });
  };

  public renderErrorSnackBar = () => (
    <Snackbar
      style={{ backgroundColor: 'red' }}
      onDismiss={this.dismissSnackbar}
      duration={3000}
      visible={this.props[USER_SETTINGS_STORE].error}>
      {this.props[USER_SETTINGS_STORE].error}
    </Snackbar>
  );

  public render() {
    return (
      <View style={styles.safeArea}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Field
          name="email"
          component={InputField}
          placeholder="Email"
          wrapperStyle={styles.inputWrapper}
        />
        <Field
          name="password"
          component={InputField}
          placeholder="Password"
          secureTextEntry
          wrapperStyle={styles.inputWrapper}
        />
        <View style={styles.buttonContainer}>
          <CustomButton
            text="Sign up"
            onPress={this.toRegister}
            buttonStyle={styles.signUpButton}
            textStyle={styles.signUpButtonText}
          />
          <CustomButton
            text="Sign in"
            textStyle={styles.signInButtonText}
            buttonStyle={styles.signInButton}
            onPress={this.props.handleSubmit}
          />
        </View>
        {this.renderErrorSnackBar()}
      </View>
    );
  }
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email'),
  password: Yup.string()
    .required('Empty password')
    // tslint:disable-next-line:no-magic-numbers
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

const formikEnhance = withFormik<IProps, IFormValues>({
  validationSchema,
  enableReinitialize: true,
  mapPropsToValues: ({
    [USER_SETTINGS_STORE]: {
      user: { email, password },
    },
  }) => ({
    email,
    password,
  }),
  handleSubmit: async ({ email, password }: IFormValues, formikBag) => {
    const response = await formikBag.props[USER_SETTINGS_STORE].signIn(
      email,
      password,
    );
    console.log({ response: formikBag.props[USER_SETTINGS_STORE].user.token });
    if (formikBag.props[USER_SETTINGS_STORE].user.token) {
      formikBag.props.navigation.push(Routes.LoggedInStack);
    }
  },
});

export const Auth = inject(USER_SETTINGS_STORE)(
  formikEnhance(observer(AuthForm)),
);
