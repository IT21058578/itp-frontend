import React, { useReducer } from "react";
// import firebaseApp from "./fire";
export const AuthContext = React.createContext();

export const AuthProvider = ({ reducer, initialState, children }) => {
  //   useEffect(() => {
  //     console.log("=============sdfmlsdmfklsdfkn");
  //     firebaseApp.auth().onAuthStateChanged(setCurrentUser);
  //   }, []);
  return (
    <AuthContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AuthContext.Provider>
  );
};
