import React, { Fragment, useState } from "react";
import { Calender, Container } from "../../components";

// SchedCalenderPage. This page will hold the main calender that will display
// minimal information for each day. on its interface and when a admin
// decides to hover over the specific day
function SchedCalenderPage() {
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth());
	
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
