import { getAuth, signInWithEmailAndPassword, signOut } from "@firebase/auth";

export default function generateAuthenticationService() {
  const firebaseAuth = getAuth();

  function loginWithEmailAndPassword(email, password) {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  function signout() {
    return signOut(firebaseAuth);
  }

  return {
    loginWithEmailAndPassword,
    signout,
  };
}
