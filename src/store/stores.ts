import { PRODUCT_STORE, ProductsStore } from './productsStore';
import { USER_SETTINGS_STORE, UserSettingsStore } from './userSettings';

export interface IStores {
  [store: string]: any;
}

export const stores: IStores = {
  [USER_SETTINGS_STORE]: new UserSettingsStore(),
  [PRODUCT_STORE]: new ProductsStore(),
};
