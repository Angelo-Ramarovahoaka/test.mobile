import { StyleSheet } from 'react-native';
import { myTheme } from '@/theme'; // Adjust the import path as needed

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myTheme.colors.secondary,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: myTheme.components.Text.h1Style.fontSize,
    fontWeight: myTheme.components.Text.h3Style.fontWeight,
    color: myTheme.colors.secondary,
  },
  subHeaderText: {
    fontSize: myTheme.components.Text.h3Style.fontSize,
    color: myTheme.colors.black,
    marginTop: 5,
  },
  input: {
    height: 50,
    borderColor: myTheme.colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: myTheme.fontSizes.medium ?? 14,
    color: myTheme.colors.text,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  button: {
    ...myTheme.components.Button.buttonStyle,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: myTheme.components.Button.titleStyle.fontSize,
    fontWeight: 'bold',
  },
  loginLinkText: {
  textAlign: 'center',
    marginTop: 10,
    color: '#',
    fontSize: 16,
  },
  loginLinkBold: {
    color: myTheme.colors.secondary,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(156, 128, 128, 0.7)', 
    height: '70%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  },
});