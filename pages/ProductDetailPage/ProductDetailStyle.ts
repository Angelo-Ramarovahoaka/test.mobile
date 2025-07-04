import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  productCategory: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: '#007AFF',
  },
  originalPrice: {
    fontSize: 18,
    color: '#6c757d',
    textDecorationLine: 'line-through',
  },
  salePrice: {
    fontSize: 22,
    fontWeight: '600',
    color: '#dc3545',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#495057',
    marginBottom: 20,
  },
  stock: {
    fontSize: 16,
    color: '#28a745',
    marginBottom: 24,
    fontWeight: '500',
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});