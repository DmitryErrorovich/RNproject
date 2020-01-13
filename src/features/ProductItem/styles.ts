import { Dimensions, StyleSheet } from 'react-native';

const widthValue = 0.9;
const { width } = Dimensions.get('window');
const buttonWidth = width * widthValue;

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderRadius: 8,
    borderWidth: 2,
    marginTop: 20,
  },
  containerWithoutBorder: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
  },
  descriptionContainer: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  productImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
    borderColor: '#eee',
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    paddingVertical: 5,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  }
});
