import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { Container, ScheduleItem } from "../components";
import { ScheduleDetails } from "../components";

const SCHEDULE_URL = process.env.REACT_APP_SCHEDULE_API_URL;

function SchedItemListPage({ isDataUpdated, setIsDataUpdated }) {
	const [scheduleList, setScheduleList] = useState([]);

	useEffect(() => {
		if (!isDataUpdated) {
			console.log(SCHEDULE_URL);
			axios
				.get(SCHEDULE_URL)
				.then((response) => {
					console.log("Axios get succesful!", response.data);
					let data = response.data;
					data.forEach((s) => {
						s.startTime = s.startTime?.slice(0, 5);
						s.endTime = s.endTime?.slice(0, 5);
					});
					setScheduleList(data);
					setIsDataUpdated(true);
				})
				.catch((error) => console.log(error));
		}
	}, [isDataUpdated]);

	function handleEdit(scheduleDetails) {
		console.log("Schedule Edited! making axios put request!", scheduleDetails);
		axios
			.put(SCHEDULE_URL, scheduleDetails, {
				params: { id: scheduleDetails.id },
			})
			.then((response) => {
				console.log(response);
				setIsDataUpdated(false);
			});
	}

	function handleDelete(scheduleDetails) {
		console.log(
			"Schedule Deleted! making axios delete request!",
			scheduleDetails
		);
		axios
			.delete(SCHEDULE_URL, { params: { id: scheduleDetails.id } })
			.then((response) => {
				console.log(response);
				setIsDataUpdated(false);
			});
	}

	return (
		<Fragment>
			<div className="flex flex-col gap-2">
				<Container className="grow flex h-full w-full">
					<div className="flex w-full h-full gap-2 flex-row">
						<Container
							title="Search Options"
							className="flex-grow rounded-md justify-center p-3 w-2/6"
						></Container>
						<div
							className="flex-grow flex flex-col border p-2 gap-2 rounded-md overflow-y-scroll w-4/6"
							style={{ height: "77vh" }}
						>
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
