import { useEffect, useState } from "react";
import { docQr } from "../../Logics/docQr";
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBAccordion,
  MDBAccordionItem,
} from "mdb-react-ui-kit";
import useInnerWidth from "../../funcs/useInnerWidth";
import toast from "react-hot-toast";
import { deleteData } from "../../Logics/deleteData";

interface FormFile {
  name: string;
  extension: string;
  uri: string;
  type: string;
}

interface FormDataType {
  docId: string;
  fullName: string;
  nationality: string;
  dateOfBirth: string;
  passportNumber: string;
  countryOfResidence: string;
  whatsappNumber: string;
  email: string;
  invitationCode: string;
  legacyName: string;
  primaryPosition: string;
  secondaryPosition: string;
  preferredFoot: string;
  currentClub: string;
  currentLeague?: string;
  contractDuration?: string;
  underAgent: string;
  agentName?: string;
  height: string;
  weight: string;
  shoeSize: string;
  jerseySize: string;
  injuries: string;
  fullyFit: string;
  validVisa: string;
  euPassport: string;
  dietaryRestrictions: string;
  dietaryDetails: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  needAirportPickup: string;
  declaration: boolean;
  signature: string;
  submissionDate: string;
  passportDataPageUrl?:string;
  bioDataUrl?: string;
  sponsorshipFormUrl?: string;
  ownerUid?: string;
}

