import { debounce } from 'lodash';
import { action, observable, computed, toJS } from 'mobx';
import { persist } from 'mobx-persist';

import { getProducts, getProductReviews, postProductReview } from '../api/auth';
import AsyncStorage from '@react-native-community/async-storage';
import { IReview, IProduct } from '../models/Products';
import moment from 'moment';

export interface IProductsStore {
  products: Array<IProduct>;
  filteredProducts: Array<IProduct>;
  selectedProductID: number;
  reviews: Array<IReview>;
  filteredReviews: Array<IReview>;

  getProducts: () => Promise<void>;
  getProductReviews: (id: number) => Promise<void>;
  postProductReview: (comment: string, rate: number) => Promise<void>;
  clean: () => void;
}

export const PRODUCT_STORE = 'PRODUCT_STORE';

export class ProductsStore implements IProductsStore {
  @persist('list') @observable public products = [];
  @persist('list') @observable public reviews = [];
  @observable public selectedProductID = null;

  public DEBOUNCE_TIME = 1000;

  @computed
  public get filteredReviews() {
    return filteredReview = this.reviews.slice().sort((a: IReview, b: IReview) =>
      moment(b.created_at).diff(moment(a.created_at)),
    );
  }

  @computed
  public get filteredProducts() {
    return toJS(this.products);
  }

  @action.bound
  public debouncedGetProducts = debounce(this.getProducts, this.DEBOUNCE_TIME, {
    trailing: true,
    leading: false,
  });

  @action.bound
  public async getStorageValue(storageName: string) {
    const value = await AsyncStorage.getItem(storageName);
    return JSON.parse(value);
  }

  @action.bound
  public async getProducts() {
    try {
      const userStore = await this.getStorageValue('USER_SETTINGS_STORE');
      const response = await getProducts(userStore.user.token);
      this.products = toJS(response);
    } catch (error) {
      throw new Error(error);
    }
  }

  @action.bound
  public async getProductReviews(id: number) {
    try {
      const userStore = await this.getStorageValue('USER_SETTINGS_STORE');
      const response = await getProductReviews(id, userStore.user.token);
      this.selectedProductID = id;
      this.reviews = [...toJS(response)];
    } catch (error) {
      throw new Error(error);
    }
  }

  @action.bound
  public async postProductReview(comment: string, rate: number) {
    try {
      const userStore = await this.getStorageValue('USER_SETTINGS_STORE');
      const response = await postProductReview(
        comment,
        rate,
        this.selectedProductID,
        userStore.user.token,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @action.bound
  public clean = () => {
    this.products = null;
  };
}
