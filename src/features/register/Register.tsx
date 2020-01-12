import { Field, InjectedFormikProps, withFormik } from "formik";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { Alert, Text, View } from "react-native";
import { NavigationParams, NavigationScreenProp } from "react-navigation";
import * as Yup from "yup";

import { CustomButton } from "components/button/Button";
import { InputField } from "components/inputField/Input";
import { Routes } from "navigation/routes";
import { IUserSettingsStore, USER_SETTINGS_STORE } from "store/userSettings";
import { styles } from "./styles";

interface IFormValues {
  email: string;
  password: string;
}

interface IProps {
  navigation: NavigationScreenProp<{}, NavigationParams>;
  [USER_SETTINGS_STORE]: IUserSettingsStore;
}

class RegisterForm extends Component<InjectedFormikProps<IProps, IFormValues>> {
  public componentDidMount() {
    this.props[USER_SETTINGS_STORE].clean();
  }
  public goBack = () => {
    const { navigation } = this.props;
    navigation.navigate({ routeName: Routes.Auth });
  };

  public render() {
    return (
      <View style={styles.safeArea}>
        <Text style={styles.welcomeText}>Sign up</Text>
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
        <Field
          name="confirmPassword"
          component={InputField}
          placeholder="Confirm password"
          secureTextEntry
          wrapperStyle={styles.inputWrapper}
        />
        <Text style={styles.forgotPassword}>Forgot password?</Text>
        <View style={styles.buttonContainer}>
          <CustomButton
            text="Back"
            onPress={this.goBack}
            buttonStyle={styles.signUpButton}
            textStyle={styles.signUpButtonText}
          />
          <CustomButton
            text="Continue"
            onPress={this.props.handleSubmit}
            buttonStyle={styles.signUpButton}
            textStyle={styles.signUpButtonText}
          />
        </View>
      </View>
    );
  }
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email"),
  password: Yup.string()
    .required("Empty password")
    // tslint:disable-next-line:no-magic-numbers
    .min(6, "Password is too short - should be 6 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  confirmPassword: Yup.mixed()
    .test("match", "Passwords do not match", function(password) {
      return password === this.parent.password;
    })
    .required("Password confirm is required")
});

const formikEnhance = withFormik<IProps, IFormValues>({
  validationSchema,
  enableReinitialize: true,
  mapPropsToValues: ({
    [USER_SETTINGS_STORE]: {
      user: { email, password }
    }
  }) => ({
    email,
    password
  }),
  handleSubmit: async ({ email, password }: IFormValues, formikBag) => {
    const isRegistered = await formikBag.props[USER_SETTINGS_STORE].signUp(
      email,
      password
    );
    isRegistered
      ? formikBag.props.navigation.navigate({ routeName: Routes.Auth })
      : Alert.alert(formikBag.props[USER_SETTINGS_STORE].error);
  }
});

export const Register = inject(USER_SETTINGS_STORE)(
  formikEnhance(observer(RegisterForm))
);
