import {
	ArrowPathIcon,
	CheckCircleIcon,
	PencilIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import { Button, Modal, Label, TextInput, Textarea } from "flowbite-react";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";

export class ScheduleDetails {
	constructor(id, title, date, startTime, endTime, description, isActive) {
		this.id = id;
		this.title = title;
		this.date = date;
		this.startTime = startTime;
		this.endTime = endTime;
		this.description = description;
		this.isActive = isActive;
	}
}

function ScheduleItem({ handleEdit, handleDelete, scheduleDetails }) {
	const [bgClasses, setBgClasses] = useState("");

	//For modal toggling.
	const [isEditMdlActive, setIsEditMdlActive] = useState(false);
	const [isDeleteMdlActive, setIsDeleteMdlActive] = useState(false);
	const [isRenewMdlActive, setIsRenewMdlActive] = useState(false);
	const [isCompleteMdlActive, setIsCompleteMdlActive] = useState(false);

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

	useEffect(() => {
		resolveBgClasses();
	}, []);

	function showEditModal() {
		setTempTitle(scheduleDetails.title);
		setTempDate(scheduleDetails.date);
		setTempStartTime(scheduleDetails.startTime);
		setTempEndTime(scheduleDetails.endTime);
		setTempDescription(scheduleDetails.description);

		setIsEditMdlActive(true);
	}

	function showRenewModal() {
		setTempDate(scheduleDetails.date);
		setTempStartTime(scheduleDetails.startTime);
		setTempEndTime(scheduleDetails.endTime);

		setIsRenewMdlActive(true);
	}

	function handleTempTitleChange(e) {
		setTempTitle(e.target.value);
	}

	function handleTempDateChange(e) {
		setTempDate(e.target.value);
	}

	function handleTempStartTimeChange(e) {
		setTempStartTime(e.target.value);
	}

	function handleTempEndTimeChange(e) {
		setTempEndTime(e.target.value);
	}

	function handleTempDescriptionChange(e) {
		setTempDescription(e.target.value);
	}

	function validateEditSubmission() {
		let hasAnyErr = false;

		//Check Title (length)
		setTempTitleHasErr(false);
		if (tempTitle.length >= 50 || tempTitle.length == 0) {
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
				scheduleDetails.id,
				tempTitle,
				tempDate,
				tempStartTime,
				tempEndTime,
				tempDescription,
				scheduleDetails.isActive
			);
			handleEdit(editedScheduleDetails);
		}
	}

	function validateRenewSubmssion() {
		console.log("validateRenewSubmission");
		let hasAnyErr = false;

		//Check Date (not before current date)
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

		//Call handleFunction.
		if (!hasAnyErr) {
			const editedScheduleDetails = new ScheduleDetails(
				scheduleDetails.id,
				scheduleDetails.title,
				tempDate,
				tempStartTime,
				tempEndTime,
				scheduleDetails.description,
				scheduleDetails.isActive
			);
			handleEdit(editedScheduleDetails);
		}
	}

	function validateCompleteSubmission() {
		console.log("validateCompleteSubmission");
		const editedScheduleDetails = new ScheduleDetails(
			scheduleDetails.id,
			scheduleDetails.title,
			tempDate,
			tempStartTime,
			tempEndTime,
			scheduleDetails.description,
			false
		);
		handleEdit(editedScheduleDetails);
	}

	function resolveBgClasses() {
		let classes =
			"border shadow-lg rounded-md p-4 flex w-full flex-col gap-2 h-fit ";
		if (scheduleDetails.isActive === false) {
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
							{scheduleDetails.isActive ? (
								<div className="text-gray-700 text-lg">
									{scheduleDetails.title}
								</div>
							) : (
								<div className="text-gray-500 text-lg">
									{scheduleDetails.title}
								</div>
							)}
						</div>
						<div className="text-slate-500 text-sm">{scheduleDetails.date}</div>
						<div className="flex flex-row gap-2">
							<div className="text-slate-500 text-sm">
								{scheduleDetails.startTime}
							</div>
							<div className="text-slate-400 text-sm">To</div>
							<div className="text-slate-500 text-sm">
								{scheduleDetails.endTime}
							</div>
						</div>
					</div>
					<div className="w-2/6 flex flex-row justify-end gap-2">
						<Button color="failure" onClick={() => setIsDeleteMdlActive(true)}>
							<TrashIcon className="h-6 w-6" />
						</Button>
						{scheduleDetails.isActive ? (
							<Button onClick={showEditModal}>
								<PencilIcon className="h-6 w-6" />
							</Button>
						) : (
							<Button disabled color="">
								<PencilIcon className="h-6 w-6" />
							</Button>
						)}
						{scheduleDetails.isActive ? (
							<Button
								color="success"
								onClick={() => setIsCompleteMdlActive(true)}
							>
								<CheckCircleIcon className="h-6 w-6" />
							</Button>
						) : (
							<Button color="success" onClick={showRenewModal}>
								<ArrowPathIcon className="h-6 w-6" />
							</Button>
						)}
					</div>
				</div>
				{scheduleDetails.isActive ? (
					<div>{scheduleDetails.description}</div>
				) : (
					<div className="text-gray-500">{scheduleDetails.description}</div>
				)}
			</div>

			<Modal show={isEditMdlActive} onClose={() => setIsEditMdlActive(false)}>
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
									onChange={handleTempTitleChange}
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
										onChange={handleTempDateChange}
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
												onChange={handleTempStartTimeChange}
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
												onChange={handleTempEndTimeChange}
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
									onChange={handleTempDescriptionChange}
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
						<Button color="gray" onClick={() => setIsEditMdlActive(false)}>
							Cancel
						</Button>

						<Button onClick={validateEditSubmission}>Submit</Button>
					</div>
				</Modal.Footer>
			</Modal>

			<Modal
				show={isDeleteMdlActive}
				onClose={() => setIsDeleteMdlActive(false)}
			>
				<Modal.Header>Are you sure?</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete this Schedule? It will be lost
					forever!
				</Modal.Body>
				<Modal.Footer>
					<div className="flex gap-2 justify-end w-full">
						<Button color="gray" onClick={() => setIsDeleteMdlActive(false)}>
							Cancel
						</Button>
						<Button
							onClick={() => handleDelete(scheduleDetails)}
							color="failure"
						>
							Delete
						</Button>
					</div>
				</Modal.Footer>
			</Modal>

			<Modal show={isRenewMdlActive} onClose={() => setIsRenewMdlActive(false)}>
				<Modal.Header>Renew Schedule</Modal.Header>
				<Modal.Body>
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
									onChange={handleTempDateChange}
									color={tempDateHasErr ? "failure" : "gray"}
									helperText={
										<Fragment>
											{tempDateHasErr ? (
												<span className="text-red-600">
													Date has to be a future date!
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
						<div className="flex flex-col">
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
											onChange={handleTempStartTimeChange}
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
											onChange={handleTempEndTimeChange}
											color={tempTimeHasErr ? "failure" : "gray"}
										/>
									</div>
								</div>
							</div>
							<div>
								{tempTimeHasErr ? (
									<span className="text-red-600 text-sm">
										Times are unclear!
									</span>
								) : (
									""
								)}
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="flex gap-2 justify-end w-full">
						<Button color="gray" onClick={() => setIsRenewMdlActive(false)}>
							Cancel
						</Button>

						<Button onClick={validateRenewSubmssion}>Renew</Button>
					</div>
				</Modal.Footer>
			</Modal>

			<Modal
				show={isCompleteMdlActive}
				onClose={() => setIsCompleteMdlActive(false)}
			>
				<Modal.Header>Is this complete?</Modal.Header>
				<Modal.Body>
					Has this shedule been completed as specified? If so you can mark it as
					complete. Completed schedules can be renewed or deleted but they
					cannot be edited!{" "}
				</Modal.Body>
				<Modal.Footer>
					<div className="flex gap-2 justify-end w-full">
						<Button color="gray" onClick={() => setIsCompleteMdlActive(false)}>
							Cancel
						</Button>

						<Button onClick={validateCompleteSubmission}>Complete</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}

export default ScheduleItem;
