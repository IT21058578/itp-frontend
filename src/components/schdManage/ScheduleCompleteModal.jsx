import React, { Fragment, useState } from "react";
import {
	Button,
	Modal,
	Label,
	TextInput,
	Textarea,
	Alert,
} from "flowbite-react";
import axios from "axios";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const SCHEDULE_URL = process.env.REACT_APP_SCHEDULE_API_URL;

function ScheduleCompleteModal({ isActive, setIsActive, scheduleData }) {
	const [isLoading, setIsLoading] = useState(false);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

	const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
	const [successAlertClasses, setSuccessAlertClasses] = useState(
		"absolute border-2 border-green-600 rounded-lg z-50 transition-all hidden"
	);

	function validateSubmission() {
		sendSchedulePutRequest();
	}

	function sendSchedulePutRequest() {
		let cancelToken;
		setIsLoading(false);
		axios
			.put(
				"",
				{
					id: scheduleData.id,
					title: scheduleData.title,
					description: scheduleData.description,
					isActive: false,
					date: scheduleData.date,
					startTime: scheduleData.startTime,
					endTime: scheduleData.endTime,
				},
				{ cancelToken: new axios.CancelToken((c) => (cancelToken = c)) }
			)
			.then()
			.catch((err) => {
				if (axios.isCancel(err)) {
					return;
				}
			})
			.then(() => {
				setIsLoading(false);
			});
	}

	function resetModal() {}

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
				<Modal.Header>Is this complete?</Modal.Header>
				<Modal.Body>
					Has this shedule been completed as specified? If so you can mark it as
					complete. Completed schedules can be renewed or deleted but they
					cannot be edited!{" "}
				</Modal.Body>
				<Modal.Footer>
					<div className="flex gap-2 justify-end w-full">
						<Button color="gray" onClick={() => setIsActive(false)}>
							Cancel
						</Button>

						<Button onClick={validateSubmission}>Complete</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}

export default ScheduleCompleteModal;
