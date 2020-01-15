import { Dimensions, StyleSheet } from 'react-native';

const widthValue = 0.9;
const { width } = Dimensions.get('window');
const buttonWidth = width * widthValue;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  containerWithoutBorder: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#eee',
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  editField: {
    width: 200,
    height: 55,
    backgroundColor: 'transparent',
  },
  name: {
    fontSize: 16,
    flex: 3,
  },
  nameTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  fieldContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
  },
  scrollView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});
