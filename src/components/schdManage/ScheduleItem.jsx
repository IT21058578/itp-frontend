import {
	ArrowPathIcon,
	CheckCircleIcon,
	CheckIcon,
	PencilIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import { Button } from "flowbite-react";
import ButtonGroup from "flowbite-react/lib/esm/components/Button/ButtonGroup";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";

function ScheduleItem() {
	const [isActive, setIsActive] = useState(false);
	const [bgClasses, setBgClasses] = useState("");

	useEffect(() => {
		resolveBgClasses();
	}, []);

	function resolveBgClasses() {
		let classes =
			"border shadow-lg rounded-md p-4 flex w-full flex-col gap-2 h-fit ";
		if (isActive === false) {
			classes += "bg-gray-200 border-gray-200";
		} else {
			classes += "bg-white border-gray-50";
		}
		setBgClasses(classes);
	}

	return (
		<Fragment>
			<div className={bgClasses}>
				<div className="flex flex-row">
					<div className="w-4/6">
						<div className="flex flex-row justify-between">
							{isActive ? (
								<div className="text-gray-700 text-lg">Restock Inventory</div>
							) : (
								<div className="text-gray-500 text-lg">Restock Inventory</div>
							)}
						</div>
						<div className="text-slate-500 text-sm">
							21st of September 2022 ( 9 / 21 / 2022 )
						</div>
						<div className="flex flex-row gap-2">
							<div className="text-slate-500 text-sm">10:38 AM</div>
							<div className="text-slate-400 text-sm">To</div>
							<div className="text-slate-500 text-sm">01:38 PM</div>
						</div>
					</div>
					<div className="w-2/6 flex flex-row justify-end gap-2">
						<Button color="failure">
							<TrashIcon className="h-6 w-6" />
						</Button>
						{isActive ? (
							<Button>
								<PencilIcon className="h-6 w-6" />
							</Button>
						) : (
							<Button disabled color="">
								<PencilIcon className="h-6 w-6" />
							</Button>
						)}
						{isActive ? (
							<Button color="success">
								<CheckCircleIcon className="h-6 w-6" />
							</Button>
						) : (
							<Button color="success">
								<ArrowPathIcon className="h-6 w-6" />
							</Button>
						)}
					</div>
				</div>
				{isActive ? (
					<div>Restock the inventory fully with some items.</div>
				) : (
					<div className="text-gray-500">
						Restock the inventory fully with some items.
					</div>
				)}
			</div>
		</Fragment>
	);
}

export default ScheduleItem;
