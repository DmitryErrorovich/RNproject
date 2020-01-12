import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  modal: {
    maxHeight: 350,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flex: 1
  },
  modalHeader: {
    backgroundColor: '#5101d1',
    color: '#fff'
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  button: {
    height: 20,
    width: 40
  }
});
