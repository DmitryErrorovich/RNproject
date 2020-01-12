import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  errorText: {
    marginBottom: 10,
    color: 'red'
  },
  buttonStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 50,
    height: 25,
    top: 20,
    left: 10
  },
  buttonTextStyle: {
    fontSize: 10,
    color: '#fff'
  },
  headerStyle: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 32,
    color: '#fff'
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative'
  },

  welcomeText: {
    alignSelf: 'center',
    marginTop: 40,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff'
  },
  cancelButton: {
    alignSelf: 'center',
    marginRight: 40,
    marginTop: 20,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3db1ff'
  },
  cancelButtonText: {
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
  createButtonText: {
    alignSelf: 'flex-end'
  },
  createButton: {
    textAlign: 'center',
    color: '#fff'
  },
  buttonModalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});
