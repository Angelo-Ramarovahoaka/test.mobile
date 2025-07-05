import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  actionButtons: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    zIndex: 1,
  },
  modifyButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 30,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 30,
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  productCategory: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  salePrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  stock: {
    fontSize: 16,
    fontWeight: '500',
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  ownerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  ownerEmail: {
    fontSize: 14,
    color: '#666',
    marginVertical: 3,
  },
  ownerPhone: {
    fontSize: 14,
    color: '#666',
  },
});