import React from "react";
import { useDispatch } from "react-redux";
import { signout } from "../../apiService";
import { Button } from "../../components";
import { authenticationAction } from "../../store/actions";

function Admin() {
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      await signout();

      dispatch(authenticationAction.removeUserAuthenticationInfo());
    } catch (error) {}
  };

  return (
    <>
      <h1>Admin</h1>
      <Button onClick={signOut}>SIGN OUT</Button>
    </>
  );
}

export default Admin;
