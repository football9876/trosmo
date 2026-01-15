
import {MDBBtn} from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/Slice";
import { Button } from "@mui/material";

interface props{
  onMakePayment:()=>void
}

const SuccessConfirmation: React.FC<props> = ({onMakePayment}) => {

  const dispatch=useDispatch();
  return (
   <div style={{width:"100%",padding:16}}>
    <div className="flex items-center justify-center">
          <img src={`/checked.png`} style={{width:100,height:100,borderRadius:50}}/>
          </div>
        <p style={{textAlign:"center",fontSize:16}}><strong>You have successfully submitted your application.</strong></p>
       
        <div style={{padding:10,boxShadow:"1px 1px 10px 0px lightgray",borderRadius:10}}>
     
        <p>Acknowledgement slip will be sent to you within <strong>72 hours of payment</strong>.</p>
        <p><strong>(Without the acknowledgment slip, invitation will not be entertained)</strong></p>
        <p>Present it as evidence of payment and approval.</p>
        </div>
        <hr />

        <p><strong>Note:</strong> If you are picked to play with our squad in a competition during the course of your trial with <strong> TROMSO IL</strong>, you are <strong>not entitled</strong> to full player benefits and allowance.</p>

        <Button color="primary" style={{ width: "100%", marginTop: "10px",background:"var(--blue)" }} onClick={() => {
        dispatch(setCurrentPage("/payment"))
        onMakePayment()
        }}>
          CLICK HERE TO MAKE PAYMENT
        </Button>
      </div>
  );
};

export default SuccessConfirmation;
