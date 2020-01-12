import AsyncStorage from '@react-native-community/async-storage';
import { action, keys, observable } from 'mobx';
import { create, persist } from 'mobx-persist';

export interface IErrorStore {
  error?: {
    errorCode?: string;
    message?: string;
    isError?: boolean;
  };
}

export const ERROR_STORE = 'ERROR_STORE';

class ErrorStore implements IErrorStore {
  @persist('object') @observable public error = {
    errorCode: '',
    message: '',
    isError: false
  };
  @action.bound
  public handleError(props: Partial<ErrorStore>) {
    Object.assign(this, props);
  }
}

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true
});

export const errorStore = new ErrorStore();
