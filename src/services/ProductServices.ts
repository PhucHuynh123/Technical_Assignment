import axios from "axios";

import { Product } from "../types/Product";

const API_BASE_URL = "https://dummyjson.com/products";

export const fetchProducts = async (
  page: number
): Promise<{ products: Product[]; total: number }> => {
  const limit = 20;
  const response = await axios.get(
    `${API_BASE_URL}?limit=${limit}&skip=${(page - 1) * limit}`
  );
  return { products: response.data.products, total: response.data.total };
};

export const searchProducts = async (
  query: string,
  page: number
): Promise<{ products: Product[]; total: number }> => {
  const limit = 20;
  const response = await axios.get(
    `${API_BASE_URL}/search?q=${query}&limit=${limit}&skip=${
      (page - 1) * limit
    }`
  );
  return { products: response.data.products, total: response.data.total };
};
