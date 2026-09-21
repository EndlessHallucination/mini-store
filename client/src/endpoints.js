import { CONFIG } from "./config";

const BASE_URL = `${CONFIG.apiUrl}/api`;

export const ENDPOINTS = {
  products: {
    list: `${BASE_URL}/products`,
    create: `${BASE_URL}/products`,
    delete: (id) => `${BASE_URL}/products/${id}`
  },
  orders: {
    create: `${BASE_URL}/orders`
  }
};

Object.freeze(ENDPOINTS);
