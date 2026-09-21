import { ENDPOINTS } from "../endpoints";
import { GENERIC_ERROR_MESSAGE } from "../utils";

// Sends only productId and quantity: the server looks up prices itself.
// Throws an Error whose message is safe to show: the server's text for 4xx, a generic one otherwise.
export async function createOrder(cartItems) {
  const items = cartItems.map(({ productId, quantity }) => ({ productId, quantity }));

  let response;
  try {
    response = await fetch(ENDPOINTS.orders.create, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
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
