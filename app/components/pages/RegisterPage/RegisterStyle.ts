// RegisterPage/styles.ts
import { StyleSheet } from 'react-native';
import { myTheme } from '@/constants/theme'; // adapte le chemin si besoin

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myTheme.colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: myTheme.colors.grey0,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: myTheme.fontSizes.large,
    backgroundColor: myTheme.colors.grey1,
  },
  inputError: {
    borderColor: myTheme.colors.error,
  },
  errorText: {
    color: myTheme.colors.error,
    marginBottom: 10,
    fontSize: myTheme.fontSizes.medium,
  },
  button: {
    height: 50,
    backgroundColor: myTheme.colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: myTheme.colors.disabled,
  },
  buttonText: {
    color: myTheme.colors.white,
    fontSize: myTheme.components.Button.titleStyle.fontSize,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  loginLinkText: {
    color: myTheme.colors.grey0,
    fontSize: myTheme.fontSizes.large,
  },
  loginLinkBold: {
    fontWeight: 'bold',
    color: myTheme.colors.primary,
  },
  imageUploadContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: myTheme.colors.grey1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: myTheme.colors.grey0,
  },
  imageUploadText: {
    marginTop: 5,
    fontSize: myTheme.fontSizes.small,
    color: myTheme.colors.grey0,
  },
});
