export interface IUser {
  username: string;
  password: string;
  name: string;
  surname: string;
  token: string;
  photo: string;
}

export interface IAuthData {
  username: string;
  password: string;
}