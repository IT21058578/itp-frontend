import React, { Fragment } from "react";
import { useEffect } from "react";
import { Calender, SchedulerTopBar, Container } from "../components";

// SchedCalenderPage. This page will hold the main calender that will display
// minimal information for each day. on its interface and when a admin
// decides to hover over the specific day
function SchedCalenderPage({
	auth,
	year,
	month,
	handleNextMonthChange,
	handlePrevMonthChange,
}) {
	return (
		<Fragment>
			<Container title="Calender">
				<Calender
					year={year}
					month={month}
					handleNextMonthChange={handleNextMonthChange}
					handlePrevMonthChange={handlePrevMonthChange}
				/>
			</Container>
		</Fragment>
	);
}

export default SchedCalenderPage;
