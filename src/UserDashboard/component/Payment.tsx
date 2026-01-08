import 'react-credit-cards-2/dist/es/styles-compiled.css';
import {  useState } from 'react';
import Cards from 'react-credit-cards-2';
import "./style.css";
import {MDBInput,MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem} from 'mdb-react-ui-kit';
import {PulseLoader} from 'react-spinners';
import {toast,Toaster} from 'react-hot-toast';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';
import { updateData } from '../../Logics/updateData';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, setUser } from '../../store/Slice';
// import {useNavigate} from 'react-router-dom';
// import { AppState } from '../../store/Slice';
// import { useSelector } from 'react-redux';
const PaymentForm = () => {
  // const {user}=useSelector((root:{app:AppState})=>root.app);
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [focus, setFocus] = useState('');
  const [name, setName] = useState('');
  // const navigate=useNavigate();
  const [number, setNumber] = useState('');

 

  const handleInputFocus = (e:any) => {
    setFocus(e.target.name);
  };
        const [openAlert,setOpenAlert]=useState(false);
            const [isLoading,setIsLoading]=useState(false);


            const validateCreditCard = (number:any, name:any, expiry:any, cvc:any) => {
                // Check if any field is empty
                console.log(number,name,expiry,cvc)
                if (!number || !name || !expiry || !cvc) {
                  toast.error('All fields are required');
                  return false;
                }
              
                // Validate card number (check if it's a number with 16 digits)
                if (!/^\d{16}$/.test(number)) {
                  toast.error('Invalid card number');
                  return false;
                }
              
                // Validate expiry (check if it's in MM/YY format)
                if (expiry.length < 4) {
                  toast.error('Invalid expiry date');
                  console.log(expiry.length);
                  return false;
                }
              
                // Validate CVC (check if it's a number with 3 digits)
                if (!/^\d{3}$/.test(cvc)) {
                  toast.error('Invalid CVC');
                  return false;
                }
              
                return true; // All fields are valid
              };

  const {user}=useSelector((root:{app:AppState})=>root.app);
const dispatch=useDispatch();

const submitCard=async ()=>{
    if(!validateCreditCard(number, name, expiry, cvc))return;

    setIsLoading(true);

if(user){
   await updateData("Users",user?.docId as string,{...user,registrationCompleted:true});
   window.localStorage.setItem("User",JSON.stringify({...user,registrationCompleted:true}));
  dispatch(setUser({...user,registrationCompleted:true}));
}

    setTimeout(()=>{
setIsLoading(false)
          // toast.error("No payment available for now, please try again later")
setOpenAlert(true);
    },Math.floor(Math.random()*5000)+1000)
}
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    switch (name) {
      case 'cvc':
        setCvc(value);
        break;
      case 'expiry':
        setExpiry(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const [currency,setCurrency]=useState<string>("USD")
  return (
    <>
      <MDBModal open={openAlert} setOpen={setOpenAlert} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Payment</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>setOpenAlert(!openAlert)}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <div style={{textAlign:"center"}}>
  <img style={{width:100,height:100,borderRadius:50}} src='/declinedCard.jpeg' alt='' />
  <br/>
  <h5 style={{ textAlign: 'center', marginTop: '10px' }}>PAYMENT UNAVAILABLE</h5>
  <p style={{ textAlign: 'center', marginTop: '10px' }}>Payment is currently not available in your country at this time, please contact your local agent to make payment through our PIS portal. <a href='mailto:support@tromsoil.com '>support@tromsoil.com </a> for quick support.</p>
   </div>

</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={()=>setOpenAlert(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
<Toaster/>
<div className='paymentContainer'>
     <div id="PaymentForm">
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focus as "name"}
          name={name}
          number={number}
        />
        
        <div className='inputHolder'>
         
          <MDBInput
            type="tel"
            name="number"
            label="Card Number"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />


<MDBInput
            type="text"
            name="name"
            label="Cardholder Name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            style={{marginTop:5}}
          />
          
<div className='flex justify-content-between' style={{marginTop:5,gap:5}}>
          <MDBInput
            type="number"
            name="expiry"
            label="Expiry Date"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />

<MDBInput
            type="number"
            name="cvc"
            label="CVC Name"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          </div>
<div className='flex justify-content-between' style={{marginTop:5,gap:5}}>
          
<MDBInput
            type="number"
            name="Amount"
            label="Amount"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            style={{marginTop:5}}
          />



<MDBDropdown>
      <MDBDropdownToggle id="noBefore" tag={`div`}>

      <MDBInput
            name="Current"
            label="Currency"
            value={currency}
          />
      </MDBDropdownToggle>
      
      <MDBDropdownMenu>
        <MDBDropdownItem onClick={()=>setCurrency("USD")} link> USD</MDBDropdownItem>
        <MDBDropdownItem onClick={()=>setCurrency("EUR")} link>EUR</MDBDropdownItem>
        <MDBDropdownItem onClick={()=>setCurrency("GBP")} link>GBP</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>


          </div>
<br/><br/>
          <MDBBtn color={'dark'} onClick={()=>{
            submitCard();
          }} style={{width:"100%",marginTop:5,borderRadius:"30px"}}>
            {isLoading ? <PulseLoader color="white"/>: "Process Request"}</MDBBtn>
        </div> 
      </div>
      </div>
    </>
  );
};

export default PaymentForm;
