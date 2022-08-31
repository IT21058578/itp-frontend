import { Button, Label, Select } from "flowbite-react";
import ButtonGroup from "flowbite-react/lib/esm/components/Button/ButtonGroup";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddScheduleInterface from "./AddScheduleInterface";

const initYear = 2020;
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function SchedulerTopBar() {
	const navigate = useNavigate();
	const [years, setYears] = useState([]);
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth());

	//Create year list
	useEffect(() => {
		const crntYear = new Date().getFullYear();
		const temp = [];
		for (let i = initYear; i <= crntYear; i++) {
			temp.push(i);
		}
		setYears(temp);
	}, []);

	function handleMonthChange(e) {
		setMonth(e.target.value);
	}

	function handleYearChange(e) {
		setYear(e.target.value);
	}

	return (
		<div className="flex flex-row h-full gap-2">
			<div className="grow flex flex-row">
				<div className="flex-1 mx-4">
					<div className="mb-2 block text-center">
						<Label value="Year" />
					</div>
					<Select required={true} onChange={(e) => handleYearChange(e)}>
						{years.map((value, i) => (
							<option
								key={i}
								value={value}
								selected={value === year ? true : false}
							>
								{value}
							</option>
						))}
					</Select>
				</div>
				<div className="flex-1">
					<div className="mb-2 block text-center">
						<Label value="Month" />
					</div>
					<Select required={true} onChange={(e) => handleMonthChange(e)}>
						{months.map((value, i) => (
							<option key={i} value={i} selected={month === i ? true : false}>
								{value}
							</option>
						))}
					</Select>
				</div>
			</div>
			<div className="basis-1/5 border-x flex flex-row items-center justify-center">
				<AddScheduleInterface />
			</div>
			<div className="grow  flex flex-row items-center justify-center">
				<ButtonGroup>
					<Button
						onClick={() => {
							navigate("/admin/jobs/stat");
						}}
					>
						View Job Statistics
					</Button>
					<Button
						onClick={() => {
							navigate("/admin/jobs/list");
						}}
					>
						View Job List
					</Button>
				</ButtonGroup>
			</div>
		</div>
	);
}

export default SchedulerTopBar;
