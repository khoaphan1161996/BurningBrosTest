export type IAPIProductImage = Array<string>;

export interface IAPIProductItem {
  id: string;
  title: string;
  price: number;
  images: IAPIProductImage;
  description: string;
}

export type IAPIResProduct = Array<IAPIProductItem>;

export interface IQueryProduct {
  q?: string;
  skip: number;
}

export interface IQueryParamProduct {
  q?: string;
  page: number;
}
