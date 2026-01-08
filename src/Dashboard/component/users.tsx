import React, { useEffect, useState } from "react";
import { User } from "../../interface";
import { docQr } from "../../Logics/docQr";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import toast from "react-hot-toast";
import { deleteData } from "../../Logics/deleteData";
import { setCurrentPage } from "../../store/Slice";
import { useDispatch } from "react-redux";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Chip,
  Skeleton,
  Stack,
} from "@mui/material";






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
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Username</b></TableCell>
            <TableCell><b>Gender</b></TableCell>
            <TableCell><b>Created At</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading
            ? [...Array(6)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton variant="rectangular" width={100} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rectangular" width={70} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rectangular" width={90} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rectangular" width={120} height={20} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rectangular" width={150} height={30} />
                  </TableCell>
                </TableRow>
              ))
            : users.map((user) => (
                <TableRow key={user.userid}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={user.isBlocked ? "Blocked" : "Active"}
                        color={user.isBlocked ? "error" : "success"}
                        size="small"
                      />
                      <Chip
                        label={user.isBanned === "yes" ? "Banned" : "Not Banned"}
                        color={user.isBanned === "yes" ? "warning" : "info"}
                        size="small"
                      />
                      {user.isAdmin && (
                        <Chip label="Admin" color="primary" size="small" />
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() =>
                          toggleProperty(user.userid, "isBlocked")
                        }
                      >
                        {user.isBlocked ? "Unblock" : "Block"}
                      </Button>

                      <Button
                        size="small"
                        color="warning"
                        variant="contained"
                        onClick={() =>
                          toggleProperty(user.userid, "isBanned")
                        }
                      >
                        {user.isBanned === "yes" ? "Unban" : "Ban"}
                      </Button>


                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={() =>
                          toggleProperty(user.userid, "isAdmin")
                        }
                      >
                        {user.isAdmin ? "Remove Admin" : "Make Admin"}
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={() => deleteUser(user.userid)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  );
};

export default UsersTable;
