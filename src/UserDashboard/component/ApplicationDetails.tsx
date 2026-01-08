import React from "react";
import { MDBInput, MDBCard, MDBCardBody } from "mdb-react-ui-kit";

export interface ApplicationProps {
  formData: {
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
    underAgent: string;
    agentName: string;
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
    passportDataPageUrl: string;
    bioDataUrl: string;
    sponsorshipFormUrl: string;
  };
}

const TrialApplicationDetails: React.FC<ApplicationProps> = ({ formData }) => {
  const getValue = (value: any) => value ?? "";

  return (
    <MDBCard className="mb-4" style={{ maxWidth: 600 }}>
      <MDBCardBody>
        <h4 className="mb-3">TRIAL APPLICATION</h4>

        <MDBInput label="Full Name" value={getValue(formData?.fullName)} readOnly className="mb-3" />
        <MDBInput label="Nationality" value={getValue(formData?.nationality)} readOnly className="mb-3" />
        <MDBInput label="Date of Birth" value={getValue(formData?.dateOfBirth)} readOnly className="mb-3" />
        <MDBInput label="Passport Number" value={getValue(formData?.passportNumber)} readOnly className="mb-3" />
        <MDBInput label="Country of Residence" value={getValue(formData?.countryOfResidence)} readOnly className="mb-3" />
        <MDBInput label="WhatsApp Number" value={getValue(formData?.whatsappNumber)} readOnly className="mb-3" />
        <MDBInput label="Email" value={getValue(formData?.email)} readOnly className="mb-3" />
        <MDBInput label="Invitation Code" value={getValue(formData?.invitationCode)} readOnly className="mb-3" />
        <MDBInput label="Legacy Name" value={getValue(formData?.legacyName)} readOnly className="mb-3" />
        <MDBInput label="Primary Position" value={getValue(formData?.primaryPosition)} readOnly className="mb-3" />
        <MDBInput label="Secondary Position" value={getValue(formData?.secondaryPosition)} readOnly className="mb-3" />
        <MDBInput label="Preferred Foot" value={getValue(formData?.preferredFoot)} readOnly className="mb-3" />
        <MDBInput label="Current Club" value={getValue(formData?.currentClub)} readOnly className="mb-3" />
        <MDBInput label="Under Agent" value={getValue(formData?.underAgent)} readOnly className="mb-3" />
        <MDBInput label="Agent Name" value={getValue(formData?.agentName)} readOnly className="mb-3" />
        <MDBInput label="Height" value={getValue(formData?.height)} readOnly className="mb-3" />
        <MDBInput label="Weight" value={getValue(formData?.weight)} readOnly className="mb-3" />
        <MDBInput label="Shoe Size" value={getValue(formData?.shoeSize)} readOnly className="mb-3" />
        <MDBInput label="Jersey Size" value={getValue(formData?.jerseySize)} readOnly className="mb-3" />
        <MDBInput label="Injuries" value={getValue(formData?.injuries)} readOnly className="mb-3" />
        <MDBInput label="Fully Fit" value={getValue(formData?.fullyFit)} readOnly className="mb-3" />
        <MDBInput label="Valid Visa" value={getValue(formData?.validVisa)} readOnly className="mb-3" />
        <MDBInput label="EU Passport" value={getValue(formData?.euPassport)} readOnly className="mb-3" />
        <MDBInput label="Dietary Restrictions" value={getValue(formData?.dietaryRestrictions)} readOnly className="mb-3" />
        <MDBInput label="Dietary Details" value={getValue(formData?.dietaryDetails)} readOnly className="mb-3" />
        <MDBInput label="Emergency Contact Name" value={getValue(formData?.emergencyContactName)} readOnly className="mb-3" />
        <MDBInput label="Emergency Contact Phone" value={getValue(formData?.emergencyContactPhone)} readOnly className="mb-3" />
        <MDBInput label="Emergency Contact Relation" value={getValue(formData?.emergencyContactRelation)} readOnly className="mb-3" />
        <MDBInput label="Need Airport Pickup" value={getValue(formData?.needAirportPickup)} readOnly className="mb-3" />
        <MDBInput label="Declaration" value={formData?.declaration ? "Yes" : "No"} readOnly className="mb-3" />
        <MDBInput label="Signature" value={getValue(formData?.signature)} readOnly className="mb-3" />
        <MDBInput label="Submission Date" value={getValue(formData?.submissionDate)} readOnly className="mb-3" />

        {/* New File Upload Previews */}
        {formData?.passportDataPageUrl && (
          <div className="mb-3">
            <label>Passport Data Page</label><br />
            <a href={formData?.passportDataPageUrl} target="_blank" rel="noopener noreferrer">
              View Passport Data Page
            </a>
          </div>
        )}
        {formData?.bioDataUrl && (
          <div className="mb-3">
            <label>Bio Data Page</label><br />
            <a href={formData?.bioDataUrl} target="_blank" rel="noopener noreferrer">
              View Bio Data Page
            </a>
          </div>
        )}
        {formData?.sponsorshipFormUrl && (
          <div className="mb-3">
            <label>Sponsorship Form</label><br />
            <a href={formData?.sponsorshipFormUrl} target="_blank" rel="noopener noreferrer">
              View Sponsorship Form
            </a>
          </div>
        )}
      </MDBCardBody>
    </MDBCard>
  );
};

export default TrialApplicationDetails;
