import { useState } from "react";
import Cart from "./components/Cart";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [cart, setCart] = useState([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Adding a product already in the cart raises its quantity by 1.
  function handleAddToCart(product) {
    setCart((current) => {
      const isInCart = current.some((item) => item.productId === product._id);
      if (isInCart) {
        return current.map((item) => (item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { productId: product._id, name: product.name, price: product.price, quantity: 1 }];
    });
  }

  function handleQuantityChange(productId, quantity) {
    setCart((current) => current.map((item) => (item.productId === productId ? { ...item, quantity } : item)));
  }

  function handleRemove(productId) {
    setCart((current) => current.filter((item) => item.productId !== productId));
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>
      <ProductForm onCreated={() => setRefreshKey((key) => key + 1)} />
      <ProductList refreshKey={refreshKey} isCheckingOut={isCheckingOut} onAddToCart={handleAddToCart} />
      <Cart
        items={cart}
        isCheckingOut={isCheckingOut}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        onCheckoutStart={() => setIsCheckingOut(true)}
        onCheckoutEnd={() => setIsCheckingOut(false)}
        onCheckedOut={() => setCart([])}
      />
    </main>
  );
}
