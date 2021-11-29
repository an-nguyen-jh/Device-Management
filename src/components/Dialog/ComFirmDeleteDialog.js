import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "..";
import { confirmDialogAction } from "../../store/actions";
import "../styles/dialog.css";

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
