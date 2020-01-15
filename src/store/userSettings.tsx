import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

import { authUser, registerUser } from '../api/auth';
import { IUser } from '../models/user.js';

export interface IUserSettingsStore {
  user: IUser;
  error: string;

  signIn: (username: string, password: string) => Promise<boolean>;
  signUp: (username: string, password: string) => Promise<boolean>;
  setUserPhoto: (image: string) => void;
  setUserName: (text: string) => void;
  setUserSurname: (text: string) => void;
  clean: () => void;
  logout: () => void;
}

export const USER_SETTINGS_STORE = 'USER_SETTINGS_STORE';

export class UserSettingsStore implements IUserSettingsStore {
  @persist('object') @observable public user = {
    password: '',
    username: '',
    name: '',
    surname: '',
    token: '',
    photo:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  };
  @observable public error = '';

  @action.bound
  public async signIn(username: string, password: string) {
    try {
      this.user.username = username;
      this.user.password = password;
      const data = {
        username,
        password,
      };
      const response = await authUser(data);
      if (response.data.success) {
        this.user.token = response.data.token;
      } else {
        this.error = response.data.message;
      }
      return response.data.success;
    } catch (error) {
      return false;
    }
  }

  @action.bound
  public async signUp(username: string, password: string) {
    const data = {
      username,
      password,
    };
    try {
      const response = await registerUser(data);

      return true;
    } catch (error) {
      return false;
    }
  }

  @action.bound
  public setUserName(text: string) {
    this.user.name = text;
  }

  @action.bound
  public setUserSurname(text: string) {
    this.user.surname = text;
  }

  @action.bound
  public async setUserPhoto(image: string) {
    this.user.photo = image;
  }

  public clean = () => {
    this.user.password = '';
    this.user.username = '';
    this.user.name = '';
    this.user.surname = '';
    this.user.token = '';
    this.user.photo =
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg';
  };

  public logout() {
    this.user.password = '';
    this.user.username = '';
    this.user.name = '';
    this.user.surname = '';
    this.user.token = '';
    this.user.photo =
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg';
  }
}
