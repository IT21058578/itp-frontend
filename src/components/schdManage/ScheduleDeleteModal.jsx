import axios from "axios";
import React, { Fragment } from "react";
import { Alert, Button, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ScheduleUpdateContext } from "../../context";

const SCHEDULE_URL = process.env.REACT_APP_SCHEDULE_API_URL;

function ScheduleDeleteModal({ isActive, setIsActive, scheduleDetails }) {
	const { setIsUpdated } = useContext(ScheduleUpdateContext);

	const [isLoading, setIsLoading] = useState(false);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

	const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
	const [successAlertClasses, setSuccessAlertClasses] = useState(
		"absolute border-2 border-green-600 rounded-lg z-50 transition-all invisible"
	);

	function validateSubmission() {
		sendScheduleDeleteRequest();
	}

	function sendScheduleDeleteRequest() {
		let cancelToken;
		setIsLoading(true);
		axios
			.delete(SCHEDULE_URL, {
				params: { id: scheduleDetails.id },
				cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
			})
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
				style={{ top: "88vh", left: "78.3vw" }}
			>
				<Alert icon={CheckCircleIcon} color="success" className="p-0 m-0">
					<span>
						<span className="font-medium">Deleted Schedule! </span>
						Its gone forever.
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
						<Button
							onClick={validateSubmission}
							color="failure"
							disabled={isLoading}
						>
							<TrashIcon className="w-5 h-5 mr-2" />
							{isLoading ? (
								<Fragment>
									<div className="flex flex-row">
										<div className="mr-2">Deleting...</div>
										<Spinner size="sm" />
									</div>
								</Fragment>
							) : (
								"Delete"
							)}
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</Fragment>
	);
}

export default ScheduleDeleteModal;
