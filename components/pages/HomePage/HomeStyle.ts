import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  categoryScrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 60,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    color: '#495057',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  productContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  inactiveBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#6c757d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  inactiveBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productInfoContainer: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212529',
  },
  salePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#dc3545',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#6c757d',
    textDecorationLine: 'line-through',
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  detailsButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  detailsButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  userButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
});