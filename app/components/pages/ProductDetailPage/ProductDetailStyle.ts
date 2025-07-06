import { StyleSheet } from 'react-native';
import { myTheme } from '@/constants/theme';// adapte ce chemin si nécessaire

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myTheme.colors.white,
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
    backgroundColor: myTheme.colors.primary,
    padding: 10,
    borderRadius: 30,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: myTheme.colors.error,
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
    color: myTheme.colors.black,
  },
  productCategory: {
    fontSize: myTheme.fontSizes.large,
    color: myTheme.colors.grey0,
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
    color: myTheme.colors.black,
  },
  salePrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: myTheme.colors.error,
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 18,
    color: myTheme.colors.grey0,
    textDecorationLine: 'line-through',
  },
  sectionTitle: {
    fontSize: myTheme.fontSizes.large,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: myTheme.colors.black,
  },
  description: {
    fontSize: myTheme.fontSizes.medium,
    lineHeight: 24,
    color: myTheme.colors.grey0,
  },
  stock: {
    fontSize: myTheme.fontSizes.medium,
    fontWeight: '500',
    color: myTheme.colors.success, // tu peux aussi gérer en condition (vert/rouge)
  },
  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 15,
    backgroundColor: myTheme.colors.grey1,
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
    color: myTheme.colors.black,
  },
  ownerEmail: {
    fontSize: 14,
    color: myTheme.colors.grey0,
    marginVertical: 3,
  },
  ownerPhone: {
    fontSize: 14,
    color: myTheme.colors.grey0,
  },
});
