import { Container } from "../../empManage/components";
import React, { Fragment } from "react";
import { Calender, SchedulerTopBar } from "../components";

// SchedCalenderPage. This page will hold the main calender that will display
// minimal information for each day. on its interface and when a admin
// decides to hover over the specific day
function SchedCalenderPage({ auth }) {
	return (
		<Fragment>
			<div className="grid grid-rows-6 gap-2 mb-4 h-full mx-auto">
				<Container>
					<SchedulerTopBar />
				</Container>
				<div className="row-span-6 grid gap-2 ">
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
