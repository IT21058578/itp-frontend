import { Button, Spinner } from "flowbite-react";
import React from "react";
import { useState, useEffect } from "react";
import CalenderDay from "./CalenderDay";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import axios from "axios";

class DayData {
	//TODO: Make a day-of-month field we create here.
	constructor(dayOfMonth, isDisabled, data) {
		this.dayOfMonth = dayOfMonth;
		if (isDisabled === undefined) {
			this.isDisabled = false;
		} else {
			this.isDisabled = isDisabled;
		}
		if (data === undefined) {
			this.data = false;
		} else {
			this.data = data;
		}
	}
}

const JOB_URL = process.env.REACT_APP_JOB_API_URL;

function Calender({
	year,
	month,
	handleNextMonthChange,
	handlePrevMonthChange,
}) {
	const [dayList, setDayList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		populateCalender(year, month); //Takes in year and (current month - 1)
	}, [year, month]);

	function populateCalender(year, month) {
		//Make Get Request
		let daysData = [];
		let cancelToken;
		setIsLoading(true);

		axios
			.get(JOB_URL, {
				params: { year: year, month: month + 1 },
				cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
			})
			.then((response) => {
				daysData = response.data;
				const previousMonthDayCount = new Date(year, month, 0).getDate();
				const currentMonthDayCount = new Date(year, month + 1, 0).getDate();
				const currentMonthFirstDay = new Date(year, month, 1).getDay();
				const calenderSlots = 42;

				let calenderArray = [];
				//Before padding
				for (let i = currentMonthFirstDay; i > 0; i--) {
					calenderArray.push({
						dayOfMonth: previousMonthDayCount - i + 1,
						isDisabled: true,
					});
				}

				//Actual data
				for (let i = 0; i < currentMonthDayCount; i++) {
					calenderArray.push({
						dayOfMonth: i + 1,
						isDisabled: false,
						data: daysData[i],
					});
				}

				//After padding
				let lengthBeforeAfterPadding = calenderArray.length;
				for (let i = calenderArray.length; i < calenderSlots; i++) {
					calenderArray.push({
						dayOfMonth: i + 1 - lengthBeforeAfterPadding,
						isDisabled: true,
					});
				}

				setDayList(calenderArray);
			})
			.catch((err) => {
				if (axios.isCancel(err)) {
					return;
				}
			})
			.then(() => {
				setIsLoading(false);
			});
	}

	return (
		<div className="border rounded-md flex flex-row p-2 m-2 h-full items-center">
			<div className=" basis-1/12 p-2 h-full align-middle flex flex-row items-center">
				<Button
					className="bg-blue-50"
					style={{ width: "100%", height: "100%" }}
					onClick={handlePrevMonthChange}
					disabled={isLoading}
				>
					{isLoading ? <Spinner /> : <ChevronLeftIcon className="h-16 w-6" />}
				</Button>
			</div>
			<div
				className="flex grow items-center relative border rounded-md"
				style={{ height: "97%" }}
			>
				{isLoading ? (
					<div className="absolute z-50 h-full w-full bg-black rounded-md bg-opacity-10 flex items-center justify-center">
						<Spinner size="xl" />
					</div>
				) : (
					""
				)}

				<div className=" flex flex-col">
					<div className="h-full  flex flex-row">
						<CalenderDay
							isHeader={true}
							dayHeader={"Sun"}
							isLoading={isLoading}
						/>
						<CalenderDay
							isHeader={true}
							dayHeader={"Mon"}
							isLoading={isLoading}
						/>
						<CalenderDay
							isHeader={true}
							dayHeader={"Tue"}
							isLoading={isLoading}
						/>
						<CalenderDay
							isHeader={true}
							dayHeader={"Wed"}
							isLoading={isLoading}
						/>
						<CalenderDay
							isHeader={true}
							dayHeader={"Thu"}
							isLoading={isLoading}
						/>
						<CalenderDay
							isHeader={true}
							dayHeader={"Fri"}
							isLoading={isLoading}
						/>
						<CalenderDay
							isHeader={true}
							dayHeader={"Sat"}
							isLoading={isLoading}
						/>
					</div>
					<div className="flex-1 flex flex-wrap">
						{dayList.map((d, i) => (
							<CalenderDay key={i} dayData={d} isLoading={isLoading} />
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
						disabled={isLoading}
					>
						{isLoading ? (
							<Spinner />
						) : (
							<ChevronRightIcon className="h-16 w-6" />
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Calender;
