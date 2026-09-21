import { useRef, useState } from "react";
import { createOrder } from "../services/ordersService";
import { formatPrice } from "../utils";

export default function Cart({ items, isCheckingOut, onQuantityChange, onRemove, onCheckoutStart, onCheckoutEnd, onCheckedOut }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmation, setConfirmation] = useState("");
  // State updates are async, so a fast double click could start two requests. The ref changes instantly.
  const isSubmittingRef = useRef(false);

  // Summed in cents to avoid floating point drift, e.g. 0.1 + 0.2 in dollars.
  const estimatedTotal = items.reduce((sum, item) => sum + Math.round(item.price * 100) * item.quantity, 0) / 100;

  // Whole number, minimum 1: "" -> 1, "0" -> 1, "2.7" -> 2.
  function handleQuantityChange(productId, value) {
    onQuantityChange(productId, Math.max(1, Math.floor(Number(value)) || 1));
  }

  async function handleCheckout() {
    if (isSubmittingRef.current || items.length === 0) return;
    isSubmittingRef.current = true;

    setErrorMessage("");
    setConfirmation("");
    onCheckoutStart();

    try {
      const order = await createOrder(items);
      setConfirmation(`Order placed! Total: ${formatPrice(order.total)}`);
      onCheckedOut();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      isSubmittingRef.current = false;
      onCheckoutEnd();
    }
  }

  return (
    <section className="mt-8">
      <h2 className="mb-2 text-xl font-bold">Cart</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
          {items.map((item) => (
            <li key={item.productId} className="flex items-center gap-4 px-4 py-3">
              <span className="font-medium">{item.name}</span>
              <span className="ml-auto text-gray-700">{formatPrice(item.price)}</span>
              <input
                type="number"
                min="1"
                step="1"
                value={item.quantity}
                onChange={(event) => handleQuantityChange(item.productId, event.target.value)}
                disabled={isCheckingOut}
                aria-label={`Quantity of ${item.name}`}
                className="w-20 rounded-md border border-gray-300 px-2 py-1 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => onRemove(item.productId)}
                disabled={isCheckingOut}
                className="rounded-md bg-red-600 px-3 py-1 text-white disabled:opacity-50"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-gray-700">
        Estimated total: <span className="font-semibold">{formatPrice(estimatedTotal)}</span>
        <span className="text-sm text-gray-500"> (the final total is calculated by the server)</span>
      </p>
      {errorMessage && (
        <p role="alert" className="mt-2 text-red-600">
          {errorMessage}
        </p>
      )}
      {confirmation && (
        <p role="status" className="mt-2 text-green-700">
          {confirmation}
        </p>
      )}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={isCheckingOut || items.length === 0}
        className="mt-3 rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isCheckingOut ? "Placing order..." : "Checkout"}
      </button>
    </section>
  );
}
