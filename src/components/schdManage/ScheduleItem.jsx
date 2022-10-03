import {
	ArrowPathIcon,
	CheckCircleIcon,
	PencilIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import { Button } from "flowbite-react";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";

function ScheduleItem({
	scheduleDetails,
	itemRef,
	setIsEditMdlActive,
	setIsCompletedMdlActive,
	setIsRenewMdlActive,
	setIsDeleteMdlActive,
}) {
	const [bgClasses, setBgClasses] = useState("");

	useEffect(() => {
		resolveBgClasses();
	});

	function resolveBgClasses() {
		let classes =
			"border shadow-lg rounded-md p-4 flex w-full flex-col gap-2 h-fit transition-all ";
		if (scheduleDetails.active === false) {
			classes += "bg-gray-200 border-gray-200 hover:bg-gray-300";
		} else {
			classes +=
				"bg-white border-gray-50 hover:bg-blue-50 hover:border-blue-100 ";
		}
		setBgClasses(classes);
	}

	return (
		<Fragment>
			<div className={bgClasses} ref={itemRef}>
				<div className="flex flex-row">
					<div className="w-4/6">
						<div className="flex flex-row justify-between">
							{scheduleDetails.active ? (
								<div className="text-gray-600 text-lg font-medium">
									{scheduleDetails.title}
								</div>
							) : (
								<div className="text-gray-500 text-lg font-medium">
									{scheduleDetails.title}
								</div>
							)}
						</div>
						<div className="text-slate-500 text-sm">{scheduleDetails.date}</div>
						<div className="flex flex-row gap-2">
							<div className="text-slate-500 text-sm">
								{scheduleDetails.startTime?.toString().slice(0, 5)}
							</div>
							<div className="text-slate-400 text-sm">To</div>
							<div className="text-slate-500 text-sm">
								{scheduleDetails.endTime?.toString().slice(0, 5)}
							</div>
						</div>
					</div>
					<div className="w-2/6 flex flex-row justify-end gap-2">
						<Button color="failure" onClick={() => setIsDeleteMdlActive(true)}>
							<TrashIcon className="h-6 w-6" />
						</Button>
						{scheduleDetails.active ? (
							<Button onClick={() => setIsEditMdlActive(true)}>
								<PencilIcon className="h-6 w-6" />
							</Button>
						) : (
							<Button disabled color="">
								<PencilIcon className="h-6 w-6" />
							</Button>
						)}
						{scheduleDetails.active ? (
							<Button
								color="success"
								onClick={() => setIsCompletedMdlActive(true)}
							>
								<CheckCircleIcon className="h-6 w-6" />
							</Button>
						) : (
							<Button color="success" onClick={() => setIsRenewMdlActive(true)}>
								<ArrowPathIcon className="h-6 w-6" />
							</Button>
						)}
					</div>
				</div>
				{scheduleDetails.active ? (
					<div>{scheduleDetails.description}</div>
				) : (
					<div className="text-gray-500">{scheduleDetails.description}</div>
				)}
			</div>
		</Fragment>
	);
}

export default ScheduleItem;
