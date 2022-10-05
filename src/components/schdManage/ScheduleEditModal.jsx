import axios from "axios";
import React, { useState, Fragment } from "react";
import {
	Button,
	Modal,
	Label,
	TextInput,
	Textarea,
	Alert,
	Spinner,
} from "flowbite-react";
import { CheckCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ScheduleUpdateContext } from "../../context";
import { useEffect } from "react";

const descCharCount = 200;
const titleCharCount = 50;
const SCHEDULE_URL = process.env.REACT_APP_SCHEDULE_API_URL;

function ScheduleEditModal({ isActive, setIsActive, scheduleDetails }) {
	const { setIsUpdated } = useContext(ScheduleUpdateContext);

	const [title, setTitle] = useState("");
	const [titleHasErr, setTitleHasErr] = useState(false);
	const [titleErrMsg, setTitleErrMsg] = useState("");

	const [date, setDate] = useState("");
	const [dateHasErr, setDateHasErr] = useState(false);
	const [dateErrMsg, setDateErrMsg] = useState("");

	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [timeHasErr, setTimeHasErr] = useState(false);
	const [timeErrMsg, setTimeErrMsg] = useState("");

	const [description, setDescription] = useState("");
	const [descriptionHasErr, setDescriptionHasErr] = useState(false);
	const [descriptionErrMsg, setDescriptionErrMsg] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

	const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
	const [successAlertClasses, setSuccessAlertClasses] = useState(
		"absolute border-2 border-green-600 rounded-lg z-50 transition-all invisible"
	);

	useEffect(() => {
		if (isActive === true) {
			console.log("Opened! ", scheduleDetails);
			setTitle(scheduleDetails?.title);
			setDate(scheduleDetails?.date);
			setStartTime(scheduleDetails?.startTime.slice(0, 5).toString());
			setEndTime(scheduleDetails?.endTime.slice(0, 5).toString());
			setDescription(scheduleDetails?.description);
		}
	}, [isActive, scheduleDetails]);

	useEffect(() => {
		resetErrors();
	}, [title, date, startTime, endTime, description]);

	function validateSubmission() {
		let hasAnyErr = false;

		//Check Title (length)
		setTitleHasErr(false);
		if (title.length >= titleCharCount || title.length === 0) {
			setTitleHasErr(true);
			hasAnyErr = true;
		}

		//Check Date (not before current date)
		//Check Date (not before current date)
		setDateHasErr(false);
		let chosenDate = new Date(date);
		let crntDate = new Date();
		if (chosenDate <= crntDate || date === "") {
			setDateHasErr(true);
			hasAnyErr = true;
		}

		//Check Time (startTime < endTime)
		let startTimeArr = startTime.split(":");
		let endTimeArr = endTime.split(":");
		let startTimeReal = new Date(0, 0, 0, startTimeArr[0], startTimeArr[1]);
		let endTimeReal = new Date(0, 0, 0, endTimeArr[0], endTimeArr[1]);
		setTimeHasErr(false);
		if (startTimeReal > endTimeReal || startTime === "" || endTime === "") {
			setTimeHasErr(true);
			hasAnyErr = true;
		}

		//Check Description (length)
		setDescriptionHasErr(false);
		if (description.length >= descCharCount || description.length === 0) {
			setDescriptionHasErr(true);
			hasAnyErr = true;
		}

		//Call handleFunction. Takes in a ScheduleDetails object.
		if (!hasAnyErr) {
			sendSchedulePutRequest();
		}
	}

	function sendSchedulePutRequest() {
		let cancelToken;
		setIsLoading(true);
		resetErrors();
		axios
			.put(
				SCHEDULE_URL,
				{
					id: scheduleDetails.id,
					title,
					description,
					isActive: true,
					date,
					startTime,
					endTime,
				},
				{
					params: { id: scheduleDetails.id },
					cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
				}
			)
			.then(() => {
				togglealert();
				resetModal();
			})
			.catch((err) => {
				if (axios.isCancel(err)) {
					return;
				}
				setResponseHasErr(true);
				if (err.response.status === 404) {
					setResponseErrMsg("Schedule was not found. It no longer exists.");
				} else if (err.response.status >= 500) {
					setResponseErrMsg(
						"A miscellaneous server error occured. Please try again."
					);
				}
			})
			.then(() => {
				setIsLoading(false);
			});
	}

	function resetModal() {
		setDate("");
		setTitle("");
		setStartTime("");
		setEndTime("");
		setDescription("");
		setIsActive((prev) => !prev);
	}

	function resetErrors() {
		setIsLoading(false);
		setDateHasErr(false);
		setTimeHasErr(false);
		setTitleHasErr(false);
		setDescriptionHasErr(false);
		setResponseHasErr(false);
	}

	function togglealert() {
		setSuccessAlertClasses(
			"absolute border-2 border-green-600 rounded-lg z-50 transition-all visible opacity-100"
		);
		setTimeout(() => {
			setSuccessAlertClasses(
				"absolute border-2 border-green-600 rounded-lg z-50 transition-all visible opacity-0"
			);
		}, 2000);
		setTimeout(() => {
			setSuccessAlertClasses(
				"absolute border-2 border-green-600 rounded-lg z-50 transition-all invisible opacity-0"
			);
		}, 2200);
	}

	return (
		<Fragment>
			<div
				className={successAlertClasses}
				style={{ top: "88vh", left: "68.2vw" }}
			>
				<Alert icon={CheckCircleIcon} color="success" className="p-0 m-0">
					<span>
						<span className="font-medium">Edited Schedule! </span>
						You can now view it in the schedules tab
					</span>
				</Alert>
			</div>
			<Modal show={isActive} onClose={() => setIsActive(false)}>
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
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									color={titleHasErr ? "failure" : "gray"}
									disabled={isLoading}
									helperText={
										<Fragment>
											{titleHasErr ? (
												<span className="text-red-600">
													Title cannot be empty and must be less than{" "}
													{titleCharCount} characters!
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
										value={date}
										onChange={(e) => setDate(e.target.value)}
										color={dateHasErr ? "failure" : "gray"}
										disabled={isLoading}
										helperText={
											<Fragment>
												{dateHasErr ? (
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
												value={startTime}
												disabled={isLoading}
												onChange={(e) => setStartTime(e.target.value)}
												color={timeHasErr ? "failure" : "gray"}
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
												value={endTime}
												disabled={isLoading}
												onChange={(e) => setEndTime(e.target.value)}
												color={timeHasErr ? "failure" : "gray"}
											/>
										</div>
									</div>
								</div>
								<div className="">
									{timeHasErr ? (
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
									value={description}
									disabled={isLoading}
									onChange={(e) => setDescription(e.target.value)}
									color={descriptionHasErr ? "failure" : "gray"}
									helperText={
										<Fragment>
											{descriptionHasErr ? (
												<span className="text-red-600">
													Description cannot be empty and must be less than
													{" " + descCharCount + " "}
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
					<div className="flex gap-2 justify-end w-full items-center">
						{responseHasErr ? (
							<div className="text-red-600 text-sm flex-1 text-center">
								{responseErrMsg}
							</div>
						) : (
							""
						)}
						<Button
							color="gray"
							onClick={() => setIsActive(false)}
							disabled={isLoading}
						>
							Cancel
						</Button>

						<Button onClick={validateSubmission} disabled={isLoading}>
							<PaperAirplaneIcon className="h-5 w-5 mr-2" />
							{isLoading ? (
								<Fragment>
									<div className="flex flex-row">
										<div className="mr-2">Editing...</div>
										<Spinner size="sm" />
									</div>
								</Fragment>
							) : (
								"Edit"
							)}
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}

export default ScheduleEditModal;
