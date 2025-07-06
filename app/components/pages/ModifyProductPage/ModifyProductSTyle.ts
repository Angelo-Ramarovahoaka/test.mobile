import { StyleSheet } from "react-native";
import { myTheme } from "@/constants/theme"; // adapte ce chemin à ton projet

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myTheme.colors.white,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: myTheme.colors.grey0,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: myTheme.fontSizes.large,
    fontWeight: '600',
    marginBottom: 8,
    color: myTheme.colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: myTheme.colors.greyOutline,
    borderRadius: 8,
    padding: 12,
    fontSize: myTheme.fontSizes.medium,
    backgroundColor: myTheme.colors.white,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: myTheme.fontSizes.medium,
    marginRight: 8,
    color: myTheme.colors.black,
    fontWeight: '600',
  },
  priceInput: {
    flex: 1,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: myTheme.colors.grey1,
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: myTheme.colors.grey0,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  cameraButton: {
    backgroundColor: myTheme.colors.grey0,
  },
  imageButtonText: {
    color: myTheme.colors.white,
    marginLeft: 8,
    fontWeight: '500',
  },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: myTheme.colors.grey0,
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: myTheme.colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  switchContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: myTheme.colors.grey0,
    alignSelf: 'flex-start',
  },
  statusButtonActive: {
    backgroundColor: myTheme.colors.success,
  },
  statusText: {
    color: myTheme.colors.white,
    fontWeight: '600',
    fontSize: myTheme.fontSizes.small,
  },
});
