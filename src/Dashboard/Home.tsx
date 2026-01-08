
import { File,  UserPlus, Users } from 'react-feather'
import UsersTable from './component/users'
import { useEffect, useState } from 'react';
import { docQr } from '../Logics/docQr';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../store/Slice';
import { ClipLoader } from 'react-spinners';

const Home = () => {
  const [users,setUsers]=useState<any>([]);
  const [forms,setForms]=useState<any>([]);
  const [loading,setLoading]=useState<boolean>(false);
  const dispatch=useDispatch();
  const getForms = async () => {
    try {
      setLoading(true)
      const data = await docQr("Forms", {});
      setForms(data);
    } catch (err: any) {
      console.error("Error fetching forms:", err);
    } finally {
      setLoading(false)
    }
  };

  // Fetch Users
  const getUsers = async () => {
    try {
      const usersData = await docQr("Users", {});
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      console.log("users");
    }
  };

  useEffect(() => {
    getUsers();
    getForms()
  }, []);



  return (<>

    <div style={{padding:10}}>
      <div className="actionBtns d-flex align-items-center" style={{gap:1}}>

     {loading && <div>
    <ClipLoader size={30} />
</div>}


<div>
    <Users size={30} color={"white"} /><br/>
    <span style={{color:"white"}}>Users ({users.length})</span>
</div>

<div onClick={()=>{
  dispatch(setCurrentPage("/forms"))
}}>
<File size={30} color={`white`}/><br/>

<span style={{color:"white"}}>Forms Submitted ({forms.length}) </span>
</div>
    
<div onClick={()=>{
  dispatch(setCurrentPage("/add-user"))
}}>
<UserPlus color={"white"} size={30} /><br/>

<span style={{color:"white"}}>Add User</span>
</div>
</div>


<div>

<br/>
<UsersTable/>
<br/>
</div>




    </div>
 </> )
}

export default Home
