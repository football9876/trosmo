
// import { MDBBtn } from 'mdb-react-ui-kit'
import ProSideBar from './ProSideBar'
import useInnerWidth from '../../funcs/useInnerWidth'
const Nav:React.FC = () => {
    const width=useInnerWidth()
  return (<>
    <div className={`dashboardNav d-flex align-items-center justify-content-end`}>
     {width < 700 &&  <div style={{background:"var(--blue)",borderRadius:10}}>
      <img src={`/assets/NFB_logo_136.png`} style={{}}/>
      </div>}

    
    </div>
   {width < 700 && <ProSideBar/>}
    </>
  )
}

export default Nav
