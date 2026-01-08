import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBBadge,MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { User } from "../../interface";
import { docQr } from "../../Logics/docQr";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import toast from "react-hot-toast";
import { deleteData } from "../../Logics/deleteData";
import { setCurrentPage } from "../../store/Slice";
import { useDispatch } from "react-redux";






const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  
  const dispatch=useDispatch();
  const toggleProperty = async (id: string, property: keyof User) => {
    let toastId:any;
    try {
  
      // Determine the new value based on the current state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.userid === id
            ? {
                ...user,
                [property]: typeof user[property] === "boolean" ? !user[property] : user[property] === "yes" ? "no" : "yes",
              }
            : user
        )
      );
  
      // Get the updated value after local state change
      const updatedUser = users.find((user) => user.userid === id);
      if (!updatedUser) return;
  
      const newValue =
        typeof updatedUser[property] === "boolean"
          ? !updatedUser[property]
          : updatedUser[property] === "yes"
          ? "no"
          : "yes";
  toastId=toast.loading("Updating "+updatedUser.username)
      // Update Firestore document
      const userRef = doc(db, "Users", updatedUser.docId as string); // Reference to the Firestore document

      await updateDoc(userRef, {
        [property]: newValue,
      });
  
      toast.success(`Operation Successfully`);
    } catch (error:any) {
      console.error("Error updating user property:", error);
      toast.error(error.message)
    }
    finally{
      toast.dismiss(toastId);
    }
  };

  const deleteUser=async (userId:string)=>{
    let toastId:any;
    try{
      const user = users.find((user) => user.userid === userId);
      toastId=toast.loading("Deleting user"+user?.username||"")
await deleteData("Users",user?.docId as string);
setUsers((prevUsers) =>
  prevUsers.filter((e) =>
    e.userid !== user?.userid
  )
);
toast.success('Deleted successfully');
    }
catch(err:any){
toast.error(err.message)
}
finally{
toast.dismiss(toastId)
}
  }

  // Fetch Users
  const getUsers = async () => {
    try {
      setLoading(true);
      const usersData = await docQr("Users", {});
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="users-container">
      <MDBTable align="middle" responsive>
        <MDBTableHead>
          <tr>
            <th>Username</th>
            <th>Gender</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {loading
            ? // Show Skeleton Loader when loading
              [...Array(6)].map((_, index) => (
                <tr key={index}>
                  <td>
                    <MDBCard>
                      <MDBCardBody>
                        <div className="skeleton-box" style={{ width: "100px", height: "20px" }} />
                      </MDBCardBody>
                    </MDBCard>
                  </td>
                  <td>
                    <div className="skeleton-box" style={{ width: "70px", height: "20px" }} />
                  </td>
                  <td>
                    <div className="skeleton-box" style={{ width: "90px", height: "20px" }} />
                  </td>
                  <td>
                    <div className="skeleton-box" style={{ width: "120px", height: "20px" }} />
                  </td>
                  <td>
                    <div className="skeleton-box" style={{ width: "150px", height: "30px" }} />
                  </td>
                </tr>
              ))
            : // Show Actual Data when loaded
              users.map((user) => (
                <tr key={user.userid}>
                  <td>{user.username}</td>
                  <td>{user.gender}</td>
                  <td>{user.createdAt}</td>
                  <td>
                    <MDBBadge color={user.isBlocked ? "danger" : "success"}>{user.isBlocked ? "Blocked" : "Active"}</MDBBadge>
                    <MDBBadge color={user.isBanned === "yes" ? "warning" : "info"} className="ms-2">
                      {user.isBanned === "yes" ? "Banned" : "Not Banned"}
                    </MDBBadge>
                    {user.isAdmin && <MDBBadge color="primary" className="ms-2">Admin</MDBBadge>}
                  </td>
                  <td>
                    <MDBBtn color="danger" size="sm" onClick={() => toggleProperty(user.userid, "isBlocked")}>
                      {user.isBlocked ? "Unblock" : "Block"}
                    </MDBBtn>
                    <MDBBtn color="warning" size="sm" className="ms-2" onClick={() => toggleProperty(user.userid, "isBanned")}>
                      {user.isBanned === "yes" ? "Unban" : "Ban"}
                    </MDBBtn>


                    <MDBBtn color="dark" size="sm" className="ms-2" onClick={() => {
                      console.log("open notification settings")

                      sessionStorage.setItem("PopUpUser",JSON.stringify(user))
                      dispatch(setCurrentPage("/popup"))
                    }}>
                      {"Notification"}
                    </MDBBtn>



                    <MDBBtn color="primary" size="sm" className="ms-2" onClick={() => toggleProperty(user.userid, "isAdmin")}>
                      {user.isAdmin ? "Remove Admin" : "Make Admin"}
                    </MDBBtn>
                    <MDBBtn color="danger" size="sm" className="ms-2" onClick={() => deleteUser(user.userid)}>
                      delete
                    </MDBBtn>
                  </td>
                </tr>
              ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default UsersTable;
