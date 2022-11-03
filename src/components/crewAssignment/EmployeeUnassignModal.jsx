import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, Spinner } from "flowbite-react";
import { TrashIcon } from "@heroicons/react/24/solid";

const EMPLOYEE_ZONE_ASSIGN_URL =
	process.env.REACT_APP_EMPLOYEE_ZONE_ASSIGN_API_URL;
const ZONE_DATA_URL = process.env.REACT_APP_ZONE_API_URL;

function EmployeeUnassignModal({ isActive, setIsActive, employee, zoneId }) {
	const [zone, setZone] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

	useEffect(() => {
		sendZoneDataRequest();
	}, [zoneId]);

	useEffect(() => {
		setResponseHasErr(false);
	}, [zone]);

	function validateSubmission() {
		let hasAnyErr = false;
		if (!hasAnyErr) {
			sendEmployeePutRequest();
		}
	}

	function sendZoneDataRequest() {
		setIsLoading(true);
		let cancelToken;
		axios
			.get(ZONE_DATA_URL, {
				params: { id: zoneId },
				cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
			})
			.then((response) => {
				setZone(response.data);
			})
			.catch((err) => {
				setResponseHasErr(true);
				if (axios.isCancel(err)) {
					return;
				}
				if (err.response !== undefined) {
					setResponseErrMsg(
						"An error curred. Could not get zone data. Please try again later."
					);
				}
			})
			.then(() => setIsLoading(false));
	}

	function sendEmployeePutRequest() {
		let cancelToken;
		setIsLoading(true);
		axios({
			method: "put",
			url: EMPLOYEE_ZONE_ASSIGN_URL,
			params: { zoneId, unassign: true, employeeId: employee?.id },
			cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
		})
			.then((response) => {
				window.location.reload();
			})
			.catch((err) => {
				if (axios.isCancel(err)) {
					return;
				}
				setResponseHasErr(true);
				if (err.response?.status === 409) {
					setResponseErrMsg("Employee is already unassigned from this zone");
				} else if (err.response?.status < 500) {
					setResponseErrMsg(
						"A handled miscellaneous server error occured. Please try again."
					);
				} else if (err.response?.status >= 500) {
					setResponseErrMsg(
						"An unhandled miscellaneous server error occured. Please try again."
					);
				} else {
					console.log(err);
				}
			})
			.then(() => {
				setIsLoading(false);
			});
	}

	return (
		<>
			<Modal show={isActive} onClose={() => setIsActive(false)}>
				<Modal.Header>Unassign Employee from Zone</Modal.Header>
				<Modal.Body>
					<div className="flex flex-col">
						Are you sure you want to unassign an employee from the following
						zone? <br />
						<div className="flex flex-row gap-2 font-medium py-4 items-center">
							<span className="w-fit bg-blue-400 text-white px-4 py-1 rounded">
								{zone?.sign || "?"}
							</span>
							<span className="">{zone?.name || "?"}</span>
						</div>
						The employees will no longer be assigned to jobs from this zone even
						though the currently pending jobs will go forward.
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="flex gap-2 justify-end w-full items-center">
						{responseHasErr && !isLoading ? (
							<div className="text-red-600 text-sm flex-1 text-center">
								{responseErrMsg}
							</div>
						) : (
							""
						)}
						<div className="flex flex-row gap-2">
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
											<div className="mr-2">Unassigning...</div>
											<Spinner size="sm" />
										</div>
									</Fragment>
								) : (
									"Unassign"
								)}
							</Button>
						</div>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default EmployeeUnassignModal;
