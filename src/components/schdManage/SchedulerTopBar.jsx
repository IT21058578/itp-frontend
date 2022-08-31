import React from "react";
import AddScheduleInterface from "./AddScheduleInterface";

function SchedulerTopBar() {
	return (
		<div className="flex flex-row h-full gap-2">
			<div className="grow border flex flex-row">
				<div className="flex-1 border"></div>
				<div className="flex-1 border"></div>
			</div>
			<div className="basis-1/5 border-x flex flex-row items-center justify-center">
				<AddScheduleInterface />
			</div>
			<div className="grow border flex flex-row">
				<div className="flex-1 border"></div>
				<div className="flex-1 border"></div>
			</div>
		</div>
	);
}

export default SchedulerTopBar;
