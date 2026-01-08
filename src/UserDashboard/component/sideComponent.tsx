
import { DollarSign, Grid, Power, Settings, User, } from "react-feather"; // Feather Icons
import { MDBBtn } from "mdb-react-ui-kit";
import {useDispatch, useSelector} from 'react-redux'
import { AppState, setCurrentPage } from '../../store/Slice';
import { useNavigate } from 'react-router-dom';


const SideComponent:React.FC<{close:()=>void}> = ({close}) => {
    // const [mobileOpen,setMobileOpen]=useState<boolean>(false);
    
 const dispatch=useDispatch()
 const navigate=useNavigate();
      const menuItems = [
        // { text: "Menu", icon: <Menu size={20} />, click:()=>{

        // }},
        { text: "Dashboard", icon: <Grid size={20} />, click:()=>{
          dispatch(setCurrentPage("/dashboard"))
          close()
        }},
      
        { text: "Profile", icon: <User size={20} />, click:()=>{
          dispatch(setCurrentPage("/profile"))
          close()
        }},
        { text: "Payment", icon: <DollarSign size={20} />, click:()=>{
              dispatch(setCurrentPage("/payment"));
          close()
        }},
        { text: "Logout", icon: <Power size={20} />, click:()=>{
          window.localStorage.clear();
          window.sessionStorage.clear();
          navigate("/Login")

          close()
        }
      
      },
    
      
      ];
const user=useSelector((root:{app:AppState})=>root.app.user);

if (user?.isAdmin) {
  menuItems.splice(menuItems.length - 1, 0, {
    text: "Admin Dashboard",
    icon: <Settings size={20} />,
    click: () => {
      navigate("/AdminDashboard");
      close();
    },
  });
}

      
  return (
    <div>
       
       <div onClick={()=>{
        navigate("/")
       }} style={{background:"var(--blue)",borderRadius:10,padding:5}}>
      <img src={`/assets/NFB_logo_136.png`} style={{width:50,height:50}} />
      </div>

    {menuItems.map((e:any)=>{
        return <>
        <MDBBtn rounded onClick={e.click} style={{background:"#fff6ff"}} className="sideMenuItem" color={'secondary'}><div>{e.icon}</div> {e.text}</MDBBtn>
        </>
    })}
</div>
  )
}

export default SideComponent
