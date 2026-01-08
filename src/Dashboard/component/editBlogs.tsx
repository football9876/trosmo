import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import CreateBlog, { BlogItem } from "./createBlog";

const EditBlogs = () => {
  const [editData, setEditData] = useState<BlogItem | null>(null);

  useEffect(() => {
    // Retrieve edit data from sessionStorage
    const storedBlog = sessionStorage.getItem("editBlog");
    if (storedBlog) {
      setEditData(JSON.parse(storedBlog) as BlogItem);
    }
  }, []);

  return (
    <MDBCard className="mb-4" style={{ maxWidth: 600 }}>
      <MDBCardBody>
        <h4 className="mb-3">Edit Blog</h4>
        {editData ? <CreateBlog editData={editData} /> : <p>Loading...</p>}
      </MDBCardBody>
    </MDBCard>
  );
};

export default EditBlogs;
