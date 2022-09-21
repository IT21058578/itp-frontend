import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Calender, SchedulerTopBar, Container } from "../components";
import { SchedCalenderPage, SchedItemListPage, SchedListPage } from "../pages";

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

	function handleNextMonthChange(e) {
		let tempMonth = month;
		let tempYear = year;
		if (month == 11) {
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
		if (month == 0) {
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
						<Route path="sched" element={<SchedItemListPage />}></Route>
						<Route path="list" element={<SchedListPage />}></Route>
					</Routes>
				</div>
			</div>
		</Fragment>
	);
}

export default AdminSchedLayout;
