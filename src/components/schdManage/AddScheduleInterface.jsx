import React, { useState, Fragment } from "react";
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import { ScheduleDetails } from "./ScheduleItem";
import axios from "axios";

const SCHEDULE_URL = process.env.REACT_APP_SCHEDULE_API_URL;

function AddScheduleInterface({ isDataUpdated, setIsDataUpdated }) {
	const [showModal, setShowModal] = useState(false);

	//For the modals data.
	const [tempTitle, setTempTitle] = useState("");
	const [tempDate, setTempDate] = useState("");
	const [tempStartTime, setTempStartTime] = useState("");
	const [tempEndTime, setTempEndTime] = useState("");
	const [tempDescription, setTempDescription] = useState("");

	//For modal validation.
	const [tempTitleHasErr, setTempTitleHasErr] = useState(false);
	const [tempDateHasErr, setTempDateHasErr] = useState(false);
	const [tempTimeHasErr, setTempTimeHasErr] = useState(false);
	const [tempDescriptionHasErr, setTempDescriptionHasErr] = useState(false);

	function validateSubmission() {
		let hasAnyErr = false;

		//Check Title (length)
		setTempTitleHasErr(false);
		if (tempTitle.length >= 50 || tempTitle.length === 0) {
			setTempTitleHasErr(true);
			hasAnyErr = true;
		}

		//Check Date (not before current date)
		setTempDateHasErr(false);
		let chosenDate = new Date(tempDate);
		let crntDate = new Date();
		if (chosenDate <= crntDate || tempDate === "") {
			setTempDateHasErr(true);
			hasAnyErr = true;
		}

		//Check Time (startTime < endTime)
		let startTimeArr = tempStartTime.split(":");
		let endTimeArr = tempEndTime.split(":");
		let startTimeReal = new Date(0, 0, 0, startTimeArr[0], startTimeArr[1]);
		let endTimeReal = new Date(0, 0, 0, endTimeArr[0], endTimeArr[1]);
		setTempTimeHasErr(false);
		if (
			startTimeReal > endTimeReal ||
			tempStartTime === "" ||
			tempEndTime === ""
		) {
			setTempTimeHasErr(true);
			hasAnyErr = true;
		}

		//Check Description (length)
		setTempDescriptionHasErr(false);
		if (tempDescription.length >= 100 || tempDescription.length === 0) {
			setTempDescriptionHasErr(true);
			hasAnyErr = true;
		}

		//Call handleFunction. Takes in a ScheduleDetails object.
		if (!hasAnyErr) {
			const editedScheduleDetails = new ScheduleDetails(
				null,
				tempTitle,
				tempDate,
				tempStartTime,
				tempEndTime,
				tempDescription,
				true
			);
			handleSubmit(editedScheduleDetails);
			setShowModal(false);
			setTempTitle("");
			setTempDate("");
			setTempStartTime("");
			setTempEndTime("");
			setTempDescription("");
		}
	}

	function handleSubmit(scheduleDetails) {
		console.log("Schedule created! Making axios post request", scheduleDetails);
		axios.post(SCHEDULE_URL, scheduleDetails).then((response) => {
			console.log(response);
			setIsDataUpdated(false);
		});
	}

	return (
		<div>
			<Button onClick={() => setShowModal(true)}>Add Schedule</Button>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<Modal.Header>Edit Schedule</Modal.Header>
				<Modal.Body>
					<div className="flex flex-col gap-4">
						<div>
							<div className="mb-2">
								<Label value="Title" />
							</div>
							<div>
								<TextInput
									type="text"
									placeholder="Title here..."
									value={tempTitle}
									onChange={(e) => setTempTitle(e.target.value)}
									color={tempTitleHasErr ? "failure" : "gray"}
									helperText={
										<Fragment>
											{tempTitleHasErr ? (
												<span className="text-red-600">
													Title cannot be empty and must be less than 50
													characters!
												</span>
											) : (
												""
											)}
										</Fragment>
									}
								/>
							</div>
						</div>
						<div className="flex flex-row gap-4">
							<div className="flex-1">
								<div className="mb-2">
									<Label value="Date" />
								</div>
								<div>
									<TextInput
										type="date"
										placeholder="Title here..."
										value={tempDate}
										onChange={(e) => setTempDate(e.target.value)}
										color={tempDateHasErr ? "failure" : "gray"}
										helperText={
											<Fragment>
												{tempDateHasErr ? (
													<span className="text-red-600">
														Date cannot be empty and must be a future date!
													</span>
												) : (
													""
												)}
											</Fragment>
										}
									/>
								</div>
							</div>
							<div className="border-r" />
							<div className="flex flex-col w-2/4">
								<div className="flex-1 flex flex-row gap-4">
									<div>
										<div className="mb-2">
											<Label value="Start time" />
										</div>
										<div>
											<TextInput
												type="time"
												placeholder="Title here..."
												value={tempStartTime}
												onChange={(e) => setTempStartTime(e.target.value)}
												color={tempTimeHasErr ? "failure" : "gray"}
											/>
										</div>
									</div>
									<div>
										<div className="mb-2">
											<Label value="End time" />
										</div>
										<div>
											<TextInput
												type="time"
												placeholder="Title here..."
												value={tempEndTime}
												onChange={(e) => setTempEndTime(e.target.value)}
												color={tempTimeHasErr ? "failure" : "gray"}
											/>
										</div>
									</div>
								</div>
								<div className="">
									{tempTimeHasErr ? (
										<p className="text-red-600 text-sm leading-snug">
											Times must not be empty, Start Time must be before End
											Time
										</p>
									) : (
										""
									)}
								</div>
							</div>
						</div>
						<div>
							<div className="mb-2">
								<Label value="Description" />
							</div>
							<div>
								<Textarea
									placeholder="Type your description here..."
									rows={5}
									style={{ resize: "none", fontSize: "0.90em" }}
									value={tempDescription}
									onChange={(e) => setTempDescription(e.target.value)}
									color={tempDescriptionHasErr ? "failure" : "gray"}
									helperText={
										<Fragment>
											{tempDescriptionHasErr ? (
												<span className="text-red-600">
													Description cannot be empty and must be less than 100
													characters long!
												</span>
											) : (
												""
											)}
										</Fragment>
									}
								/>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="flex gap-2 justify-end w-full">
						<Button color="gray" onClick={() => setShowModal(false)}>
							Cancel
						</Button>

						<Button onClick={validateSubmission}>Submit</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default AddScheduleInterface;