const SubmittedForms = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [forms, setForms] = useState<FormDataType[]>([]);
  const width = useInnerWidth();
  const isDesktop = width >= 768;

  const getForms = async () => {
    try {
      setLoading(true);
      const data = await docQr("Forms", {});
      setForms(data);
    } catch (err: any) {
      console.error("Error fetching forms:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteForm = async (form: FormDataType) => {
    let toastId: any;
    try {
      toastId = toast.loading("Deleting data");
      await deleteData("Forms", form.docId);
      setForms((prev) => prev.filter((f) => f.docId !== form.docId));
      toast.success("Deleted successfully");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    getForms();
  }, []);

  const downloadFile = (file: FormFile| string) => {
    const link = document.createElement("a");
    link.href = typeof file === 'string' ? file:file.uri;
    link.download = typeof file==="string" ? "file": file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
console.log(forms)
  return (
    <div className="submitted-forms-container">
      <h3>Submitted Forms</h3>
      {loading ? (
        <p>Loading...</p>
      ) : forms.length === 0 ? (
        <p>No forms submitted yet.</p>
      ) : isDesktop ? (
        <div className="table-responsive">
          <MDBTable striped hover responsive>
            <MDBTableHead>
              <tr>
                <th>Name</th>
                <th>Nationality</th>
                <th>DOB</th>
                <th>Passport</th>
                <th>Country</th>
                <th>WhatsApp</th>
                <th>Email</th>
                <th>Invitation Code</th>
                <th>Legacy Name</th>
                <th>Primary Pos</th>
                <th>Secondary Pos</th>
                <th>Preferred Foot</th>
                <th>Current Club</th>
                <th>Current League</th>
                <th>Contract Duration</th>
                <th>Under Agent</th>
                <th>Agent Name</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Shoe Size</th>
                <th>Jersey Size</th>
                <th>Injuries</th>
                <th>Fully Fit</th>
                <th>Valid Visa</th>
                <th>EU Passport</th>
                <th>Dietary Restrictions</th>
                <th>Dietary Details</th>
                <th>Emergency Contact</th>
                <th>Need Pickup</th>
                <th>Declaration</th>
                <th>Signature</th>
                <th>Submission Date</th>
                <th>Files</th>
                <th>Action</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {forms.map((form) => (
                <tr key={form.docId}>
                  <td>{form.fullName}</td>
                  <td>{form.nationality}</td>
                  <td>{form.dateOfBirth}</td>
                  <td>{form.passportNumber}</td>
                  <td>{form.countryOfResidence}</td>
                  <td>{form.whatsappNumber}</td>
                  <td>{form.email}</td>
                  <td>{form.invitationCode}</td>
                  <td>{form.legacyName}</td>
                  <td>{form.primaryPosition}</td>
                  <td>{form.secondaryPosition}</td>
                  <td>{form.preferredFoot}</td>
                  <td>{form.currentClub}</td>
                  <td>{form.currentLeague}</td>
                  <td>{form.contractDuration}</td>
                  <td>{form.underAgent}</td>
                  <td>{form.agentName}</td>
                  <td>{form.height}</td>
                  <td>{form.weight}</td>
                  <td>{form.shoeSize}</td>
                  <td>{form.jerseySize}</td>
                  <td>{form.injuries}</td>
                  <td>{form.fullyFit}</td>
                  <td>{form.validVisa}</td>
                  <td>{form.euPassport}</td>
                  <td>{form.dietaryRestrictions}</td>
                  <td>{form.dietaryDetails}</td>
                  <td>
                    {form.emergencyContactName} (
                    {form.emergencyContactRelation}, {form.emergencyContactPhone})
                  </td>
                  <td>{form.needAirportPickup}</td>
                  <td>{form.declaration ? "Yes" : "No"}</td>
                  <td>{form.signature}</td>
                  <td>{form.submissionDate}</td>
                  <td>
                    <>
                    {form.passportDataPageUrl && (
                      <MDBBtn
                        size="sm"
                        color="primary"
                        onClick={() => downloadFile(form?.passportDataPageUrl as string)}
                        className="me-1 mb-1"
                      >
                        Passport
                      </MDBBtn>
                    )}
                    {form.bioDataUrl && (
                      <MDBBtn
                        size="sm"
                        color="info"
                        onClick={() => downloadFile(form?.bioDataUrl as string)}
                        className="me-1 mb-1"
                      >
                        Bio
                      </MDBBtn>
                    )}
                    {form.sponsorshipFormUrl && (
                      <MDBBtn
                        size="sm"
                        color="success"
                        onClick={() => downloadFile(form?.sponsorshipFormUrl as string)}
                        className="mb-1"
                      >
                        Sponsor
                      </MDBBtn>
                    )}
                    </>
                  </td>
                  <td>
                    <MDBBtn
                      size="sm"
                      color="danger"
                      onClick={() => deleteForm(form)}
                    >
                      Delete
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      ) : (
        <MDBAccordion>
          {forms.map((form, i) => (
            <MDBAccordionItem
              key={form.docId}
              collapseId={(`${i}` as number | string) as number}
              headerTitle={form.fullName}
            >
              <div className="p-3">
                <p><strong>Nationality:</strong> {form.nationality}</p>
                <p><strong>Date of Birth:</strong> {form.dateOfBirth}</p>
                <p><strong>Passport Number:</strong> {form.passportNumber}</p>
                <p><strong>Country of Residence:</strong> {form.countryOfResidence}</p>
                <p><strong>WhatsApp:</strong> {form.whatsappNumber}</p>
                <p><strong>Email:</strong> {form.email}</p>
                <p><strong>Invitation Code:</strong> {form.invitationCode}</p>
                <p><strong>Legacy Name:</strong> {form.legacyName}</p>
                <p><strong>Primary Position:</strong> {form.primaryPosition}</p>
                <p><strong>Secondary Position:</strong> {form.secondaryPosition}</p>
                <p><strong>Preferred Foot:</strong> {form.preferredFoot}</p>
                <p><strong>Current Club:</strong> {form.currentClub}</p>
                <p><strong>Current League:</strong> {form.currentLeague}</p>
                <p><strong>Contract Duration:</strong> {form.contractDuration}</p>
                <p><strong>Under Agent:</strong> {form.underAgent}</p>
                <p><strong>Agent Name:</strong> {form.agentName}</p>
                <p><strong>Height:</strong> {form.height}</p>
                <p><strong>Weight:</strong> {form.weight}</p>
                <p><strong>Shoe Size:</strong> {form.shoeSize}</p>
                <p><strong>Jersey Size:</strong> {form.jerseySize}</p>
                <p><strong>Injuries:</strong> {form.injuries}</p>
                <p><strong>Fully Fit:</strong> {form.fullyFit}</p>
                <p><strong>Valid Visa:</strong> {form.validVisa}</p>
                <p><strong>EU Passport:</strong> {form.euPassport}</p>
                <p><strong>Dietary Restrictions:</strong> {form.dietaryRestrictions}</p>
                <p><strong>Dietary Details:</strong> {form.dietaryDetails}</p>
                <p><strong>Emergency Contact:</strong> {form.emergencyContactName} ({form.emergencyContactRelation}, {form.emergencyContactPhone})</p>
                <p><strong>Need Airport Pickup:</strong> {form.needAirportPickup}</p>
                <p><strong>Declaration:</strong> {form.declaration ? "Yes" : "No"}</p>
                <p><strong>Signature:</strong> {form.signature}</p>
                <p><strong>Submission Date:</strong> {form.submissionDate}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {form.passportDataPageUrl && (
                    <MDBBtn size="sm" color="primary" onClick={() => downloadFile(form?.passportDataPageUrl as string)}>
                      Passport
                    </MDBBtn>
                  )}
                  {form.bioDataUrl && (
                    <MDBBtn size="sm" color="info" onClick={() => downloadFile(form?.bioDataUrl as string)}>
                      Bio
                    </MDBBtn>
                  )}
                  {form.sponsorshipFormUrl && (
                    <MDBBtn size="sm" color="success" onClick={() => downloadFile(form?.sponsorshipFormUrl as string)}>
                      Sponsor
                    </MDBBtn>
                  )}
                  <MDBBtn size="sm" color="danger" onClick={() => deleteForm(form)}>
                    Delete
                  </MDBBtn>
                </div>
              </div>
            </MDBAccordionItem>
          ))}
        </MDBAccordion>
      )}
    </div>
  );
};

export default SubmittedForms;
