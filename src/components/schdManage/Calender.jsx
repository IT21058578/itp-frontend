import { Button } from "flowbite-react";
import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import CalenderDay from "./CalenderDay";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

class DayData {
	constructor(dayNum, isDisabled) {
		this.dayNum = dayNum;
		if (isDisabled == undefined) {
			this.isDisabled = false;
		} else {
			this.isDisabled = isDisabled;
		}
	}
}

function Calender({
	year,
	month,
	handleNextMonthChange,
	handlePrevMonthChange,
}) {
	const [dayList, setDayList] = useState([]);

	useEffect(() => {
		populateCalender(year, month); //Takes in year and (current month - 1)
	}, [year, month]);

	function populateCalender(year, month) {
		const prevMonthDays = new Date(year, month, 0).getDate();
		const crntMonthDays = new Date(year, month + 1, 0).getDate();

		const calenderSlots = 7 * 6;
		const crntMonthFirstDay = new Date(year, month, 1).getDay();
		let calenderArray = [];

		for (let i = crntMonthFirstDay; i > 0; i--) {
			calenderArray.push(new DayData(prevMonthDays - i + 1, true));
		}
		for (let i = 0; i < crntMonthDays; i++) {
			calenderArray.push(new DayData(i + 1));
		}
		let lengthBeforeFill = calenderArray.length;
		for (let i = calenderArray.length; i < calenderSlots; i++) {
			calenderArray.push(new DayData(i + 1 - lengthBeforeFill, true));
		}
		setDayList(calenderArray);
	}

	return (
		<div className="border rounded-md flex flex-row p-2 m-2 h-full">
			<div className=" basis-1/12 p-2 h-full align-middle flex flex-row items-center">
				<Button
					className="bg-blue-50"
					style={{ width: "100%", height: "100%" }}
					onClick={handlePrevMonthChange}
				>
					<ChevronLeftIcon className="h-16 w-6" />
				</Button>
			</div>
			<div className="flex grow  h-full items-center">
				<div className=" flex flex-col">
					<div className="h-full  flex flex-row">
						<CalenderDay isHeader={true} dayHeader={"Sun"} />
						<CalenderDay isHeader={true} dayHeader={"Mon"} />
						<CalenderDay isHeader={true} dayHeader={"Tue"} />
						<CalenderDay isHeader={true} dayHeader={"Wed"} />
						<CalenderDay isHeader={true} dayHeader={"Thu"} />
						<CalenderDay isHeader={true} dayHeader={"Fri"} />
						<CalenderDay isHeader={true} dayHeader={"Sat"} />
					</div>
					<div className="flex-1  flex flex-wrap">
						{dayList.map((d, i) => (
							<CalenderDay key={i} dayData={d} />
						))}
					</div>
				</div>
			</div>
			<div className=" basis-1/12 p-2 h-full align-middle flex flex-row items-center">
				<div className="flex-1 text-center h-full">
					<Button
						className="bg-blue-50"
						style={{ width: "100%", height: "100%" }}
						onClick={handleNextMonthChange}
					>
						<ChevronRightIcon className="h-16 w-6" />
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Calender;
