import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productsService";

const priceFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Ignore the result if the component unmounted before the request finished.
    let isCancelled = false;

    fetchProducts()
      .then((data) => {
        if (!isCancelled) setProducts(data);
      })
      .catch(() => {
        if (!isCancelled) setIsError(true);
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  if (isLoading) return <p className="text-gray-500">Loading products...</p>;
  if (isError) {
    return <p className="text-red-600">Sorry, we couldn't load the products. Please try again later.</p>;
  }
  if (products.length === 0) return <p className="text-gray-500">No products available yet.</p>;

  return (
    <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
      {products.map((product) => (
        <li key={product._id} className="flex items-center justify-between px-4 py-3">
          <span className="font-medium">{product.name}</span>
          <span className="text-gray-700">{priceFormatter.format(product.price)}</span>
        </li>
      ))}
    </ul>
  );
}
