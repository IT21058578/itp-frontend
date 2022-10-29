import React from "react";
import { useState, useEffect } from "react";
import { BanknotesIcon, ClockIcon, StarIcon } from "@heroicons/react/24/solid";
import { Popover } from "react-tiny-popover";
import { useNavigate } from "react-router-dom";

const ADMIN_JOB_PAGE_URL = "/admin/jobs";
const ADMIN_SCHED_PAGE_URL = "/admin/schedule";

function CalenderDay({ isHeader, dayHeader, dayData, isLoading}) {
	const navigate = useNavigate();
	const [headerClasses, setHeaderClasses] = useState("");
	const [isPopoverVisible, setIsPopoverVisible] = useState("");

	useEffect(() => {
		resolveDayHeaderClasses();
	}, []);

	function resolveDayHeaderClasses() {
		let classes = "flex w-full h-full items-center rounded py-1 ";
		if (dayHeader == "Sun" || dayHeader == "Sat") {
			classes += "bg-red-200 text-red-600";
		} else {
			classes += "bg-blue-200 text-blue-600";
		}
		setHeaderClasses(classes);
	}

	function hasUnfinishedSchedules() {
		const date = new Date(dayData?.data?.date || '');
		const scheduleList = dayData?.data?.scheduleList || [];
		if (date <= new Date() && scheduleList.length !== 0) {
			return true;
		}
		return false;
	}

	return (
		<div
			className="flex-1 flex px-2 py-1 items-center"
			style={{
				maxWidth: "14.2857142857%",
				minWidth: "14.2857142857%",
			}}
		>
			{isHeader ? (
				<div className={headerClasses}>
					<div className="flex-1 p-2 text-center h-fit text-3xl">
						{dayHeader}
					</div>
				</div>
			) : dayData?.isDisabled ? (
				<div className="flex w-full h-full items-center bg-gray-100 rounded p-1.5 hover:bg-gray-200 transition-all">
					<div className="flex-1  text-center text-3xl font-extralight text-gray-500">
						{dayData?.dayOfMonth}
					</div>
					<div className="basis-2/6 flex flex-col rounded-md h-full">
						<div className="flex flex-row items-center justify-between text-xs text-center text-gray-300 font-bold">
							-
							<BanknotesIcon className="w-3 h-3"/>
						</div>
						<div className="flex flex-row items-center justify-between text-xs text-center text-gray-300 font-bold">
							-
							<StarIcon className="w-3 h-3"/>
						</div>
						<div className="flex flex-row items-center justify-between text-xs text-center text-gray-300 font-bold">
							-
							<ClockIcon className="w-3 h-3"/>
						</div>
					</div>
				</div>
			) : isLoading ? (
				<div className="flex w-full h-full items-center p-1.5">
					<div className="flex-1 text-center text-3xl font-extralight p-1 text-gray-500">
						{dayData?.dayOfMonth}
					</div>
					<div className="basis-2/6  flex flex-col">
						<div className="flex flex-row items-center justify-between text-xs text-center text-gray-300 font-medium">
							{Math.trunc(dayData?.data?.earnings / 1000.0)}
							<BanknotesIcon className="w-3 h-3"/>
						</div>
						<div className="flex flex-row items-center justify-between text-xs text-center text-gray-300 font-medium">
							{dayData?.data.avgRating !== "NaN"
								? Number(dayData?.data?.avgRating).toFixed(2)
								: 0}{" "}
							<StarIcon className="w-3 h-3"/>
						</div>
						<div className="flex flex-row items-center justify-between text-xs text-center text-gray-300 font-medium">
							{dayData?.data.hoursWorked}
							<ClockIcon className="w-3 h-3"/>
						</div>
					</div>
				</div>
			) : (
				<Popover 
					onClickOutside={() => setIsPopoverVisible(false)}
					isOpen={isPopoverVisible}
					positions={['right','left']}
					content={
						<div className="transition-all border bg-white rounded p-1.5 flex flex-col gap-2 m-2">
							<div className="border-b px-2 py-1.5">{dayData?.month}, {dayData?.dayOfMonth}</div>
							<div className="flex flex-row gap-2 text-sm">
								<div 
									className="transition-all flex flex-row hover:text-blue-600 active:text-blue-700 hover:bg-blue-50 active:bg-blue-200 hover:cursor-pointer rounded px-3 py-1 gap-4 items-center"
									onClick={() => navigate(ADMIN_JOB_PAGE_URL, {state: {
										date: dayData?.data?.date
									}})}
								>
									<div>Jobs</div>
									<div className="text-xs bg-blue-600 text-white px-2 rounded">{dayData?.data?.jobsWorked || 0}</div>
								</div>
								<div 
									className="transition-all flex flex-row items-center hover:text-blue-600 active:text-blue-700 hover:bg-blue-50 active:bg-blue-200 hover:cursor-pointer rounded px-3 py-1 gap-4"
									onClick={() => navigate(ADMIN_SCHED_PAGE_URL, {state: {
										date: dayData?.data?.date
									}})}
								>
									<div>Schedules</div>
									<div className="text-xs bg-blue-600 text-white px-2 rounded">{dayData?.data?.scheduleList?.length || 0}</div>
								</div>
							</div>
						</div>
					}
				>
					<div 
					onClick={()=> {
						setIsPopoverVisible(true)
					}}
					className={`flex w-full h-full items-center p-1.5 relative hover:cursor-pointer rounded transition-all 
							${!dayData?.data?.scheduleList?.length ? "hover:bg-blue-50 active:bg-blue-100" : (
								hasUnfinishedSchedules() ? "bg-red-50 hover:bg-red-100 active:bg-red-200 outline outline-red-300" 
								: "bg-amber-50 hover:bg-amber-100 active:bg-amber-200 outline outline-amber-300" )}`}>
						<div className="flex-1  text-center text-3xl font-extralight p-1">
							{dayData?.dayOfMonth}
						</div>
						<div className="basis-2/6 flex flex-col">
							<div className="flex flex-row items-center justify-between text-xs text-center text-emerald-400 font-medium">
								{Math.trunc(dayData?.data?.earnings / 1000.0)}
								<BanknotesIcon className="w-3 h-3"/>
							</div>
							<div className="flex flex-row items-center justify-between text-xs text-center text-teal-400 font-medium">
								{dayData?.data.avgRating !== "NaN"
									? Number(dayData?.data?.avgRating).toFixed(2)
									: 0}{" "}
								<StarIcon className="w-3 h-3"/>
							</div>
							<div className="flex flex-row items-center justify-between text-xs text-center text-blue-500 font-medium">
								{dayData?.data.hoursWorked}
								<ClockIcon className="w-3 h-3"/>
							</div>
						</div>
					</div>
				</Popover>
			)}
		</div>
	);
}

export default CalenderDay;
