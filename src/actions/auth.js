import { firebase, googleAuthProvider } from "../firebase/firebase";

export const login = uid => ({
  type: "LOGIN",
  uid
});

export const startLogin = authProvider => {
  return () => {
    return firebase.auth().signInWithPopup(authProvider);
  };
};

export const logout = () => ({ type: "LOGOUT" });

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
