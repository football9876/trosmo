import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import CollectDetails from './collectDetails';
import SuccessConfirmation from './CollectionSuccessMessage';
import { AppState, setShowForm } from '../store/Slice';
import { useDispatch, useSelector } from 'react-redux';

const DetailsModal:React.FC=()=>{
   const {user,showForm}=useSelector((root:{app:AppState})=>root.app)
    const [basicModal, setBasicModal] = useState(!user?.registrationCompleted);

    const toggleOpen = () => setBasicModal(!basicModal);
    const [success,setSuccess]=useState<boolean>(false);

    useEffect(()=>{
      if(showForm)setBasicModal(showForm)
    },[showForm]);

    const dispatch=useDispatch();

    useEffect(()=>{
if(!basicModal){
  dispatch(setShowForm(basicModal ? true:false));
  console.log("should close on useEffect")
}
    },[basicModal]);
return (<>
      <MDBModal open={basicModal} onClose={() => {
        setBasicModal(false)
        dispatch(setShowForm(false));
        console.log("application form should show")
      }} tabIndex='-1' >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>TRIAL APPLICATION </MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
               {success? <SuccessConfirmation onMakePayment={()=>setBasicModal(false)}/>:<CollectDetails onSuccess={()=>setSuccess(true)}/>}
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={()=>{
if(success){
  setBasicModal(false)
}
else{
  setTimeout(()=>{
setBasicModal(true);
  },60*60*2);//2mins
}
              }}>
                

                {success ? "Finish":"Remind me later"}
              </MDBBtn>
              {/* <MDBBtn>Save changes</MDBBtn> */}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      </>)
}

export default DetailsModal;