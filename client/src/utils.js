export const GENERIC_ERROR_MESSAGE = "Something went wrong. Please try again later.";

const priceFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

// Example: formatPrice(12.5) -> "$12.50"
export function formatPrice(amount) {
  return priceFormatter.format(amount);
}
