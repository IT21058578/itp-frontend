import React, { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { SchedulerTopBar, Container } from "../components";
import { SchedCalenderPage, SchedItemListPage, SchedListPage } from "../pages";

/* 
This layout goes inside the AdminLayout. It contains the Sidebar which is common to all
Schedule/Job pages and also stores the state shared across all 3 pages.
 */
function AdminSchedLayout({ auth }) {
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth());
	const [isDataUpdated, setIsDataUpdated] = useState(false);

	function handleMonthChange(e) {
		setMonth(parseInt(e.target.value));
		console.log(e.target.value);
	}

	function handleYearChange(e) {
		setYear(parseInt(e.target.value));
	}

	function handleNextMonthChange(e) {
		let tempMonth = month;
		let tempYear = year;
		if (month === 11) {
			tempMonth = -1;
			tempYear++;
		}
		tempMonth++;
		setMonth(tempMonth);
		setYear(tempYear);
		//TODO: Fix scheduler top bar
	}

	function handlePrevMonthChange(e) {
		let tempMonth = month;
		let tempYear = year;
		if (month === 0) {
			tempMonth = 12;
			tempYear--;
		}
		tempMonth--;
		setMonth(tempMonth);
		setYear(tempYear);
	}

	return (
		<Fragment>
			<div className="flex flex-col gap-2 h-full">
				<Container>
					<SchedulerTopBar
						handleMonthChange={handleMonthChange}
						handleYearChange={handleYearChange}
						year={year}
						month={month}
						isDataUpdated={isDataUpdated}
						setIsDataUpdated={setIsDataUpdated}
					/>
				</Container>
				<div className="grow grid gap-2 ">
					<Routes>
						<Route
							path=""
							element={
								<SchedCalenderPage
									year={year}
									month={month}
									handleNextMonthChange={handleNextMonthChange}
									handlePrevMonthChange={handlePrevMonthChange}
								/>
							}
						></Route>
						<Route
							path="sched"
							element={
								<SchedItemListPage
									isDataUpdated={isDataUpdated}
									setIsDataUpdated={setIsDataUpdated}
								/>
							}
						></Route>
						<Route path="list" element={<SchedListPage />}></Route>
					</Routes>
				</div>
			</div>
		</Fragment>
	);
}

export default AdminSchedLayout;
