import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function AlertDialog({ buttonText, resolvePositiveAnswer }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    resolvePositiveAnswer();
    setOpen(false);
  };

  return (
    <>
      <button
        className="bg-slate-800 text-white px-11 py-3 rounded-[4px] cursor-pointer hover:bg-slate-900 duration-300"
        onClick={handleClickOpen}
      >
        {buttonText}
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Delete quiz?"
        aria-describedby="Delete quiz?"
      >
        <DialogTitle id="alert-dialog-title">{"Delete quiz?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After quiz deleted, there is no way undo this. Delete quiz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
