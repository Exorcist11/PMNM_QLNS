import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const DepartmentDialog = (props) => {
  const [open, setOpen] = useState(false);
  const {
    varI,
    buttonText,
    dialogContent,
    onSave,
    onCancel,
    icon,
    color,
    mWidth,
  } = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        variant={varI}
        onClick={handleClickOpen}
        startIcon={icon}
        color={color}
      >
        {buttonText}
      </Button>

      <BootstrapDialog
        maxWidth={mWidth}
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {dialogContent.title}
        </BootstrapDialogTitle>
        <DialogContent dividers>{dialogContent.content}</DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              onSave();
              handleClose();
            }}
            sx={{ display: dialogContent.actionSave ? "block" : "none" }}
          >
            {dialogContent.nameBtn}
          </Button>
          <Button
            autoFocus
            onClick={() => {
              onCancel();
              handleClose();
            }}
            sx={{ display: dialogContent.actionSave ? "block" : "none" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
};

export default DepartmentDialog;
