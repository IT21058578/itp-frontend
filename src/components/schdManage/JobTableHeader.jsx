import React from "react";
import {
	ChevronUpIcon,
	ChevronDownIcon,
	Bars2Icon,
} from "@heroicons/react/24/solid";

function JobTableHeader({
	dataName,
	title,
	sortCol,
	sortDir,
	handleSortChange,
}) {
	return (
		<div className="flex flex-row items-center">
			<div className="pr-2 h-fit">{title}</div>
			<div
				className="hover:cursor-pointer active:text-blue-500 w-fit"
				onClick={() => handleSortChange(dataName)}
			>
				{sortCol === dataName ? (
					sortDir !== "" ? (
						sortDir === "asc" ? (
							<ChevronUpIcon className="h-5 w-5" />
						) : (
							<ChevronDownIcon className="h-5 w-5" />
						)
					) : (
						<Bars2Icon className="h-5 w-5" />
					)
				) : (
					<Bars2Icon className="h-5 w-5" />
				)}
			</div>
		</div>
	);
}

export default JobTableHeader;
