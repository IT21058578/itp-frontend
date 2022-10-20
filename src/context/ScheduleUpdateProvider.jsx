import React, { createContext, useEffect } from "react";
import { useState } from "react";

const ScheduleUpdateContext = createContext({});

// This is the provider responsible for managing whether the schedules displayed in the list are upto date or not.
// When the isUpdated state changes, the necessary every re-adjusts and sets the isUpdated state to true;
export function ScheduleUpdateProvider({ children }) {
	const [isUpdated, setIsUpdated] = useState(false);

	return (
		<ScheduleUpdateContext.Provider value={{ isUpdated, setIsUpdated }}>
			{children}
		</ScheduleUpdateContext.Provider>
	);
}

//This is needed as the useContext() hook needs this as the argument like; useContext(ScheduleUpdateContext)
export default ScheduleUpdateContext;
