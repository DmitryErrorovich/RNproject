import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative'
  },
  backgroundImgWrapper: {
    width,
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  welcomeText: {
    alignSelf: 'center',
    marginTop: 40,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'
  },
  signUpButton: {
    alignSelf: 'center',
    marginRight: 40,
    marginTop: 20,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3db1ff'
  },
  signUpButtonText: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center'
  },
  inputField: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  inputWrapper: {
    marginTop: 30,
    marginHorizontal: 40
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: 40,
    marginTop: 20,
    color: '#fff'
  },
  signInButton: {
    alignSelf: 'flex-end'
  },
  signInButtonText: {
    fontSize: 10,
    textAlign: 'center',
    color: '#fff'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});
