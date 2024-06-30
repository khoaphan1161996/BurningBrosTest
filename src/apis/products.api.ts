import api from "./_api";
import { IAPIRes } from "../types/api";
import { IAPIResProduct } from "../types/products";
import { URL } from "../constants/url";
import { FIELD_SELECT_PRODUCT, LIMIT } from "../constants/page";

export const getProduts = ({
  limit = LIMIT,
  skip,
}: {
  limit?: number;
  skip?: number;
}): Promise<IAPIRes<IAPIResProduct>> => {
  return api
    .get(URL.PRODUCT, {
      params: {
        select: FIELD_SELECT_PRODUCT,
        limit,
        skip,
      },
    })
    .then((response) => response.data);
};

export const getSearchProduts = ({
  limit = LIMIT,
  skip,
  q,
}: {
  limit?: number;
  skip?: number;
  q: string;
}): Promise<IAPIRes<IAPIResProduct>> => {
  return api
    .get(URL.PRODUCT_SEARCH, {
      params: {
        select: FIELD_SELECT_PRODUCT,
        limit,
        skip,
        q,
      },
    })
    .then((response) => response.data);
};
