import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 16,
    marginRight: 8,
    color: '#333',
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
    backgroundColor: '#f5f5f5',
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
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  cameraButton: {
    backgroundColor: '#34C759',
  },
  imageButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  switchContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#ccc',
    alignSelf: 'flex-start',
  },
  statusButtonActive: {
    backgroundColor: '#34C759', // Green for active
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});