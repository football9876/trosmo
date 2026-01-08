import { useEffect, useState } from "react";
import { docQr } from "../../Logics/docQr";
import useInnerWidth from "../../funcs/useInnerWidth";
import toast from "react-hot-toast";
import { deleteData } from "../../Logics/deleteData";

import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  passportDataPageUrl?: string;
  bioDataUrl?: string;
  sponsorshipFormUrl?: string;
  ownerUid?: string;
}

const SubmittedForms = () => {
  const [loading, setLoading] = useState(false);
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

  const downloadFile = (file: FormFile | string) => {
    const link = document.createElement("a");
    link.href = typeof file === "string" ? file : file.uri;
    link.download = typeof file === "string" ? "file" : file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box className="submitted-forms-container">
      <Typography variant="h5" mb={2}>
        Submitted Forms
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : forms.length === 0 ? (
        <Typography>No forms submitted yet.</Typography>
      ) : isDesktop ? (
        // ================= DESKTOP TABLE =================
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Nationality</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Passport</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>WhatsApp</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Invitation Code</TableCell>
                <TableCell>Legacy Name</TableCell>
                <TableCell>Primary Pos</TableCell>
                <TableCell>Secondary Pos</TableCell>
                <TableCell>Preferred Foot</TableCell>
                <TableCell>Current Club</TableCell>
                <TableCell>Current League</TableCell>
                <TableCell>Contract Duration</TableCell>
                <TableCell>Under Agent</TableCell>
                <TableCell>Agent Name</TableCell>
                <TableCell>Height</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Shoe Size</TableCell>
                <TableCell>Jersey Size</TableCell>
                <TableCell>Injuries</TableCell>
                <TableCell>Fully Fit</TableCell>
                <TableCell>Valid Visa</TableCell>
                <TableCell>EU Passport</TableCell>
                <TableCell>Dietary Restrictions</TableCell>
                <TableCell>Dietary Details</TableCell>
                <TableCell>Emergency Contact</TableCell>
                <TableCell>Need Pickup</TableCell>
                <TableCell>Declaration</TableCell>
                <TableCell>Signature</TableCell>
                <TableCell>Submission Date</TableCell>
                <TableCell>Files</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {forms.map((form) => (
                <TableRow key={form.docId}>
                  <TableCell>{form.fullName}</TableCell>
                  <TableCell>{form.nationality}</TableCell>
                  <TableCell>{form.dateOfBirth}</TableCell>
                  <TableCell>{form.passportNumber}</TableCell>
                  <TableCell>{form.countryOfResidence}</TableCell>
                  <TableCell>{form.whatsappNumber}</TableCell>
                  <TableCell>{form.email}</TableCell>
                  <TableCell>{form.invitationCode}</TableCell>
                  <TableCell>{form.legacyName}</TableCell>
                  <TableCell>{form.primaryPosition}</TableCell>
                  <TableCell>{form.secondaryPosition}</TableCell>
                  <TableCell>{form.preferredFoot}</TableCell>
                  <TableCell>{form.currentClub}</TableCell>
                  <TableCell>{form.currentLeague}</TableCell>
                  <TableCell>{form.contractDuration}</TableCell>
                  <TableCell>{form.underAgent}</TableCell>
                  <TableCell>{form.agentName}</TableCell>
                  <TableCell>{form.height}</TableCell>
                  <TableCell>{form.weight}</TableCell>
                  <TableCell>{form.shoeSize}</TableCell>
                  <TableCell>{form.jerseySize}</TableCell>
                  <TableCell>{form.injuries}</TableCell>
                  <TableCell>{form.fullyFit}</TableCell>
                  <TableCell>{form.validVisa}</TableCell>
                  <TableCell>{form.euPassport}</TableCell>
                  <TableCell>{form.dietaryRestrictions}</TableCell>
                  <TableCell>{form.dietaryDetails}</TableCell>
                  <TableCell>
                    {form.emergencyContactName} (
                    {form.emergencyContactRelation},{" "}
                    {form.emergencyContactPhone})
                  </TableCell>
                  <TableCell>{form.needAirportPickup}</TableCell>
                  <TableCell>{form.declaration ? "Yes" : "No"}</TableCell>
                  <TableCell>{form.signature}</TableCell>
                  <TableCell>{form.submissionDate}</TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {form.passportDataPageUrl && (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() =>
                            downloadFile(form.passportDataPageUrl as string)
                          }
                        >
                          Passport
                        </Button>
                      )}
                      {form.bioDataUrl && (
                        <Button
                          size="small"
                          color="info"
                          variant="contained"
                          onClick={() =>
                            downloadFile(form.bioDataUrl as string)
                          }
                        >
                          Bio
                        </Button>
                      )}
                      {form.sponsorshipFormUrl && (
                        <Button
                          size="small"
                          color="success"
                          variant="contained"
                          onClick={() =>
                            downloadFile(form.sponsorshipFormUrl as string)
                          }
                        >
                          Sponsor
                        </Button>
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={() => deleteForm(form)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      ) : (
        // ================= MOBILE ACCORDION =================
        <Box>
          {forms.map((form, i) => (
            <Accordion key={form.docId}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="bold">
                  {form.fullName}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                {Object.entries({
                  Nationality: form.nationality,
                  "Date of Birth": form.dateOfBirth,
                  "Passport Number": form.passportNumber,
                  "Country of Residence": form.countryOfResidence,
                  WhatsApp: form.whatsappNumber,
                  Email: form.email,
                  "Invitation Code": form.invitationCode,
                  "Legacy Name": form.legacyName,
                  "Primary Position": form.primaryPosition,
                  "Secondary Position": form.secondaryPosition,
                  "Preferred Foot": form.preferredFoot,
                  "Current Club": form.currentClub,
                  "Current League": form.currentLeague,
                  "Contract Duration": form.contractDuration,
                  "Under Agent": form.underAgent,
                  "Agent Name": form.agentName,
                  Height: form.height,
                  Weight: form.weight,
                  "Shoe Size": form.shoeSize,
                  "Jersey Size": form.jerseySize,
                  Injuries: form.injuries,
                  "Fully Fit": form.fullyFit,
                  "Valid Visa": form.validVisa,
                  "EU Passport": form.euPassport,
                  "Dietary Restrictions": form.dietaryRestrictions,
                  "Dietary Details": form.dietaryDetails,
                  "Need Airport Pickup": form.needAirportPickup,
                  Declaration: form.declaration ? "Yes" : "No",
                  Signature: form.signature,
                  "Submission Date": form.submissionDate,
                }).map(([label, value]) => (
                  <Typography key={label} variant="body2" mb={0.5}>
                    <strong>{label}:</strong> {value || "-"}
                  </Typography>
                ))}

                <Box mt={2}>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {form.passportDataPageUrl && (
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                          downloadFile(form.passportDataPageUrl as string)
                        }
                      >
                        Passport
                      </Button>
                    )}
                    {form.bioDataUrl && (
                      <Button
                        size="small"
                        color="info"
                        variant="contained"
                        onClick={() =>
                          downloadFile(form.bioDataUrl as string)
                        }
                      >
                        Bio
                      </Button>
                    )}
                    {form.sponsorshipFormUrl && (
                      <Button
                        size="small"
                        color="success"
                        variant="contained"
                        onClick={() =>
                          downloadFile(form.sponsorshipFormUrl as string)
                        }
                      >
                        Sponsor
                      </Button>
                    )}
                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={() => deleteForm(form)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SubmittedForms;
