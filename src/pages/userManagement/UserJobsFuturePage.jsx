import React from "react";
import { useState } from "react";

function UserJobsFuturePage() {
	const [futureJobNum, setfutureJobNum] = useState(0);
	return (
		<div className="flex flex-col mr-16 h-full">
			<div className="flex text-4xl font-light pb-4 border-b">Future Jobs</div>
			<div className="flex-grow flex flex-col h-full">
				<div className=" mt-4">
					There are a total of {futureJobNum} jobs planned for the future.
				</div>
				<div className="flex-1 mt-4 border rounded h-full w-full bg-gray-100 overflow-y-scroll"></div>
			</div>
		</div>
	);
}

export default UserJobsFuturePage;
