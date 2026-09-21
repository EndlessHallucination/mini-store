import { ENDPOINTS } from "../endpoints";

const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again later.";

// Throws an Error whose message is safe to show: the server's text for 4xx, a generic one otherwise.
export async function createProduct(product) {
  let response;
  try {
    response = await fetch(ENDPOINTS.products.create, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
  } catch {
    throw new Error(GENERIC_ERROR_MESSAGE);
  }

  if (response.ok) return response.json();

  if (response.status >= 400 && response.status < 500) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? GENERIC_ERROR_MESSAGE);
  }
  throw new Error(GENERIC_ERROR_MESSAGE);
}

export async function fetchProducts() {
  const response = await fetch(ENDPOINTS.products.list);
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
  return response.json();
}
