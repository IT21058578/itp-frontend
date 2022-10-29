import axios from "axios";
import React, { Fragment } from "react";
import { Button, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

const REVIEW_API_URL = process.env.REACT_APP_REVIEW_API_URL;

function ScheduleDeleteModal({ isActive, setIsActive, jobId }) {
	const [isLoading, setIsLoading] = useState(false);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

	const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
	const [successAlertClasses, setSuccessAlertClasses] = useState(
		"absolute border-2 border-green-600 rounded-lg z-50 transition-all invisible"
	);

	function validateSubmission() {
		sendReviewDeleteRequest();
	}

	function sendReviewDeleteRequest() {
		let cancelToken;
		setIsLoading(true);
		axios
			.delete(REVIEW_API_URL, {
				params: { jobId },
				cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
			})
			.then(() => {
				window.location.reload();
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
	return (
		<Fragment>
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
