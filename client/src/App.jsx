import { useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>
      <ProductForm onCreated={() => setRefreshKey((key) => key + 1)} />
      <ProductList refreshKey={refreshKey} />
    </main>
  );
}
