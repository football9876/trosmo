
import {  Settings, Grid, Users, UserPlus, FolderMinus, Book, Image } from "react-feather"; // Feather Icons
import { MDBBtn } from "mdb-react-ui-kit";
import {useDispatch} from 'react-redux'
import { setCurrentPage } from '../../store/Slice';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const SideComponent:React.FC<{close:()=>void}> = ({close}) => {
    // const [mobileOpen,setMobileOpen]=useState<boolean>(false);
 const dispatch=useDispatch()
      const menuItems = [
        // { text: "Menu", icon: <Menu size={20} />, click:()=>{

        // }},
        { text: "Dashboard", icon: <Grid size={20} />, click:()=>{
          dispatch(setCurrentPage("/dashboard"))
          close()
        }},
        { text: "Forms Submitted", icon: <FolderMinus size={20} />, click:()=>{
          dispatch(setCurrentPage("/forms"))
          close()
        }},
        { text: "Users", icon: <Users size={20} />, click:()=>{
          dispatch(setCurrentPage("/users"));
          close()

        } },
        { text: "Add User", icon: <UserPlus size={20} />, click:()=>{
          dispatch(setCurrentPage("/add-user"))
          close()

        } },
        { text: "Blogs", icon: <Book size={20} />, click:()=>{
          dispatch(setCurrentPage("/blogs"))
          close()
        } },
        // { text: "Gallery", icon: <Image size={20} />, click:()=>{
        //   dispatch(setCurrentPage("/Gellery"))
        //   close()
        // } },
        
        //  { text: "Matches", icon: <Image size={20} />, click:()=>{
        //   dispatch(setCurrentPage("/Matches"))
        //   close()
        // } },
        {
          text:"Videos",
          icon:<Image size={20}/>,
          click:()=>{
            dispatch(setCurrentPage("/Videos"))
            close()
          }
        },
            { text: "Manage Products", icon: <Image size={20} />, click:()=>{
          dispatch(setCurrentPage("/Products"))
          close()
        } },
             { text: "Products", icon: <Image size={20} />, click:()=>{
          dispatch(setCurrentPage("/ListProducts"));
          close()
        } },
        { text: "Settings", icon: <Settings size={20} />, click:()=>{
          dispatch(setCurrentPage("/settings"))
          close()

        } },
      
      ];
      // const width=useInnerWidth()

       const navigate=useNavigate();
  return (
    <div>
       <div style={{background:"var(--blue)",borderRadius:10,padding:5}} onClick={()=>{
navigate("/")
       }}>
      <img className="app-icon"  src={`/icon.png`} style={{width:50,height:50}} />
      </div>
    {menuItems.map((e:any)=>{
        return <>
        <Button className="sideMenuItem" onClick={e.click} style={{background:"#fff6f6ff"}} color={'secondary'}><div>{e.icon}</div> {e.text}</Button>
        </>
    })}
</div>
  )
}

export default SideComponent
