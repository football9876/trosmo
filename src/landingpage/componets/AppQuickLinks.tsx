import { MDBBtn } from "mdb-react-ui-kit";

import { useNavigate } from "react-router-dom";

const quickLinks = [
  {name:"Academy 2023/2024",
    href:"/AcademyInfo"
  },
  {name:"Club Shop",href:"/ClubShop"},
  {name:"Grassroots Share - Support Fløy",href:"/GrassRoots"},
  {name:"Book Meeting Room",href:"/BookMeeting"},
  {name:"Volunteer Work Sør Cup",href:"/VolunteerWork"},
  {name:"Goal Club 2024",href:"/GoalClubPage"}
];


const AppQuickLinks: React.FC = () => {
  const navigate=useNavigate();
  return (
    <div className="block">
      {quickLinks.map((link, index) => (
        <MDBBtn onClick={()=>{
          navigate(link.href)
        }} color='secondary' key={index} className="quicklinkBtn" style={{ marginBottom: 6 }}>
          <a className="custom-quickLink" >
            {link.name}
          </a>
        </MDBBtn>
      ))}
    </div>
  );
};

export default AppQuickLinks;
