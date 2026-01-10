import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AppState } from "../store/Slice";
import { useSelector } from "react-redux";
import { docQr } from "../Logics/docQr";
import { User } from "../interface";
import { updateData } from "../Logics/updateData";

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
  const [open, setOpen] = useState(false);
  const [popUpData, setPopUpData] = useState<PopUp | null>(null);

  const toggleOpen = () => setOpen(!open);

  const getPopUpMessage = async (user: User) => {
    console.log("getting message...");
    try {
      const res = await docQr("PopUps", {
        max: 1,
        whereClauses: [
          {
            field: "userId",
            operator: "==",
            value: user?.userid || "",
          },
        ],
      });

      if (res?.[0]) {
        console.log("found popup data");
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
        setOpen(false); // Hide modal
        await updateData("PopUps", popUpData.docId, {
          read: "yes",
          readAt: new Date().toISOString(),
        });
        console.log("operation successful");
      } catch (error) {
        console.error("Failed to update read status:", error);
      }
    }
  };

  // Show modal if popup exists and not read
  useEffect(() => {
    if (popUpData && popUpData.read !== "yes") setOpen(true);
  }, [popUpData]);

  return (
    <Dialog
      open={open}
      onClose={toggleOpen}
      maxWidth="xs"
      fullWidth
      aria-labelledby="notification-dialog"
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Notification</Typography>
        <IconButton onClick={toggleOpen}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {popUpData ? (
          <Box textAlign="center">
            {popUpData.icon && (
              <Box display="flex" justifyContent="center" mb={2}>
                <img
                  src={popUpData.icon}
                  alt="Notification Icon"
                  style={{ width: 100, height: 100, objectFit: "contain" }}
                />
              </Box>
            )}
            <Typography variant="h6" gutterBottom>
              {popUpData.title}
            </Typography>
            <Typography>{popUpData.text}</Typography>
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleOkayClick}>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationModal;
