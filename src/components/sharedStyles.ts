import { DefaultTheme, Theme } from 'react-native-paper';

export const applicaionBackgroundColor = "#fff"

export const listSeparator = {
  backgroundColor: '#BDCDD6',
  height: 1,
  marginLeft: 20,
  marginRight: 20
}

export const theme: Theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#28bd8b',
    accent: '#28bd8b',
    placeholder: '#2b4055',
    text: '#2b4055',
    background: "transparent",
    error: "red"
  }
};