import { action, observable } from "mobx";
import { persist } from "mobx-persist";

import { authUser, registerUser } from "../api/auth";
import { IUser } from "../models/user.js";

export interface IUserSettingsStore {
  user: IUser;
  error: string;

  signIn: (username: string, password: string) => Promise<boolean>;
  signUp: (username: string, password: string) => Promise<boolean>;
  clean: () => void;
}

export const USER_SETTINGS_STORE = "USER_SETTINGS_STORE";

export class UserSettingsStore implements IUserSettingsStore {
  @persist("object") @observable public user = {
    password: "",
    username: "",
    token: ""
  };
  @observable public error = "";

  @action.bound
  public async signIn(username: string, password: string) {
    try {
      this.user.username = username;
      this.user.password = password;
      const data = {
        username,
        password
      };
      const response = await authUser(data);
      console.log({ data: response.data.success});
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
      password
    };
    try {
      const response = await registerUser(data);

      return true;
    } catch (error) {
      return false;
    }
  }

  public clean = () => {
    this.user.email = "";
    this.user.password = "";
    this.user.token = "";
    this.error = "";
  };
}
