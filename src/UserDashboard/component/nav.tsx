
// import { MDBBtn } from 'mdb-react-ui-kit'
import ProSideBar from './ProSideBar'
import useInnerWidth from '../../funcs/useInnerWidth'
import ProfileNav from './profileNav'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/Slice'
const Nav:React.FC = () => {
    const width=useInnerWidth()
        const user=useSelector((root:{app:AppState})=>root.app.user);
    
  return (<>
    <div className={`dashboardNav d-flex align-items-center justify-content-end`}>
     {width < 700 && !user &&  <div style={{background:"var(--blue)",borderRadius:10}}>
      <img src={`/assets/NFB_logo_136.png`} style={{}}/>
      </div>}
    {user && <ProfileNav size={50}/>}

    </div>
   {width < 700 && <ProSideBar/>}
    </>
  )
}

export default Nav
