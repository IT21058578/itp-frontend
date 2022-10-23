import React from "react";
import { useState, useEffect } from "react";

function CalenderDay({ isHeader, dayHeader, dayData, isLoading }) {
	const [headerClasses, setHeaderClasses] = useState("");
	const [isHover, setIsHover] = useState("");

	useEffect(() => {
		resolveDayHeaderClasses();
	}, []);

	function resolveDayHeaderClasses() {
		let classes = "flex w-full h-full items-center rounded-md ";
		if (dayHeader == "Sun" || dayHeader == "Sat") {
			classes += "bg-red-200 text-red-600";
		} else {
			classes += "bg-blue-200 text-blue-600";
		}
		setHeaderClasses(classes);
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
				<div className="flex w-full h-full items-center bg-gray-100 rounded-md p-1.5 hover:bg-gray-200">
					<div className="flex-1  text-center text-3xl font-extralight text-gray-500">
						{dayData?.dayOfMonth}
					</div>
					<div className="basis-2/6 flex flex-col rounded-md h-full">
						<div className=" text-xs text-center text-gray-300 font-bold">
							-
						</div>
						<div className=" text-xs text-center text-gray-300 font-bold">
							-
						</div>
						<div className=" text-xs text-center text-gray-300 font-bold">
							-
						</div>
					</div>
				</div>
			) : isLoading ? (
				<div className="flex w-full h-full items-center p-1.5">
					<div className="flex-1 text-center text-3xl font-extralight p-1 text-gray-500">
						{dayData?.dayOfMonth}
					</div>
					<div className="basis-2/6  flex flex-col">
						<div className=" text-xs text-center text-gray-300 font-medium">
							{dayData?.data.earnings?.toString().slice(0, 5) + "K"}
						</div>
						<div className=" text-xs text-center text-gray-300 font-medium">
							{dayData?.data.avgRating !== "NaN"
								? dayData?.data.avgRating.toString().slice(0, 5)
								: 0}
						</div>
						<div className=" text-xs text-center text-gray-300 font-medium">
							{dayData?.data.hoursWorked + "H"}
						</div>
					</div>
				</div>
			) : (
				<div className="flex w-full h-full items-center p-1.5 relative hover:bg-blue-50 hover:cursor-pointer active:bg-blue-100 rounded-md transition-all duration-75">
					<div className="flex-1  text-center text-3xl font-extralight p-1">
						{dayData?.dayOfMonth}
					</div>
					<div className="basis-2/6  flex flex-col">
						<div className=" text-xs text-center text-emerald-400 font-medium">
							{dayData?.data.earnings?.toString().slice(0, 5) + "K"}
						</div>
						<div className=" text-xs text-center text-teal-400 font-medium">
							{dayData?.data.avgRating !== "NaN"
								? dayData?.data.avgRating.toString().slice(0, 5)
								: 0}{" "}
						</div>
						<div className=" text-xs text-center text-blue-500 font-medium">
							{dayData?.data.hoursWorked + "H"}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CalenderDay;
