import React, { useState } from "react";
import { X, Menu as MenuIcon } from "react-feather";
import { MDBBtn } from "mdb-react-ui-kit";
import "./SideMenu.css";
import SideComponent from "./sideComponent";

const ProSideBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Toggle Button */}
      <MDBBtn color="secondary" onClick={() => setOpen(!open)} className="menu-btn">
        {open ? <X size={24} /> : <MenuIcon size={24} />}
      </MDBBtn>

      {/* Full Sliding Sidebar */}
      <div className={`side-menu  sideMenu ${open ? "open" : ""}`}>
  <SideComponent close={()=>setOpen(false)}/>
      </div>

      {/* Overlay when sidebar is open */}
      {open && <div className="overlay__" onClick={() => setOpen(false)}></div>}
    </div>
  );
};

export default ProSideBar;
