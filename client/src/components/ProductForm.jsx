import { useState } from "react";
import { createProduct } from "../services/productsService";

const EMPTY_VALUES = { name: "", price: "", description: "" };
const inputClasses = "w-full rounded-md border border-gray-300 px-3 py-2";

export default function ProductForm({ onCreated }) {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Updates one field, e.g. typing in the price input calls handleChange with name="price".
  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await createProduct(values);
      setValues(EMPTY_VALUES);
      onCreated();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="mb-6 space-y-3">
      <input name="name" value={values.name} onChange={handleChange} placeholder="Name" aria-label="Name" className={inputClasses} />
      <input
        name="price"
        type="number"
        step="0.01"
        value={values.price}
        onChange={handleChange}
        placeholder="Price"
        aria-label="Price"
        className={inputClasses}
      />
      <textarea
        name="description"
        value={values.description}
        onChange={handleChange}
        placeholder="Description"
        aria-label="Description"
        className={inputClasses}
      />
      {errorMessage && (
        <p role="alert" className="text-red-600">
          {errorMessage}
        </p>
      )}
      <button type="submit" disabled={isSubmitting} className="rounded-md bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
        {isSubmitting ? "Adding..." : "Add product"}
      </button>
    </form>
  );
}
