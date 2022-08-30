import React, { createContext } from "react";
import { useState } from "react";

const AuthContext = createContext({});

// This is the provider for the global user context. This wraps around the entire <App />. It is
// imported and used in index.js .This allows us to use the setAuth and auth and other global
// state anywhere in our components as long as we use the useContext() hook.
export function AuthProvider({ children }) {
	const { auth, setAuth } = useState({}); //Should store an object containing user details.

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
}

//This is needed as the useContext() hook needs this as the argument like; useContext(AuthContext)
export default AuthContext;
