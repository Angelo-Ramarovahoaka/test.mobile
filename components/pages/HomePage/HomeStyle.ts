import { StyleSheet } from 'react-native';
import { myTheme } from '@/constants/theme'; // adapte le chemin si besoin

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myTheme.colors.grey1,
  },
  categoryScrollContainer: {
  paddingHorizontal: 16,
  paddingVertical: 5, // ajusté pour mieux centrer verticalement
  // height: 60,
  backgroundColor: myTheme.colors.grey0,
},

categoryButton: {
  paddingHorizontal: 16,
  height: 40, // fixe
  justifyContent: 'center', // pour centrer verticalement le texte
  marginRight: 8,
  marginBottom: 10,
  borderRadius: 20,
  backgroundColor: myTheme.colors.greyOutline,
},

  categoryButtonActive: {
    backgroundColor: myTheme.colors.primary,
  },
  categoryButtonText: {
    color: myTheme.colors.black,
    fontSize: myTheme.fontSizes.medium,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: myTheme.colors.white,
  },
  productContainer: {
    backgroundColor: myTheme.colors.white,
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
    backgroundColor: myTheme.colors.grey0,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  inactiveBadgeText: {
    color: myTheme.colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  productInfoContainer: {
    padding: 12,
  },
  productName: {
    fontSize: myTheme.fontSizes.medium,
    fontWeight: '600',
    color: myTheme.colors.black,
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
    color: myTheme.colors.black,
  },
  salePrice: {
    fontSize: 16,
    fontWeight: '700',
    color: myTheme.colors.error,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: myTheme.colors.grey0,
    textDecorationLine: 'line-through',
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: myTheme.colors.greyOutline,
  },
  detailsButton: {
    flexDirection: 'row',
    backgroundColor: myTheme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
  },
  detailsButtonText: {
    color: myTheme.colors.white,
    fontSize: myTheme.fontSizes.medium,
    fontWeight: '500',
  },
  userButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: myTheme.colors.greyOutline,
  },
  userImage: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    // Optional: center content here if needed
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: myTheme.fontSizes.large,
    color: myTheme.colors.grey0,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  listContentContainer: {
    paddingBottom: 20,
  },
});

export const headerStyles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: myTheme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: myTheme.colors.greyOutline,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: myTheme.colors.grey1,
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  activeFilter: {
    backgroundColor: '#e1f0ff', // or use a lighter version of primary if defined
  },
  filterText: {
    marginLeft: 5,
    fontSize: myTheme.fontSizes.medium,
    color: myTheme.colors.grey0,
  },
  activeFilterText: {
    color: myTheme.colors.primary,
    fontWeight: '600',
  },
  sortOrderButton: {
    marginLeft: 5,
    padding: 5,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: myTheme.colors.grey1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginLeft: 10,
    maxWidth: 200,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 36,
    fontSize: myTheme.fontSizes.medium,
    color: myTheme.colors.black,
  },
});
