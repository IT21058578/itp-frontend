import React, { useState, Fragment } from "react";
import {
	Alert,
	Button,
	Label,
	Modal,
	Spinner,
	Textarea,
	TextInput,
} from "flowbite-react";
import axios, { Axios } from "axios";
import { CheckCircleIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ScheduleUpdateContext } from "../../context";
import { useEffect } from "react";

const SCHEDULE_URL = process.env.REACT_APP_SCHEDULE_API_URL;

function ScheduleCreateModal({ isActive, setIsActive }) {
	const { setIsUpdated } = useContext(ScheduleUpdateContext);

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

	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitErr, setIsSubmitErr] = useState(false);
	const [submitErrMsg, setSubmitErrMsg] = useState("");

	const [successAlertClasses, setSuccessAlertClasses] = useState(
		"absolute border-2 border-green-600 rounded-lg z-50 transition-all invisible"
	);

	useEffect(() => {
		resetErrors();
	}, [tempTitle, tempDate, tempStartTime, tempEndTime, tempDescription]);

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
			handleSubmit({
				title: tempTitle,
				date: tempDate,
				startTime: tempStartTime,
				endTime: tempEndTime,
				description: tempDescription,
				isActive: true,
				active: true,
			});
		}
	}

	function handleSubmit(scheduleDetails) {
		setIsLoading(true);
		resetErrors();
		let cancelToken;
		axios
			.post(SCHEDULE_URL, scheduleDetails, {
				cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
			})
			.then(() => {
				resetModal();
				toggleAlert();
				setIsUpdated(true);
			})
			.catch((err) => {
				if (axios.isCancel(err)) {
					return;
				} else {
					setIsSubmitErr(true);
					setSubmitErrMsg("An error occurred, Please try again.");
				}
			})
			.then(() => {
				setIsLoading(false);
			});
	}

	function resetErrors() {
		setTempTitleHasErr(false);
		setTempDateHasErr(false);
		setTempDescriptionHasErr(false);
		setTempTimeHasErr(false);
		setIsSubmitErr(false);
	}

	function resetModal() {
		setTempTitle("");
		setTempDate("");
		setTempStartTime("");
		setTempEndTime("");
		setTempDescription("");
		setIsActive(false);
	}

	function toggleAlert() {
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
				style={{ top: "88vh", left: "66.5vw" }}
			>
				<Alert icon={CheckCircleIcon} color="success" className="p-0 m-0">
					<span>
						<span className="font-medium">Submitted Schedule! </span>
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
					<div className="flex gap-2 justify-end w-full items-center">
						{isSubmitErr ? (
							<div className="text-red-600 text-sm flex-1 text-center">
								{submitErrMsg}
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
						<Button
							onClick={validateSubmission}
							disabled={isLoading}
							className="transition-all"
						>
							<PaperAirplaneIcon className="h-5 w-5 mr-2" />
							{isLoading ? (
								<div className="flex flex-row">
									<div className="mr-2">Submitting...</div>
									<Spinner size="sm" />
								</div>
							) : (
								"Submit"
							)}
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}

export default ScheduleCreateModal;
