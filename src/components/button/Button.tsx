import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  ImageURISource,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native';

import { styles } from './styles';
import { Button } from 'react-native-paper';

export interface IProps {
  text?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  added?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  icon?: Icon;
  imageStyle?: StyleProp<ImageStyle>;
  addedImageStyle?: StyleProp<ImageStyle>;
}

export const CustomButton = ({
  onPress,
  text,
  buttonStyle,
  textStyle,
  mode,
  added,
  imageStyle,
}: IProps) => (
  <Button mode={mode} onPress={onPress} style={[styles.button, buttonStyle]}>
    <Text style={[styles.buttonText, textStyle]}>{text}</Text>
  </Button>
);
