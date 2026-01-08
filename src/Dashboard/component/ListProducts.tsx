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
    <MDBContainer className="mt-4">
      {loading ? (
        <div className="text-center py-5">
          <MDBSpinner />
        </div>
      ) : (
        <MDBRow>
          {products.map((p) => (
            <MDBCol md="4" sm="6" xs="12" key={p.docId} className="mb-4">
              <MDBCard className="h-100 shadow-2-strong">
                {/* IMAGE */}
                <MDBCardImage
                  src={p.image?.[0]}
                  position="top"
                  alt={p.title}
                  style={{ height: 200, objectFit: "cover" }}
                />

                <MDBCardBody className="d-flex flex-column">
                  <MDBCardTitle>{p.title}</MDBCardTitle>

                  <MDBCardText className="text-muted small">
                    {p.description.slice(0, 80)}...
                  </MDBCardText>

                  {/* SIZES */}
                  <div className="mb-2">
                    {p.sizes?.map((s) => (
                      <span
                        key={s}
                        className="badge bg-light text-dark me-1"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-auto d-flex gap-2">
                    <MDBBtn
                      size="sm"
                      color="primary"
                      onClick={() => handleEdit(p.docId)}
                    >
                      Edit
                    </MDBBtn>
                    <MDBBtn
                      size="sm"
                      color="danger"
                      onClick={() => handleDelete(p.docId)}
                    >
                      Delete
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      )}
    </MDBContainer>
  );
};

export default ProductsGrid;
