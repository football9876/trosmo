import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface NotificationModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  showModal,
  setShowModal,
}) => {
  return (
    <Dialog
      open={showModal}
      onClose={() => setShowModal(false)}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        Notification not found
      </DialogTitle>

      <DialogContent
        sx={{
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography>
          Sorry, we couldn't find the notification you're looking for.
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          backgroundColor: "primary.main",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowModal(false)}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationModal;
