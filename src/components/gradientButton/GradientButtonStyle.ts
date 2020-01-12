import { styles } from "components/button/styles"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  componentWrapper: {
    paddingTop: 5,
    paddingBottom: 5
  },
  linearGradient: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 25,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonText: {
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#2b4055',
  },
  buttonTextDarkMode: {
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#fff',
  },
});
