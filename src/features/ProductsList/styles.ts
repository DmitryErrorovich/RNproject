import { Dimensions, StyleSheet } from 'react-native';

const widthValue = 0.9;
const { width } = Dimensions.get('window');
const listWidth = width * widthValue;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative'
  },
  welcomeText: {
    alignSelf: 'center',
    marginTop: 55,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#444'
  },
  inputWrapper: {
    borderRadius: 20,
    marginTop: 30,
    marginHorizontal: 40,
  },
  signInButton: {
    height: 40,
    alignSelf: 'flex-end'
  },
  signInButtonText: {
    textAlign: 'center',
    color: '#fff'
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  cityButton: {
    backgroundColor: 'transparent',
    width: listWidth,
    marginTop: 10,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3
  },
  cityText: {
    color: '#444'
  },
  favoritesButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 100,
    height: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    top: 20,
    right: 10
  },
  favoritesButtonText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#444'
  },
  proposedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 5,
  },
  addFavorites: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#86db9a',
    width: 50,
    left: 0,
    marginTop: 10,
    marginLeft: 0,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    zIndex: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3
  },
  productsList: {
    width: width * 0.8,
    justifyContent: 'center'
  },
  container: {
    alignItems: 'center',
  }
});
