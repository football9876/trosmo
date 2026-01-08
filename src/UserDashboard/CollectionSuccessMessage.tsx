
import {MDBBtn} from "mdb-react-ui-kit";



const SuccessConfirmation: React.FC = () => {
  return (
   <div style={{width:"100%",padding:16}}>
    <div className="d-flex align-items-center justify-content-center">
          <img src={`/checked.png`} style={{width:100,height:100,borderRadius:50}}/>
          </div>
        <p style={{textAlign:"center",fontSize:16}}><strong style={{textTransform:"uppercase"}}>
          YOU HAVE SUCCESSFULLY SUBMITTED YOUR APPLICATION.</strong></p>  
        <div style={{padding:10,boxShadow:"1px 1px 10px 0px lightgray",borderRadius:10}}>
     
        <p>Acknowledgement slip will be sent to you within <strong>72 hours of payment</strong>.</p>
        <p><strong>(Without the acknowledgment slip, invitation will not be entertained)</strong></p>
        <p>Present it as evidence of payment and approval.</p>
        </div>
        <hr />

        <p><strong>Note:</strong> If you are picked to play with our squad in a competition during the course of your trial with <strong> Nørresundbyfb </strong>, you are <strong>not entitled</strong> to full player benefits and allowance.</p>

        <MDBBtn rounded color="primary" style={{ width: "100%", marginTop: "10px",background:"var(--blue)" }} onClick={() => window.open("https://payment-link.com", "_blank")}>
          CLICK HERE TO MAKE PAYMENT
        </MDBBtn>
      </div>
  );
};

export default SuccessConfirmation;
