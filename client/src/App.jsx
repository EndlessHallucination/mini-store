import ProductList from "./components/ProductList";

export default function App() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Products</h1>
      <ProductList />
    </main>
  );
}
