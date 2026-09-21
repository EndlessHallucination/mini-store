import { useEffect, useState } from "react";
import { deleteProduct, fetchProducts } from "../services/productsService";

const priceFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

// Changing `refreshKey` makes the list fetch again.
export default function ProductList({ refreshKey }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [deletingIds, setDeletingIds] = useState([]);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    // Ignore the result if the component unmounted before the request finished.
    let isCancelled = false;

    async function loadProducts() {
      try {
        const data = await fetchProducts();
        if (!isCancelled) {
          setProducts(data);
          setIsError(false);
        }
      } catch {
        if (!isCancelled) setIsError(true);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    loadProducts();

    return () => {
      isCancelled = true;
    };
  }, [refreshKey]);

  async function handleDelete(product) {
    if (deletingIds.includes(product._id)) return;
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    setDeleteError("");
    setDeletingIds((ids) => [...ids, product._id]);
    try {
      await deleteProduct(product._id);
      setProducts((current) => current.filter((item) => item._id !== product._id));
    } catch (error) {
      setDeleteError(error.message);
      // Already gone on the server (e.g. deleted in another tab), so drop it from the list too.
      if (error.status === 404) {
        setProducts((current) => current.filter((item) => item._id !== product._id));
      }
    } finally {
      setDeletingIds((ids) => ids.filter((id) => id !== product._id));
    }
  }

  if (isLoading) return <p className="text-gray-500">Loading products...</p>;
  if (isError) {
    return <p className="text-red-600">Sorry, we couldn't load the products. Please try again later.</p>;
  }
  if (products.length === 0) return <p className="text-gray-500">No products available yet.</p>;

  return (
    <>
      {deleteError && (
        <p role="alert" className="mb-2 text-red-600">
          {deleteError}
        </p>
      )}
      <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
        {products.map((product) => {
          const isDeleting = deletingIds.includes(product._id);
          return (
            <li key={product._id} className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="font-medium">{product.name}</span>
              <span className="ml-auto text-gray-700">{priceFormatter.format(product.price)}</span>
              <button
                type="button"
                onClick={() => handleDelete(product)}
                disabled={isDeleting}
                className="rounded-md bg-red-600 px-3 py-1 text-white disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}
