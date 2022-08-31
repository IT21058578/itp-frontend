import React, { Fragment } from "react";
import { Calender, SchedulerTopBar, Container } from "../components";

// SchedCalenderPage. This page will hold the main calender that will display
// minimal information for each day. on its interface and when a admin
// decides to hover over the specific day
function SchedCalenderPage({ auth }) {
	return (
		<Fragment>
			<div className="flex flex-col gap-2 h-full border">
				<Container>
					<SchedulerTopBar />
				</Container>
				<div className="grow grid gap-2 ">
					<Container title="Calender">
						<Calender />
					</Container>
				</div>
			</div>

			{/* <div className="border p-2 h-full border-gray-300 bg-white"></div> */}
		</Fragment>
	);
}

export default SchedCalenderPage;
