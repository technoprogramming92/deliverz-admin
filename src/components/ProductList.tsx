import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { toast } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsRef = collection(db, "products");
      const snapshot = await getDocs(productsRef);
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await deleteDoc(doc(db, "products", productId));
      toast.success("Product deleted successfully!");
      setProducts(products.filter((product) => product.id !== productId)); // Remove from UI
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("❌ Failed to delete product!");
    }
  };

  return (
    <div className="w-full overflow-x-scroll">
      <table className="w-full">
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center p-5 text-gray-500">
                Loading products...
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-5 text-gray-500">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} className="bg-white dark:bg-darkblack-600">
                <td className="whitespace-nowrap p-4 text-sm font-medium rounded-l-lg"></td>
                <td className="whitespace-nowrap py-4 text-sm text-gray-500 w-[400px] lg:w-auto">
                  <div className="flex items-center gap-5">
                    <div className="w-[64px] h-[64px]">
                      <img
                        className="w-full h-full object-cover rounded-lg"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-bgray-900 dark:text-white">
                        {product.name}
                      </h4>
                      <div>
                        <span className="font-medium text-base text-bgray-700 dark:text-bgray-50">
                          {product.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span className="bg-success-50 dark:bg-darkblack-500 text-sm text-success-300 font-medium rounded-lg px-3 py-1">
                    {product.price} CAD
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span className="bg-bamber-50 dark:bg-darkblack-500 rounded-lg text-sm text-bamber-500 font-medium px-3 py-1">
                    {product.status === "active" ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <button className="bg-success-300 hover:bg-success-400 transition duration-300 ease-in-out ml-6 font-semibold text-white py-3 flex items-center justify-center rounded-xl px-11">
                    Edit
                  </button>
                </td>
                {/* ✅ Replaced Old Button with Delete Button */}
                <td className="whitespace-nowrap pr-3 py-4 text-sm text-gray-500 rounded-r-lg">
                  <button
                    className="bg-success-300 hover:bg-success-400 transition duration-300 ease-in-out ml-6 font-semibold text-white py-3 flex items-center justify-center rounded-xl px-11"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
