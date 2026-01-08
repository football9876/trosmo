import { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import CreateMatch, { MatchItem } from "./CreateMatchs";
import { docQr } from "../../Logics/docQr";
import { updateData } from "../../Logics/updateData";
import { deleteData } from "../../Logics/deleteData";
import "./MatchManager.css";
import LastMatchForm from "./LastMatchForm";
import { AddData } from "../../Logics/addData";
import { collection } from "firebase/firestore";
import { db } from "../../firebase.config";
import moment from "moment";

const MatchesManager = () => {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editingMatch, setEditingMatch] = useState<MatchItem | undefined>();
  const [lastMatch,setLastMatch]=useState<MatchItem | undefined>();
  const [loading,setLoading]=useState<boolean>(false);
  const fetchResults = async () => {
    try {
      setLoading(true);
      const matches = await docQr("Matches");
      const l = await docQr("LastMatch");
      setLastMatch(l[0]);
  const orderedMatches = [...matches].sort((a, b) => {
  // parse dates (if they're strings) into timestamps
  const dateA = new Date(a.matchDate).getTime();
  const dateB = new Date(b.matchDate).getTime();
  // for descending order: newer (b) first
  return dateB - dateA;
});

setMatches(orderedMatches);
    } catch (err: any) {
      toast.error(err.message);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };



  const handleSave = async (newMatch: MatchItem) => {
    let toastId;
    try {
      toastId = toast.loading("Updating...");
      setMatches((prev) => {
        if (newMatch.docId && prev.find((m) => m.docId === newMatch.docId)) {
          // Update existing
          return prev.map((m) => (m.docId === newMatch.docId ? newMatch : m));
        }
        // Add new
        return [...prev, { ...newMatch, docId: uuidv4() }];
      });
      setModalOpen(false);
      setEditingMatch(undefined);

      await updateData("Matches", newMatch?.docId || "", { ...newMatch });
      toast.success(newMatch.docId ? "Match updated!" : "New match created!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      if (toastId) toast.dismiss(toastId);
    }
  };
const [showEditLastMatchModal,setShowEditLastMatchModal]=useState<boolean>(false);
  const handleSaveLastMatch = async (newDATa: MatchItem) => {
try{

  if(lastMatch?.docId){
await updateData("LastMatch",lastMatch?.docId||"",{
  ...newDATa
})
setLastMatch({...newDATa})
  }
  else{
    const id=await AddData(collection(db,"LastMatch"),{
      ...newDATa
    });
 if(typeof id=="string") setLastMatch({...newDATa,docId:id as string});

  }
toast.success("Last match update successfully");
setShowEditLastMatchModal(false);
}
catch(err:any){
toast.error(err.message);
}
finally{

}


  }


useEffect(()=>{
fetchResults();
},[]);
console.log(lastMatch)
  return (
    <>
<br/>

{loading && "Loading content..."}
<div style={{padding:10,background:"white",borderRadius:10}}>
 {lastMatch ? <MDBCard
            key={lastMatch?.docId}
            className={lastMatch?.backgroundImage ? "has-bg" : ""}
            style={{
              minWidth: "300px",
              maxWidth: "400px",
              position: "relative",
              backgroundImage: `url(${lastMatch?.backgroundImage})`,
              backgroundColor: "white",
            }}
          >
            <MDBCardBody>
              <h5 style={{textAlign:"center"}}>
                {lastMatch?.homeScore} - {lastMatch?.awayScore}
              </h5>
              <div className="d-flex align-items-center justify-content-center" style={{gap:10}}>
              <img  src={lastMatch?.homeLogo as string} style={{width:30,height:30,borderRadius:3}}/>
              <span>VS</span>
              <img src={lastMatch?.awayLogo as string}  style={{width:30,height:30,borderRadius:3}}/>
</div>
<br/>
            
              {/* <p style={{ fontSize: "12px" }}>{lastMatch?.venue}</p> */}
              {/* <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                {match.homeScore ?? "-"} - {match.awayScore ?? "-"}
              </p> */}
              <div className="d-flex justify-content-center">
              <MDBBtn
                size="sm"
                color="secondary"
                className="isMatch"
                rounded
                onClick={() => {
                  setShowEditLastMatchModal(true);
                }}
              >
                Edit last match
              </MDBBtn>
</div>

            </MDBCardBody>
          </MDBCard>:<MDBBtn onClick={()=>{
            setShowEditLastMatchModal(true);
          }} color="dark">Add last match</MDBBtn>}
</div>

<br/>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: 20 }}>
        {matches.map((match) => (
          <MDBCard
            key={match.docId}
            className={match?.backgroundImage ? "has-bg" : ""}
            style={{
              minWidth: "300px",
              maxWidth: "400px",
              position: "relative",
              backgroundImage: `url(${match?.backgroundImage})`,
              backgroundColor: "white",
            }}
          >
            <MDBCardBody>
              <h5>
                {match.homeTeam} vs {match.awayTeam}
              </h5>
              <div className="d-flex align-items-center" style={{gap:10}}>
              <img  src={match?.homeLogo as string} style={{width:30,height:30,borderRadius:3}}/>
              <span>VS</span>
              <img src={match?.awayLogo as string}  style={{width:30,height:30,borderRadius:3}}/>
</div>
<br/>
              <p style={{ fontSize: "12px",fontWeight:"bold" }}>
                {match.day} {match.weekday}, {match.time}
              </p>
              <p style={{ fontSize: "12px" }}>{match.venue}</p>
              <h4>
  {`${moment(match.matchDate).format('MMMM').toUpperCase()} ${moment(match.matchDate).format('Do YYYY')}`}
</h4>
              {/* <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                {match.homeScore ?? "-"} - {match.awayScore ?? "-"}
              </p> */}
              <MDBBtn
                size="sm"
                color="primary"
                onClick={() => {
                  setEditingMatch(match);
                  setModalOpen(true);
                }}
              >
                Edit
              </MDBBtn>
              <MDBBtn
                style={{ marginLeft: 5 }}
                color="danger"
                size="sm"
                onClick={async () => {
                  let toastId;
                  try {
                    toastId = toast.loading("Deleting match...");
                    await deleteData("Matches", match.docId || "");
                    fetchResults();
                    toast.success("Deleted successfully");
                  } catch (err: any) {
                    toast.error(err.message);
                  } finally {
                    if (toastId) toast.dismiss(toastId);
                  }
                }}
              >
                Delete
              </MDBBtn>

               {/* <MDBBtn
                style={{ marginLeft: 5,border:match?.isLastMatch ? "1px solid #1f1d1d":"",background:"white",borderRadius:20,color:"black" }}
                color="danger"
                size="sm"
                className={match?.backgroundImage?"isMatch":""}
                onClick={async () => {
                  let toastId;
                  try {
                    if(!match?.backgroundImage)return toast.error("Last Match most have background image");
                    toastId = toast.loading("Marking as last match...");
                    await updateData("Matches", match.docId || "",{
                      ...match,
                      isLastMatch:true
                    });

                    //find the last match the is marked and update it as false
const prev=matches.find((e)=>e.isLastMatch);
if(prev?.docId){
  console.log(prev);
                    await updateData("Matches", prev?.docId || "",{
                      ...prev,
                      isLastMatch:false
                    });
                  }

                    fetchResults();
                    toast.success("Matched as last match successfully");
                  } catch (err: any) {
                    toast.error(err.message);
                  } finally {
                    if (toastId) toast.dismiss(toastId);
                  }
                }}
              >
               <span style={{color:"black"}}>{match?.isLastMatch ? "Current last match":"Mark as last match"}</span>
              </MDBBtn> */}

            </MDBCardBody>
          </MDBCard>
        ))}
      </div>

      <MDBBtn
        onClick={() => {
          setEditingMatch(undefined);
          setModalOpen(true);
        }}
      >
        Create New Match
      </MDBBtn>

      <MDBModal open={modalOpen} onClose={() => setModalOpen(false)} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{editingMatch ? "Edit Match" : "Create New Match"}</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setModalOpen(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <CreateMatch onSave={handleSave} editData={editingMatch} />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setModalOpen(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    
    


      <MDBModal open={showEditLastMatchModal} onClose={() => setShowEditLastMatchModal(false)} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{ "Last match details"}</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() =>setShowEditLastMatchModal(false)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <LastMatchForm onSave={handleSaveLastMatch} editData={lastMatch} />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setShowEditLastMatchModal(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    

    </>
  );
};

export default MatchesManager;
