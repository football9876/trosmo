
import { Menu, MenuItem, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css"; // Default styles
import { MDBBtn } from "mdb-react-ui-kit";
import { ChevronDown } from "react-feather";
import { MenuItems } from "./menuitems";
import { useNavigate } from "react-router-dom";

// Sample Menu Data
const menuData = MenuItems;

const RecursiveMenu = ({ items }: { items: any[] }) => {
  const route = useNavigate();

  return (
    <>
      {items.map((item, index) =>
        item.children?.length ? (
          <SubMenu key={index} label={item.name}>
            <RecursiveMenu items={item.children} />
          </SubMenu>
        ) : (
          <MenuItem key={index} onClick={() => {
route(item.href);
          }}>
           <span style={{fontWeight:"bold",fontSize:16}}> {item.name}</span>
          </MenuItem>
        )
      )}
    </>
  );
};

const NestedMenu: React.FC = () => {
  const route=useNavigate();
  return (
    <div className="pcNavigation flex flex-col space-y-4 p-4">
      {menuData.map((item, index) => (
        <Menu
          key={index}
          menuButton={
            <MDBBtn onClick={()=>route(item.href)} color="white" rounded>
              <span style={{fontWeight:"bold",fontSize:16}}>  {item.name} </span>
              
              {item?.children.length > 0 && <ChevronDown size={14} />}
            </MDBBtn>
          }
        >
          <RecursiveMenu items={item.children} />
        </Menu>
      ))}
    </div>
  );
};

export default NestedMenu;
