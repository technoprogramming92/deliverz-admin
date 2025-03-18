import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import AddProduct from "./AddProduct";

const ProductManager = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {/* Add Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="pl-10 md:block hidden">
        <button
          className="py-3 px-10 bg-success-300 text-white rounded-lg font-medium text-sm"
          onClick={() => setShowModal(true)}
        >
          Add Product
        </button>
      </div>

      {showModal && <AddProduct closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default ProductManager;
