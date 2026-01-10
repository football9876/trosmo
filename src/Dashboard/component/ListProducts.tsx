import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { Product } from "@/types/products.interface";
import { setCurrentPage } from "@/store/Slice";
import { useDispatch } from "react-redux";

const ProductsGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "Products"));
      const list: Product[] = snap.docs.map((d) => ({
        ...(d.data() as Product),
        docId: d.id,
      }));
      setProducts(list);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 delete product
  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteDoc(doc(db, "Products", id));
      setProducts((prev) => prev.filter((p) => p.docId !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  // 🔹 edit product (route to edit page)
  const dispatch=useDispatch();
  const handleEdit = (id?: string) => {
    if (!id) return;
    // example: using react-router
    localStorage.setItem("editProductId", id);
    dispatch(setCurrentPage("/Products"));
  };

  return (
    <div className="mt-4 px-4">
      {loading ? (
        <div className="flex justify-center py-10">
          <MDBSpinner />
        </div>
      ) : (
        <div
          className="
            grid gap-4
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {products.map((p) => (
            <div
              key={p.docId}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
            >
              {/* IMAGE */}
              <img
                src={p.image?.[0]}
                alt={p.title}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />

              {/* CONTENT */}
              <h3 className="font-semibold text-lg">{p.title}</h3>

              <p className="text-sm text-gray-500 mt-1">
                {p.description.slice(0, 80)}...
              </p>

              {/* SIZES */}
              <div className="flex flex-wrap gap-1 mt-2">
                {p.sizes?.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="mt-auto pt-4 flex gap-2">
                <button
                  onClick={() => handleEdit(p.docId)}
                  className="
                    flex-1 text-sm py-2 rounded-lg
                    bg-blue-600 text-white
                    hover:bg-blue-700 transition
                  "
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.docId)}
                  className="
                    flex-1 text-sm py-2 rounded-lg
                    bg-red-600 text-white
                    hover:bg-red-700 transition
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    
  );
};

export default ProductsGrid;
