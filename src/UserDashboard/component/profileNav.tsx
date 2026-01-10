import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/Slice'
import { Avatar } from '@mui/material'
import { MDBTooltip } from 'mdb-react-ui-kit'


interface props{
    size:number
}
const ProfileNav:React.FC<props> = ({size}) => {
    const user=useSelector((root:{app:AppState})=>root.app.user);
  return (
<Avatar  style={{width:size,height:size}} src={user?.profilePic||""} />


  )
}

export default ProfileNav