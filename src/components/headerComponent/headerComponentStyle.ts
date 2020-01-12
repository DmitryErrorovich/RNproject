import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  iosBackButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  appBarTop: {
    backgroundColor: '#6d62ee',
    ...Platform.select({
      ios: {},
      android: { borderBottomWidth: 0.5, borderColor: '#a3a5ab' },
    }),
  },
  cleanAppBarTop: {
    backgroundColor: 'transparent',
    zIndex: 1,
    ...Platform.select({
      ios: {},
      android: { borderBottomWidth: 0, borderColor: 'transparent' },
    }),
  },
  androidWrapper: {
    marginTop: 60,
    width: '45%',
  },
});
