import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Chip,
  Stack,
  Skeleton,
} from "@mui/material";
import toast from "react-hot-toast";
import { uploadFile } from "../../Logics/upload";
import { AddData } from "../../Logics/addData";
import { collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import { Product } from "@/types/products.interface";
import { docQr } from "@/Logics/docQr";
import { updateData } from "@/Logics/updateData";

const CreateProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice]= useState(0)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (localStorage.getItem("editProductId")) {
      (async () => {
        const _ = await docQr("Products");
        const filtered = _.filter((p: Product) => p.docId == localStorage.getItem("editProductId"))?.[0];
        if (filtered) {
          setTitle(filtered.title);
          setDescription(filtered.description);
          setSizes(filtered.sizes);
          setPreviewUrls(filtered.image);
          setEditingProduct(filtered);
          setPrice(filtered.price);
        }
      })();
    }
  }, []);

  // handle image select
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  // add size
  const addSize = () => {
    if (!sizeInput.trim()) return;
    setSizes((prev) => [...prev, sizeInput.trim()]);
    setSizeInput("");
  };

  // remove size
  const removeSize = (size: string) => {
    setSizes((prev) => prev.filter((s) => s !== size));
  };

  // submit product
 

const handleSubmit = async () => {
  if (!title || !description) {
    return toast.error("Fill all required fields");
  }

  setLoading(true);
  const toastId = toast.loading(
    editingProduct ? "Updating product..." : "Uploading product..."
  );

  try {
    let finalImageUrls: string[] = [];

    // =========================
    // 🟡 EDIT MODE
    // =========================
    if (editingProduct) {
      // 1. start with existing images already saved in DB
      finalImageUrls = [...editingProduct.image];

      // 2. upload only NEW images
      if (images.length > 0) {
        for (const file of images) {
          const url = (await uploadFile(file)) as string;
          finalImageUrls.push(url);
        }
      }

      await updateData("Products", editingProduct.docId!, {
        title,
        description,
        image: finalImageUrls,
        sizes,
      });

      toast.success("Product updated successfully");
      localStorage.removeItem("editProductId");
      setEditingProduct(null);
      return;
    }

    // =========================
    // 🟢 CREATE MODE
    // =========================
    if (images.length === 0) {
      return toast.error("Please upload at least one image");
    }

    for (const file of images) {
      const url = (await uploadFile(file)) as string;
      finalImageUrls.push(url);
    }

    const newProduct: Product = {
      title,
      description,
      price,
      image: finalImageUrls,
      sizes,
      createdAt: new Date().toISOString(),
    };

    await AddData(collection(db, "Products"), newProduct);
    toast.success("Product saved successfully");

    // reset
    setTitle("");
    setDescription("");
    setSizes([]);
    setImages([]);
    setPreviewUrls([]);
    setPrice(0);
  } catch (err: any) {
    console.error(err);
    toast.error("Failed to save product");
  } finally {
    toast.dismiss(toastId);
    setLoading(false);
  }
}

  return (
    <Box sx={{ maxWidth: 600 }}>
      {/* TITLE */}
      <TextField
        fullWidth
        label="Product Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />

      {/* DESCRIPTION */}
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
      />

  <TextField
        fullWidth
      
        label="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        margin="normal"
      />


      {/* SIZES */}
      <Stack direction="row" spacing={1} mt={2}>
        <TextField
          label="Add Size"
          value={sizeInput}
          onChange={(e) => setSizeInput(e.target.value)}
        />
        <Button variant="contained" onClick={addSize}>
          Add
        </Button>
      </Stack>

      <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
        {sizes.map((size) => (
          <Chip
            key={size}
            label={size}
            onDelete={() => removeSize(size)}
          />
        ))}
      </Stack>

      {/* IMAGE UPLOAD */}
      <Box mt={3}>
        <Button variant="outlined" component="label">
          Select Images
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleImageChange}
          />
        </Button>
      </Box>

      {/* PREVIEW */}
      <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={100}
              height={100}
            />
          ))
          : previewUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt="preview"
              style={{
                width: 100,
                height: 100,
                objectFit: "cover",
                borderRadius: 6,
              }}
            />
          ))}
      </Stack>

      {/* SUBMIT */}
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? "Saving..." : "Save Product"}
      </Button>
    </Box>
  );
};

export default CreateProduct;
