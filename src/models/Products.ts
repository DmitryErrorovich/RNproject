export interface IProduct {
  id: number;
  title: string;
  img: string;
  text: string;
}
export interface IReview {
  id: number;
  product: number;
  rate: number;
  text: string;
  created_by: IReviewAuthor;
  created_at: string;
}

export interface IReviewAuthor {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}
