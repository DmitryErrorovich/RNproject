import { FieldProps } from 'formik';
import React, { RefObject } from 'react';
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProperties,
  TextStyle,
  View,
  ViewStyle
} from 'react-native';

import { styles } from './styles';

export interface IProps {
  inputRef?: RefObject<TextInput>;
  wrapperStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  errorTextStyle: StyleProp<TextStyle>;
}

export const InputField = ({
  field,
  form,
  inputRef,
  wrapperStyle,
  inputStyle,
  errorTextStyle,
  ...props
}: FieldProps<{ [k: string]: string }> & TextInputProperties & IProps) => {
  const { value, name } = field;
  const { handleBlur, handleChange, errors, touched } = form;
  const error = touched[name] ? errors[name] : undefined;
  return (
    <View style={[styles.defaultWrapper, wrapperStyle]}>
      <TextInput
        value={value}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        ref={inputRef}
        style={[styles.defaultInput, inputStyle]}
        {...props}
      />
      {// tslint:disable-next-line:jsx-no-multiline-js
      error ? (
        <Text style={[styles.errorText, errorTextStyle]}>{error}</Text>
      ) : null}
    </View>
  );
};
