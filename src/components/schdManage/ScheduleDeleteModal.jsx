import axios from "axios";
import React, { Fragment } from "react";
import { Alert, Button, Modal } from "flowbite-react";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const SCHEDULE_URL = process.env.REACT_APP_SCHEDULE_API_URL;

function ScheduleDeleteModal({ isActive, setIsActive, scheduleData }) {
	const [isLoading, setIsLoading] = useState(false);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

	const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
	const [successAlertClasses, setSuccessAlertClasses] = useState(
		"absolute border-2 border-green-600 rounded-lg z-50 transition-all hidden"
	);

	function validateSubmission() {
		sendScheduleDeleteRequest();
	}

	function sendScheduleDeleteRequest() {
		let cancelToken;
		setIsLoading(false);
		axios
			.delete(SCHEDULE_URL, {
				params: { id: scheduleData.id },
				cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
			})
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
				<Modal.Header>Are you sure?</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete this Schedule? It will be lost
					forever!
				</Modal.Body>
				<Modal.Footer>
					<div className="flex gap-2 justify-end w-full">
						<Button color="gray" onClick={() => setIsActive(false)}>
							Cancel
						</Button>
						<Button onClick={validateSubmission} color="failure">
							Delete
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}

export default ScheduleDeleteModal;
