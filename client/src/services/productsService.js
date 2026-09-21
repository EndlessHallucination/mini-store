import { ENDPOINTS } from "../endpoints";

export async function fetchProducts() {
  const response = await fetch(ENDPOINTS.products.list);
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  return response.json();
}
