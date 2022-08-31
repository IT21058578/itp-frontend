import React, { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Calender, SchedulerTopBar, Container } from "../components";
import { SchedCalenderPage, SchedListPage, SchedStatPage } from "../pages";

/* 
This layout goes inside the AdminLayout. It contains the Sidebar which is common to all
Schedule/Job pages and also stores the state shared across all 3 pages.
 */
function AdminSchedLayout({ auth }) {
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth());

	function handleMonthChange(e) {
		setMonth(e.target.value);
	}

	function handleYearChange(e) {
		setYear(e.target.value);
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
					/>
				</Container>
				<div className="grow grid gap-2 ">
					<Routes>
						<Route path="" element={<SchedCalenderPage />}></Route>
						<Route path="stat" element={<SchedStatPage />}></Route>
						<Route path="list" element={<SchedListPage />}></Route>
					</Routes>
				</div>
			</div>
		</Fragment>
	);
}

export default AdminSchedLayout;
