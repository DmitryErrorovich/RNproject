import { Dimensions, StyleSheet } from 'react-native';

const widthValue = 0.9;
const { width } = Dimensions.get('window');
const listWidth = width * widthValue;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  welcomeText: {
    alignSelf: 'center',
    marginTop: 55,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#444',
  },
  productsContainer: {
    backgroundColor: '#fff',
    flex: 1,
  },
  inputWrapper: {
    borderRadius: 20,
    marginTop: 30,
    marginHorizontal: 40,
  },
  signInButton: {
    height: 40,
    alignSelf: 'flex-end',
  },
  signInButtonText: {
    textAlign: 'center',
    color: '#fff',
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  productsList: {
    width: width * 0.8,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
  },
});
