export type RootStackParamList = {
    Login: undefined;
    Marketplace: { initialCategory?: string };
    CategoryScreen: undefined;
    ServicesScreen: { initialCategory?: string };
    BusinessPage: { businessId: string };
    ProductPage: { productId: string };
  };