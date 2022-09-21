import React from "react";
import { useState, useEffect } from "react";

function CalenderDay({ isHeader, dayHeader, dayData }) {
	const [headerClasses, setHeaderClasses] = useState("");

	useEffect(() => {
		resolveDayHeaderClasses();
	}, []);

	function resolveDayHeaderClasses() {
		let classes = "flex w-full h-full items-center rounded-md ";
		if (dayHeader == "Sun" || dayHeader == "Sat") {
			classes += "bg-red-200";
		} else {
			classes += "bg-blue-200";
		}
		setHeaderClasses(classes);
	}
	return (
		<div
			className="flex-1  flex p-2 items-center"
			style={{ maxWidth: "14.2857142857%", minWidth: "14.2857142857%" }}
		>
			{isHeader ? (
				<div className={headerClasses}>
					<div className="flex-1 p-2 text-center h-fit text-3xl font-light">
						{dayHeader}
					</div>
				</div>
			) : dayData.isDisabled ? (
				<div className="flex w-full h-full items-center bg-gray-100 rounded-md p-1.5">
					<div className="flex-1  text-center text-3xl font-extralight text-gray-500">
						{dayData.dayNum}
					</div>
					<div className="basis-2/6  flex flex-col">
						<div className=" text-xs text-center text-gray-300">0</div>
						<div className=" text-xs text-center text-gray-300">0</div>
						<div className=" text-xs text-center text-gray-300">0</div>
					</div>
				</div>
			) : (
				<div className="flex w-full h-full items-center p-1.5">
					<div className="flex-1  text-center text-3xl font-extralight p-1">
						{dayData.dayNum}
					</div>
					<div className="basis-2/6  flex flex-col">
						<div className=" text-xs text-center text-green-400">0</div>
						<div className=" text-xs text-center text-red-500">0</div>
						<div className=" text-xs text-center text-blue-500">0</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default CalenderDay;
