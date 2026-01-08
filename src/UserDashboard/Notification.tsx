import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import { AppState } from '../store/Slice';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { docQr } from '../Logics/docQr';
import { User } from '../interface';
import { updateData } from '../Logics/updateData';


interface PopUp {
    title: string;
    text: string;
    icon: string; // URI
    read: string;
    readAt: string;
    docId?: string; // Firestore document ID
}

const NotificationModal: React.FC = () => {
    const { user } = useSelector((root: { app: AppState }) => root.app);
    const [basicModal, setBasicModal] = useState(false);
    const [popUpData, setPopUpData] = useState<PopUp | null>(null);

    const toggleOpen = () => setBasicModal(!basicModal);

    const getPopUpMessage = async (user: User) => {
        console.log("getting message...")
        try {
            const res = await docQr("PopUps", {
                max: 1,
                whereClauses: [
                    {
                        field: "userId",
                        operator: "==",
                        value: user?.userid || ""
                    }
                ]
            });

            if (res?.[0]) {
                console.log("found popup data")
                setPopUpData(res?.[0]);
            }
            console.log(res);
        } catch (err: any) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (user) {
            getPopUpMessage(user);
        }
    }, [user]);

    const handleOkayClick = async () => {
        if (popUpData && popUpData.docId) {
            try {
                setBasicModal(false); // Hide modal
                await updateData("PopUps", popUpData.docId, {
                    read: "yes",
                    readAt: new Date().toISOString()
                });
console.log("operation successful")
            } catch (error) {
                console.error("Failed to update read status:", error);
            }
        }
    };

    useEffect(()=>{
       if(popUpData && !popUpData?.read)setBasicModal(true)
    },[popUpData])

    return (
        <>
            <MDBModal open={basicModal} onClose={() => {
                setBasicModal(false);
                console.log("application form should show");
            }} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            {/* <MDBModalTitle>TRIAL APPLICATION</MDBModalTitle> */}
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            {popUpData ? (
                                <>

{popUpData.icon && <div className={`flex justify-center`}><img src={popUpData.icon}  alt="Notification Icon" style={{width:100,height:100, objectFit: "contain" }} /></div>}
                                    <h5 style={{textAlign:"center"}}>{popUpData.title}</h5>
                                    <p style={{textAlign:"center"}}>{popUpData.text}</p>
                                  
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='dark' onClick={handleOkayClick}>
                                Okay
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
};

export default NotificationModal;
