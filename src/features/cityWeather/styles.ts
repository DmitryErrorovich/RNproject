import { Dimensions, StyleSheet } from 'react-native';

const WIDTH_VALUE = 0.93;
const HEIGHT_VALUE = 0.1;
const { width, height } = Dimensions.get('window');
const TitleMargin = height * HEIGHT_VALUE;
const ContainerWidth = width * WIDTH_VALUE;

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
    position: 'relative'
  },
  welcomeText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 30,
    fontWeight: '600',
    color: '#444'
  },
  cityText: {
    color: '#444'
  },
  tempView: {
    width: 175,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 25,
    padding: 10,
    borderRadius: 8,
    elevation: 1,
  },
  buttonStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width: 100,
    height: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    top: 20,
    left: 10
  },
  buttonTextStyle: {
    fontSize: 12,
    color: '#444'
  },
  minText: {
    fontSize: 16,
    color: '#444'
  },
  maxText: {
    fontSize: 16,
    color: '#444'
  },
  weatherContainer: {
    flex: 1,
    alignSelf: 'center',
    width: ContainerWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    paddingTop: 20,
    paddingBottom: 15,
    borderRadius: 8,
    backgroundColor: 'transparent',
    shadowColor: '#444',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 3
  },
  dateText: {
    color: '#444'
  },
  cityTitle: {
    fontWeight: '700',
    fontSize: 32,
    color: '#444',
    alignSelf: 'center'
  },
  cityTitleContainer: {
    marginTop: TitleMargin,
    marginBottom: 25
  },
  imageStyle: {
    marginTop: 10,
    width: 30,
    height: 30
  }
});
