import { StyleSheet } from 'react-native';

const WRAPPER_HEIGHT = 40;
const ERROR_MARGIN = 3;

export const styles = StyleSheet.create({
  defaultWrapper: {
    height: WRAPPER_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#444',
    borderWidth: 1,
  },
  defaultInput: {
    color: '#000'
  },
  errorText: {
    position: 'absolute',
    top: WRAPPER_HEIGHT + ERROR_MARGIN,
    left: 10,
    color: 'red',
    fontSize: 13
  }
});
