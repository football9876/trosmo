import React from 'react'
import { AppState, setShowForm } from '../store/Slice'
import { useDispatch, useSelector } from 'react-redux';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Button } from '@mui/material';

const ApplicationProgress:React.FC = () => {
  const {user}=useSelector((root:{app:AppState})=>root.app);
  const dispatch=useDispatch();
  console.log(user);
  return (
    <div style={{padding:10,borderRadius:5,margin:"0 auto",background:"none"}}>
        <div style={{textAlign:"center"}}>
          {/* <img style={{height:100,borderRadius:5}} src={`/reviewing.jpeg`}/> */}
<br/><b>{user?.registrationCompleted ? "APPLICATION IN PROCESS":" Submit Application "}</b>
{!user?.registrationCompleted && <>
<br/>
<Button onClick={()=>dispatch(setShowForm(true))}color={`primary`}>
  Take me to form
</Button>

</>}
            </div>
    </div>
  )
}

export default ApplicationProgress