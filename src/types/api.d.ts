export interface IAPIRes<T> {
  products: T;
  total: number;
  skip?: number;
  limit?: number;
}

export interface SearchInputProps {
  searchValue: string;
  setSearchValue: (data: string) => void;
  setProductList: (data) => void;
}

interface StringMap {
  [key: string]: string;
}
