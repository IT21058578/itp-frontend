import React from "react";
import { UserJobsTable } from "../../components";
import { ReactSession } from "react-client-session";

function UserJobsFuturePage() {
	return (
		<div className="flex flex-col mr-16 h-full">
			<div className="flex text-4xl font-light pb-4 border-b">Pending Jobs</div>
			<div className="flex-grow flex flex-col">
				<div
					style={{ height: "64vh" }}
					className="mt-4 border rounded w-full bg-gray-100 overflow-y-scroll"
				>
					<UserJobsTable type="PENDING" clientId={ReactSession.get("userId")} />
				</div>
			</div>
		</div>
	);
}

export default UserJobsFuturePage;
