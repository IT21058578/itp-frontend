import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { Container, ScheduleItem } from "../components";
import { ScheduleDetails } from "../components";

function SchedItemListPage() {
	const [scheduleList, setScheduleList] = useState([]);
	useEffect(() => {
		initializeTestingData();
	}, []);

	function initializeTestingData() {
		let tempScheduleList = [];
		let scheduleDetails = new ScheduleDetails(
			"ObjectId('507f1f77bcf86cd799439011')",
			"Restock Inventory",
			"2022-09-21",
			"15:23",
			"12:54",
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
			true
		);
		tempScheduleList.push(scheduleDetails);
		setScheduleList(tempScheduleList);
	}

	function handleEdit(scheduleDetails) {
		console.log("Schedule Edited! making axios put request!", scheduleDetails);
	}

	function handleDelete(scheduleDetails) {
		console.log(
			"Schedule Deleted! making axios delete request!",
			scheduleDetails
		);
	}

	return (
		<Fragment>
			<div className="flex flex-col gap-2">
				<Container className="grow flex h-full w-full">
					<div className="flex w-full h-full gap-2 flex-row">
						<Container
							title="Search Options"
							className="flex-grow rounded-md justify-center p-3 w-1/6"
						></Container>
						<div className="flex-grow flex border p-2 rounded-md">
							{scheduleList.map((s, i) => (
								<ScheduleItem
									key={i}
									handleEdit={handleEdit}
									handleDelete={handleDelete}
									scheduleDetails={s}
								/>
							))}
						</div>
					</div>
				</Container>
			</div>
		</Fragment>
	);
}

export default SchedItemListPage;
