import axios from 'axios';
import { IAuthData } from 'models/user';

export const BASE_API = 'https://www.metaweather.com';
export const HEROKU_API = 'http://smktesting.herokuapp.com';

export const authUser = async (data: IAuthData) => {
  try {
    const response = await axios.post(
      `${HEROKU_API}/api/login/`,
      {
        username: data.username,
        password: data.password
      }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export const registerUser = async (data: IAuthData) => {
  try {
    const response = await axios.post(
      `${HEROKU_API}/api/register/`,
      { ...data }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export const getProducts = async (token: string) => {
  try {
    const { data } = await axios.get(
      `${HEROKU_API}/api/products/`,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getProductReviews = async (id: number, token: string) => {
  try {
    const { data } = await axios.get(
      `${HEROKU_API}/api/reviews/${id}`,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export const postProductReview = async (text: string, rate: number, productID: number, token: string) => {
  try {
    console.log('POST')
    const { data } = await axios.post(
      `${HEROKU_API}/api/reviews/${productID}`,
      {
        headers: {
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({
          text,
          rate
        })
      }
    )
    return data
  } catch (error) {
    throw new Error(error);
  }
}