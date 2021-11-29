import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button } from "..";
import { confirmDialogAction } from "../../store/actions";
import "../styles/dialog.css";
import { IoWarningOutline } from "react-icons/io5";

function ConfirmDeleteDialog() {
  const { shouldDisplay, name, email } = useSelector((state) => ({
    shouldDisplay: state.confirmDialog.open,
    name: state.confirmDialog.name,
    email: state.confirmDialog.email,
  }));
  const dispatch = useDispatch();
  console.log({ shouldDisplay, name, email });

  const handleClose = () => dispatch(confirmDialogAction.invisible());

  return shouldDisplay ? (
    <div className="dialog-wrapper">
      <div className="dialog">
        <div className="dialog__content">
          <h2 className="grid-span-2"> Confirm delete</h2>
          <p className="grid-span-2">
            Are you sure you want to delete this device info ?
          </p>
          <p className="dialog__content__label">Employee: </p>
          <p>{name}</p>
          <p className="dialog__content__label">Email: </p>
          <p>{email}</p>
          <Alert
            className="grid-span-2"
            type="error"
            icon={<IoWarningOutline />}
          >
            Deleting this employee's device information will also delete all
            pending employee's device requests
          </Alert>
        </div>
        <div className="dialog__btn-group">
          <Button variant="text" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="contained" style={{ background: "#ff0000" }}>
            DELETE
          </Button>
        </div>
      </div>
    </div>
  ) : null;
}
export default ConfirmDeleteDialog;
