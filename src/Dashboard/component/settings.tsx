import React, { useEffect, useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { docQr } from "../../Logics/docQr";
import { AddData } from "../../Logics/addData";
import { collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import toast from "react-hot-toast";
import { deleteData } from "../../Logics/deleteData";

const Settings = () => {
  const [countries, setCountries] = useState<{ docId: string; name: string }[]>([]);
  const [newCountry, setNewCountry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading,setLoading]=useState<boolean>(false);

  // Fetch countries
  const fetchCountries = async () => {
    setLoading(true);
    try {
      const data = await docQr("countries", {});
      setCountries(data);
    } catch (err) {
      console.error(err);
    }
    finally{
    setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleAddCountry = async () => {
    try{
await AddData(collection(db,"countries"),{
    name:newCountry
})
fetchCountries()
    setNewCountry("");
    toast.success("Country added successfully")
    }
    catch(error:any){
        toast.error(error.message);
    }
  };

  const handleDeleteCountry = async (docId: string) => {
try{
await deleteData("countries",docId);
fetchCountries()

toast.success("deleted succesfully");
}
catch(err:any){
toast.error(err.message);
}
finally{

}
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter countries by search term
  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px",background:"white",overflow:"auto",maxHeight:"100vh" }}>
      <h4>Countries Settings</h4>

      <MDBInput
        label="Search countries..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-3"
      />



<div className="flex items-center" style={{gap:10,height:50}}>
      <MDBInput
        label="Add new country"
        value={newCountry}
        onChange={(e) => setNewCountry(e.target.value)}
      />
      <MDBBtn style={{width:100}} size={'sm'} onClick={handleAddCountry} color="dark">
        Add
      </MDBBtn>
</div>
<div>
    {loading && <span>loading...</span>}
</div>
      <ul className="hoverable">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <li className="hover" key={country.docId} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span>{country.name}</span>
              <MDBBtn color="danger" size="sm" onClick={() => handleDeleteCountry(country.docId)}>
                Delete
              </MDBBtn>
            </li>
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </ul>
    </div>
  );
};

export default Settings;
