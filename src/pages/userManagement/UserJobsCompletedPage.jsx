import React from "react";
import { UserJobsTable } from "../../components";
import { ReactSession } from "react-client-session";

function UserJobsCompletedPage() {;
	return (
		<div className="flex flex-col mr-16 h-full">
			<div className="flex text-4xl font-light pb-4 border-b">
				Completed Jobs
			</div>
			<div className="flex-grow flex flex-col h-full">
				<div
					style={{height: "64vh"}}
					className="mt-4 border rounded w-full bg-gray-100 overflow-y-scroll"
				>
					<UserJobsTable type="COMPLETED" email={ReactSession.get("email")} />
				</div>
			</div>
		</div>
	);
}

export default UserJobsCompletedPage;
