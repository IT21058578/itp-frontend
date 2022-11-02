import axios from "axios";
import React, { Fragment } from "react";
import { Button, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Navigate, useNavigate } from "react-router-dom";

const ZONE_API_URL = process.env.REACT_APP_ZONE_API_URL;

function ZoneDeleteModal({ isActive, setIsActive, zone }) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

	const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
	const [successAlertClasses, setSuccessAlertClasses] = useState(
		"absolute border-2 border-green-600 rounded-lg z-50 transition-all invisible"
	);

	function validateSubmission() {
		sendZoneDeleteRequest();
	}

	function sendZoneDeleteRequest() {
		let cancelToken;
		setIsLoading(true);
		axios
			.delete(ZONE_API_URL, {
				params: { id: zone?.id },
				cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
			})
			.then(() => {
				navigate(-1);
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
		<>
			<Modal show={isActive} onClose={() => setIsActive(false)}>
				<Modal.Header>Delete existing zone</Modal.Header>
				<Modal.Body>
					<div className="flex flex-col">
						Are you sure you want to delete the following zone? <br />
						<div className="flex flex-row gap-2 font-medium py-4 items-center">
							<span className="w-fit bg-blue-400 text-white px-4 py-1 rounded">
								{zone?.sign || "?"}
							</span>
							<span className="">{zone?.name || "?"}</span>
						</div>
						The employees will be unassigned and all relevant jobs will be left
						with no corresponding zone. It may be a better idea to disable this
						zone first.
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
		</>
	);
}

export default ZoneDeleteModal;
