import { Button, Label, Select } from "flowbite-react";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScheduleCreateModal from "./ScheduleCreateModal";

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

function SchedulerTopBar({
	handleMonthChange,
	handleYearChange,
	year,
	month,
	isDataUpdated,
	setIsDataUpdated,
}) {
	const navigate = useNavigate();
	const [years, setYears] = useState([]);
	const [isMdlActive, setIsMdlActive] = useState(false);

	//Create year list
	useEffect(() => {
		const crntYear = new Date().getFullYear();
		const temp = [];
		for (let i = initYear; i <= crntYear; i++) {
			temp.push(i);
		}
		setYears(temp);
	}, []);

	return (
		<Fragment>
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
					<Button onClick={() => setIsMdlActive(true)}>Create Schedule</Button>
				</div>
				<div className="grow flex flex-row items-center gap-4 justify-center">
					<Button
						onClick={() => {
							navigate("/admin/jobs");
						}}
					>
						To Calender
					</Button>
					<Button
						onClick={() => {
							navigate("/admin/jobs/sched");
						}}
					>
						To Schedules
					</Button>
					<Button
						onClick={() => {
							navigate("/admin/jobs/list");
						}}
					>
						To Jobs
					</Button>
				</div>
			</div>
			<ScheduleCreateModal
				isActive={isMdlActive}
				setIsActive={setIsMdlActive}
			/>
		</Fragment>
	);
}

export default SchedulerTopBar;
