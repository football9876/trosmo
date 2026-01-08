
import "./blog.css";
import Others from '../Others';
import News from "./news";
import SlideElement2 from "./slideElement2";
import TipsdystenBanner from "./TipsdystenBanner";
import MatchSchedule from "./MatchResult";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { useState } from "react";
// import ProgressBlue from "../progressBlue";
const Responsive:React.FC<{left?:any}> = ({left}) => {
   const [listType, setListType] = useState<"next" | "prev">("next");
  // const {blogs,loading}=useBlogs();
  return (
    <div className="responsive-container flex">

     <div style={{flexGrow:"1"}}> 
  
     
      <div className={`blogs`} >
         <h3 style={{fontWeight:"bold",color:"#151421",padding:0}}>News</h3>
        {left || <>
   <News/>
   <br/>
 <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
      

        <MDBDropdown>
          <MDBDropdownToggle tag={"div"} caret color="link">
            {<b style={{ fontWeight: "bold",fontSize:19, color: "#151421", marginRight: 24 }}>
          {listType === "next" ? "Next Matches" : "Previous Matches"}
        </b>}
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem link onClick={() => setListType("next")}>
              Next Matches
            </MDBDropdownItem>
            <MDBDropdownItem link onClick={() => setListType("prev")}>
              Previous Matches
            </MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>


   <MatchSchedule list={listType}/>
<br/>
   <SlideElement2/>
   <br/>
   <TipsdystenBanner/>
   </>}
        </div>

</div>




        <div className={`others`} style={{padding:10,minWidth:"400px"}}>
         <Others/>
        </div>

    </div>
  )
}


export default Responsive
