import React, { Fragment, useState } from "react";
import {
	Button,
	Modal,
	Label,
	TextInput,
	Textarea,
	Alert,
	Spinner,
} from "flowbite-react";
import axios from "axios";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/solid";
import { ScheduleUpdateContext } from "../../context";
import { useContext } from "react";

const SCHEDULE_URL = process.env.REACT_APP_SCHEDULE_API_URL;

function ScheduleCompleteModal({ isActive, setIsActive, scheduleDetails }) {
	const { setIsUpdated } = useContext(ScheduleUpdateContext);

	const [isLoading, setIsLoading] = useState(false);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

	const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
	const [successAlertClasses, setSuccessAlertClasses] = useState(
		"absolute border-2 border-green-600 rounded-lg z-50 transition-all invisible"
	);

	function validateSubmission() {
		sendSchedulePutRequest();
	}

	function sendSchedulePutRequest() {
		let cancelToken;
		setIsLoading(true);
		axios
			.put(
				SCHEDULE_URL,
				{
					id: scheduleDetails.id,
					title: scheduleDetails.title,
					description: scheduleDetails.description,
					isActive: false,
					date: scheduleDetails.date,
					startTime: scheduleDetails.startTime,
					endTime: scheduleDetails.endTime,
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
		setIsActive((prev) => !prev);
		setIsLoading(false);
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
				style={{ top: "88vh", left: "74.8vw" }}
			>
				<Alert icon={CheckCircleIcon} color="success" className="p-0 m-0">
					<span>
						<span className="font-medium">Schedule Completed! </span>
						It is no longer active.
					</span>
				</Alert>
			</div>
			<Modal show={isActive} onClose={() => setIsActive(false)}>
				<Modal.Header>Is this complete?</Modal.Header>
				<Modal.Body>
					Has this shedule been completed as specified? If so you can mark it as
					complete. Completed schedules can be renewed or deleted but they
					cannot be edited!{" "}
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
							<CheckIcon className="h-5 w-5 mr-2" />
							{isLoading ? (
								<Fragment>
									<div className="flex flex-row">
										<div className="mr-2">Completing...</div>
										<Spinner size="sm" />
									</div>
								</Fragment>
							) : (
								"Complete"
							)}
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}

export default ScheduleCompleteModal;
