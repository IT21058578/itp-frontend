import { Button, Label, Select, Spinner } from "flowbite-react";
import React from "react";
import { useState, useEffect } from "react";
import CalenderDay from "./CalenderDay";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import axios from "axios";


const JOB_URL = process.env.REACT_APP_JOB_API_URL;
const monthList = ["January","February","March","April","May","June","July",
"August","September","October","November","December"];
const startingYear = 2020;
const currentYear = new Date().getFullYear();
const reliefYears = 2;

function Calender() {
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth());
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
						year,
						month: monthList[month],
					});
				}

				//Actual data
				for (let i = 0; i < currentMonthDayCount; i++) {
					calenderArray.push({
						dayOfMonth: i + 1,
						isDisabled: false,
						data: daysData[i],
						year,
						month: monthList[month],
					});
				}

				//After padding
				let lengthBeforeAfterPadding = calenderArray.length;
				for (let i = calenderArray.length; i < calenderSlots; i++) {
					calenderArray.push({
						dayOfMonth: i + 1 - lengthBeforeAfterPadding,
						isDisabled: true,
						year,
						month: monthList[month],
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
		<div className="flex flex-col p-2 m-2 h-full items-center gap-2"
		style={{height: "87vh"}}>
			<div className="flex flex-row w-full items-center border rounded gap-8 p-4">
				<div className="flex flex-row w-1/6 gap-2 items-center">
					<div>
						<Label>Year</Label>
					</div>
					<div className="w-full">
						<Select
							defaultValue={year}
							onChange={(e) => setYear(e.target.value)}
						>
							{Array
								.from({length: currentYear - startingYear + reliefYears}, (x, i) => startingYear + i)
								.map((year, i) => 
									<option key={i} value={year}>{year}</option> 
								)
							}
						</Select>
					</div>
				</div>
				<div className="flex flex-row w-1/6 gap-2 items-center">
					<div>
						<Label>Month</Label>
					</div>
					<div className="w-full">
						<Select
							defaultValue={month}
							onChange={(e) => setMonth(e.target.value)}
						>
							{monthList?.map((month, i) => 
								<option key={i} value={i}>{month}</option> 
							)}
						</Select>
					</div>
				</div>
				<div className="flex-1"></div>
				<div className="mx-8 font-medium text-lg ">{monthList[month]}, {year}</div>
			</div>
			<div className="flex flex-row h-full items-center border rounded ">
				<div className="basis-1/12 p-2 h-full align-middle flex flex-row items-center">
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
					className="flex grow items-center relative rounded-md"
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
		</div>
	);
}

export default Calender;
