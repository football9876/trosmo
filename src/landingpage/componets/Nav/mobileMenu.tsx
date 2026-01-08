import React, { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "react-feather";
import { MenuItems } from "./menuitems";
import "./menu.css";
const MobileMenu:React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
useEffect(() => {
  if (isOpen) {
    document.body.classList.add("body-menu-open");
  } else {
    document.body.classList.remove("body-menu-open");
  }
}, [isOpen]);
  return (
    <>
      <div style={{ padding: 10 }}>
        <Menu onClick={() => setIsOpen(true)} color={"#121317"} />
      </div>

      {/* Overlay */}
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Side menu */}
      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <div className="menu-header">
          <h2>Nørresundby</h2>
          <X onClick={() => setIsOpen(false)} style={{ cursor: "pointer" }} />
        </div>
        <NestedMenu items={MenuItems} />
      </div>
    </>
  );
};

const NestedMenu = ({ items }:{items:any}) => {
  return (
    <ul>
      {items.map((item:any, index:number) => (
        <MenuItem key={index} item={item} />
      ))}
    </ul>
  );
};

const MenuItem = ({ item }:{item:any}) => {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <div className="menu-item" onClick={() => setOpen(!open)}>
        <a href={item.href}>{item.name}</a>
        {item.children?.length > 0 && (
          <ChevronDown
            className={`chevron ${open ? "rotate" : ""}`}
            size={18}
          />
        )}
      </div>

      {open && item.children?.length > 0 && (
        <ul className="submenu">
          {item.children.map((child:any, index:number) => (
            <MenuItem key={index} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MobileMenu;
