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
import { ApplicationProps } from "../collectDetails";

const SubmittedForms = () => {
  const [loading, setLoading] = useState(false);
  const [forms, setForms] = useState<ApplicationProps[]>([]);
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

  const deleteForm = async (form: ApplicationProps) => {
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

  const downloadFile = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
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
        // ================= DESKTOP =================
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
                <TableCell>Invite Code</TableCell>
                <TableCell>Legacy Name</TableCell>
                <TableCell>Primary Pos</TableCell>
                <TableCell>Secondary Pos</TableCell>
                <TableCell>Preferred Foot</TableCell>
                <TableCell>Club</TableCell>
                <TableCell>League Level</TableCell>
                <TableCell>Contract</TableCell>
                <TableCell>Under Agent</TableCell>
                <TableCell>Agent</TableCell>
                <TableCell>Height</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Shoe</TableCell>
                <TableCell>Jersey</TableCell>
                <TableCell>Injuries</TableCell>
                <TableCell>Fully Fit</TableCell>
                <TableCell>Visa</TableCell>
                <TableCell>EU Passport</TableCell>
                <TableCell>Dietary</TableCell>
                <TableCell>Emergency</TableCell>
                <TableCell>Pickup</TableCell>
                <TableCell>Declaration</TableCell>
                <TableCell>Signature</TableCell>
                <TableCell>Date</TableCell>
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
                  <TableCell>{form.secondaryPosition || "-"}</TableCell>
                  <TableCell>{form.preferredFoot}</TableCell>
                  <TableCell>{form.currentClub || "-"}</TableCell>
                  <TableCell>{form.leagueLevel || "-"}</TableCell>
                  <TableCell>{form.contractDuration || "-"}</TableCell>
                  <TableCell>{form.underAgent}</TableCell>
                  <TableCell>{form.agentName || "-"}</TableCell>
                  <TableCell>{form.height}</TableCell>
                  <TableCell>{form.weight}</TableCell>
                  <TableCell>{form.shoeSize}</TableCell>
                  <TableCell>{form.jerseySize}</TableCell>
                  <TableCell>{form.injuries || "-"}</TableCell>
                  <TableCell>{form.fullyFit}</TableCell>
                  <TableCell>{form.validVisa}</TableCell>
                  <TableCell>{form.euPassport}</TableCell>
                  <TableCell>
                    {form.dietaryRestrictions}
                    {form.dietaryRestrictions === "Yes" &&
                      ` (${form.dietaryDetails || "-"})`}
                  </TableCell>
                  <TableCell>
                    {form.emergencyContactName} (
                    {form.emergencyContactRelation},{" "}
                    {form.emergencyContactPhone})
                  </TableCell>
                  <TableCell>{form.needAirportPickup}</TableCell>
                  <TableCell>{form.declaration ? "Yes" : "No"}</TableCell>
                  <TableCell>{form.signature}</TableCell>
                  <TableCell>{form.submissionDate}</TableCell>

                  {/* FILES */}
                  <TableCell>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {form.passportDataPageUrl && (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() =>
                            downloadFile(form.passportDataPageUrl!)
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
                            downloadFile(form.bioDataUrl!)
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
                            downloadFile(form.sponsorshipFormUrl!)
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
        // ================= MOBILE =================
        <Box>
          {forms.map((form) => (
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
                  "League Level": form.leagueLevel,
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
                          downloadFile(form.passportDataPageUrl!)
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
                          downloadFile(form.bioDataUrl!)
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
                          downloadFile(form.sponsorshipFormUrl!)
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
