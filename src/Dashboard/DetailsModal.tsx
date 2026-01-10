import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CollectDetails from "./collectDetails";
import SuccessConfirmation from "./CollectionSuccessMessage";
import { AppState, setShowForm } from "../store/Slice";
import { useDispatch, useSelector } from "react-redux";

const DetailsModal: React.FC = () => {
  const { user, showForm } = useSelector(
    (root: { app: AppState }) => root.app
  );

  const [open, setOpen] = useState(!user?.registrationCompleted);
  const [success, setSuccess] = useState<boolean>(false);
  const dispatch = useDispatch();

  // Sync with Redux showForm
  useEffect(() => {
    if (showForm) setOpen(showForm);
  }, [showForm]);

  // Update Redux when modal closes
  useEffect(() => {
    if (!open) {
      dispatch(setShowForm(false));
      console.log("Modal closed, Redux updated");
    }
  }, [open, dispatch]);

  const handleClose = () => {
    setOpen(false);
    dispatch(setShowForm(false));
  };

  const handleRemindLater = () => {
    if (success) {
      handleClose();
    } else {
      setOpen(false);
      setTimeout(() => {
        setOpen(true);
      }, 2 * 60 * 1000); // 2 minutes
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      scroll="paper"
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6">TRIAL APPLICATION</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {success ? (
          <SuccessConfirmation onMakePayment={handleClose} />
        ) : (
          <CollectDetails onSuccess={() => setSuccess(true)} />
        )}
      </DialogContent>

      <DialogActions>
        <Button color="secondary" onClick={handleRemindLater}>
          {success ? "Finish" : "Remind me later"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsModal;
