import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Link,
  Box
} from "@mui/material";

export interface ApplicationProps {
  formData: {
    // --- Section 1: Personal Information ---
    fullName: string;
    nationality: string;
    dateOfBirth: string;
    passportNumber: string;
    countryOfResidence: string;
    whatsappNumber: string;
    email: string;
    invitationCode: string;

    // --- Section 2: Football Details ---
    legacyName: string;
    primaryPosition: string;
    secondaryPosition?: string;
    preferredFoot: string;
    currentClub?: string;
    leagueLevel?: string;
    contractDuration?: string;
    underAgent: "Yes" | "No";
    agentName?: string;

    // --- Section 3: Physical Attributes ---
    height: string;
    weight: string;
    shoeSize: string;
    jerseySize: string;
    injuries?: string;
    fullyFit: "Yes" | "No";

    // --- Section 4: Trial Logistics ---
    validVisa: "Yes" | "No";
    euPassport: "Yes" | "No";
    dietaryRestrictions: "Yes" | "No";
    dietaryDetails?: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelation: string;
    needAirportPickup: "Yes" | "No";

    // --- Section 5: Terms & Declarations ---
    declaration: boolean;
    signature: string;
    submissionDate: string;

    // --- File Uploads ---
    passportDataPageUrl?: string;
    bioDataUrl?: string;
    sponsorshipFormUrl?: string;
  };
}

const TrialApplicationDetails: React.FC<ApplicationProps> = ({ formData }) => {
  const getValue = (value: any) => value ?? "";

  return (
    <Card sx={{ maxWidth: 700, margin: "auto", mb: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          TRIAL APPLICATION
        </Typography>

        {/* Section 1: Personal Information */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Personal Information
          </Typography>

          <TextField
            color="info"
            label="Full Name (as in Passport)"
            value={getValue(formData.fullName)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Nationality"
            value={getValue(formData.nationality)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Date of Birth"
            value={getValue(formData.dateOfBirth)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Passport Number"
            value={getValue(formData.passportNumber)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Country of Residence"
            value={getValue(formData.countryOfResidence)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="WhatsApp Number (with country code)"
            value={getValue(formData.whatsappNumber)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Email Address"
            value={getValue(formData.email)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Invitation Reference Code (File Number)"
            value={getValue(formData.invitationCode)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
        </Box>

        {/* Section 2: Football Details */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Football Details
          </Typography>
          <TextField
            label="Legacy Name"
            value={getValue(formData.legacyName)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Primary Position"
            value={getValue(formData.primaryPosition)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Secondary Position (if any)"
            value={getValue(formData.secondaryPosition)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Preferred Foot"
            value={getValue(formData.preferredFoot)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Current Club (if any)"
            value={getValue(formData.currentClub)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="League/Level of Current Club"
            value={getValue(formData.leagueLevel)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Duration of Current Contract (if under contract)"
            value={getValue(formData.contractDuration)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Are you currently under any agent/representation?"
            value={getValue(formData.underAgent)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          {formData.underAgent === "Yes" && (
            <TextField
              label="Agent Name and Contact"
              value={getValue(formData.agentName)}
              fullWidth
              InputProps={{ readOnly: true }}
              margin="dense"
            />
          )}
        </Box>

        {/* Section 3: Physical Attributes */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Physical Attributes
          </Typography>
          <TextField
            label="Height"
            value={getValue(formData.height)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Weight"
            value={getValue(formData.weight)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Shoe Size"
            value={getValue(formData.shoeSize)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Jersey Size"
            value={getValue(formData.jerseySize)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Injuries in the past 12 months (if any)"
            value={getValue(formData.injuries)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Are you fully fit to play?"
            value={getValue(formData.fullyFit)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
        </Box>

        {/* Section 4: Trial Logistics */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Trial Logistics
          </Typography>
          <TextField
            label="Valid Visa to travel to Denmark"
            value={getValue(formData.validVisa)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="EU Passport or Residence Permit"
            value={getValue(formData.euPassport)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Do you have any dietary restrictions?"
            value={getValue(formData.dietaryRestrictions)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          {formData.dietaryRestrictions === "Yes" && (
            <TextField
              label="If Yes, please specify"
              value={getValue(formData.dietaryDetails)}
              fullWidth
              InputProps={{ readOnly: true }}
              margin="dense"
            />
          )}
          <TextField
            label="Emergency Contact Name"
            value={getValue(formData.emergencyContactName)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Emergency Contact Phone Number"
            value={getValue(formData.emergencyContactPhone)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Relationship to You"
            value={getValue(formData.emergencyContactRelation)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Do you need airport pickup?"
            value={getValue(formData.needAirportPickup)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
        </Box>

        {/* Section 5: Terms & Declarations */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Terms & Declarations
          </Typography>
          <TextField
            label="I declare that all information provided is true and correct"
            value={formData.declaration ? "Yes" : "No"}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Signature"
            value={getValue(formData.signature)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
          <TextField
            label="Date of Submission"
            value={getValue(formData.submissionDate)}
            fullWidth
            InputProps={{ readOnly: true }}
            margin="dense"
          />
        </Box>

        {/* File Upload Links */}
        <Box>
          {formData.passportDataPageUrl && (
            <Box mb={1}>
              <Typography variant="subtitle2">Passport Data Page:</Typography>
              <Link
                href={formData.passportDataPageUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Passport Data Page
              </Link>
            </Box>
          )}
          {formData.bioDataUrl && (
            <Box mb={1}>
              <Typography variant="subtitle2">Bio Data Page:</Typography>
              <Link
                href={formData.bioDataUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Bio Data Page
              </Link>
            </Box>
          )}
          {formData.sponsorshipFormUrl && (
            <Box mb={1}>
              <Typography variant="subtitle2">Sponsorship Form:</Typography>
              <Link
                href={formData.sponsorshipFormUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Sponsorship Form
              </Link>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TrialApplicationDetails;
