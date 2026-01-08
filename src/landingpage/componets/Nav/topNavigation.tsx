import { MDBBtn } from 'mdb-react-ui-kit'

import { Search } from 'react-feather'
import useInnerWidth from '../../../funcs/useInnerWidth'
import MobileMenu from './mobileMenu'
import { useNavigate } from 'react-router-dom'
const TopNavigation = () => {
  const width=useInnerWidth()
  const navigate=useNavigate()
  return (
    <div className='topNav d-flex align-items-center justify-content-between'>
      
      <div style={{background:"var(--blue)"}} className={`${width < 700  ? "d-flex":""} align-items-center justify-content-between`}>
      <div onClick={()=>{
        navigate("/")
      }} style={{background:'var(--blue)',padding:10,gap:6}} className='blue-area d-flex align-items-center '>
      <img src={`/assets/NFB_logo_136.png`} style={{}} height={50}/>
      <b style={{color:"white",fontWeight:"bold"}}>{` NørresundbyfbSports Team`}</b>
</div>

{width < 700  && <MobileMenu/>}

</div>

<div className="searchContainer d-flex align-items-center " style={{gap:10,padding:10}}>
  <input placeholder='Search' />
  <Search/>
  <MDBBtn onClick={()=>{
    navigate("/Login")
  }} color='secondary' style={{width:100}}>Login</MDBBtn>
</div>
    </div>
  )
}

export default TopNavigation
