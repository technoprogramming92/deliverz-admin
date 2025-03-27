import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { toast } from "react-toastify";

const AddProduct = ({ closeModal }: { closeModal: () => void }) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [mealCount, setMealCount] = useState(6);
  const [validityDays, setValidityDays] = useState(7);
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!productName || !price || !imageUrl) {
      toast.error("⚠️ All fields are required!");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name: productName,
        description,
        price: parseFloat(price),
        image: imageUrl,
        mealCount,
        validityDays,
        status,
        createdAt: new Date(),
      });

      toast.success("Product added successfully!");
      setProductName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      setMealCount(6);
      setValidityDays(7);
      closeModal();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("❌ Failed to add product!");
    }
    setLoading(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-darkblack-600 p-6 rounded-lg w-96 shadow-xl border border-gray-300 dark:border-darkblack-700">
        <h3 className="text-xl font-semibold mb-4 text-bgray-900 dark:text-white">
          Add New Product
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-bgray-800 dark:text-white">
              Product Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 dark:border-darkblack-400 dark:bg-darkblack-500 rounded-lg p-2 text-bgray-800 dark:text-white"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-bgray-800 dark:text-white">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 dark:border-darkblack-400 dark:bg-darkblack-500 rounded-lg p-2 text-bgray-800 dark:text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-bgray-800 dark:text-white">
              Price (CAD)
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 dark:border-darkblack-400 dark:bg-darkblack-500 rounded-lg p-2 text-bgray-800 dark:text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-bgray-800 dark:text-white">
              Image URL
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 dark:border-darkblack-400 dark:bg-darkblack-500 rounded-lg p-2 text-bgray-800 dark:text-white"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-bgray-800 dark:text-white">
                Meal Count
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 dark:border-darkblack-400 dark:bg-darkblack-500 rounded-lg p-2 text-bgray-800 dark:text-white"
                value={mealCount}
                onChange={(e) => setMealCount(Number(e.target.value))}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-bgray-800 dark:text-white">
                Validity Days
              </label>
              <input
                type="number"
                className="w-full border border-gray-300 dark:border-darkblack-400 dark:bg-darkblack-500 rounded-lg p-2 text-bgray-800 dark:text-white"
                value={validityDays}
                onChange={(e) => setValidityDays(Number(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-success-500 text-white rounded-md hover:bg-success-600"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
