import axios from "axios";
import React, { useState, Fragment } from "react";
import {
	Button,
	Modal,
	Label,
	TextInput,
	Alert,
	Spinner,
} from "flowbite-react";
import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ScheduleUpdateContext } from "../../context";
import { useEffect } from "react";

const SCHEDULE_URL = process.env.REACT_APP_SCHEDULE_API_URL;

function ScheduleRenewModal({ isActive, setIsActive, scheduleDetails }) {
	const { setIsUpdated } = useContext(ScheduleUpdateContext);

	const [date, setDate] = useState("");
	const [dateHasErr, setDateHasErr] = useState(false);
	const [dateErrMsg, setDateErrMsg] = useState("");

	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [timeHasErr, setTimeHasErr] = useState(false);
	const [timeErrMsg, setTimeErrMsg] = useState("");

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
			setDate(scheduleDetails?.date);
			setStartTime(scheduleDetails?.startTime.slice(0, 5).toString());
			setEndTime(scheduleDetails?.endTime.slice(0, 5).toString());
		}
	}, [isActive, scheduleDetails]);

	useEffect(() => {
		resetErrors();
	}, [date, startTime, endTime]);

	function validateSubmission() {
		console.log("validateRenewSubmission");
		let hasAnyErr = false;

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

		//Call handleFunction.
		if (!hasAnyErr) {
			sendSchedulePutRequest(false);
		}
	}

	function sendSchedulePutRequest() {
		let cancelToken;
		resetErrors();
		setIsLoading(true);
		axios
			.put(
				SCHEDULE_URL,
				{
					id: scheduleDetails.id,
					title: scheduleDetails.title,
					description: scheduleDetails.description,
					isActive: true,
					active: true,
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
				setIsUpdated(true);
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
		setStartTime("");
		setEndTime("");
		setIsActive((prev) => !prev);
	}

	function resetErrors() {
		setIsLoading(false);
		setDateHasErr(false);
		setTimeHasErr(false);
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
				style={{ top: "88vh", left: "77.3vw" }}
			>
				<Alert icon={CheckCircleIcon} color="success" className="p-0 m-0">
					<span>
						<span className="font-medium">Renewed Schedule! </span>
						It is active again.
					</span>
				</Alert>
			</div>
			<Modal show={isActive} onClose={() => setIsActive(false)}>
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
									value={date}
									onChange={(e) => setDate(e.target.value)}
									color={dateHasErr ? "failure" : "gray"}
									disabled={isLoading}
									helperText={
										<Fragment>
											{dateHasErr ? (
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
											value={startTime}
											onChange={(e) => setStartTime(e.target.value)}
											color={timeHasErr ? "failure" : "gray"}
											disabled={isLoading}
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
											onChange={(e) => setEndTime(e.target.value)}
											color={timeHasErr ? "failure" : "gray"}
											disabled={isLoading}
										/>
									</div>
								</div>
							</div>
							<div>
								{timeHasErr ? (
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
							<ArrowPathIcon className="w-5 h-5 mr-2" />
							{isLoading ? (
								<Fragment>
									<div className="flex flex-row">
										<div className="mr-2">Renewing...</div>
										<Spinner size="sm" />
									</div>
								</Fragment>
							) : (
								"Renew"
							)}
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}

export default ScheduleRenewModal;
