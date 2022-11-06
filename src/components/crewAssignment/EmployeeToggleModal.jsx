import React, { Fragment, useState } from "react";
import { Button, Modal, Spinner } from "flowbite-react";
import axios from "axios";
import { ArrowPathIcon, HandRaisedIcon } from "@heroicons/react/24/solid";

const EMPLOYEE_ZONE_ASSIGN_URL = process.env.REACT_APP_EMPLOYEE_TOGGLE_URL;
function EmployeeToggleModal({ isActive, setIsActive, employee }) {
	const [isLoading, setIsLoading] = useState(false);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

	function validateSubmission() {
		let hasAnyErr = false;
		if (!hasAnyErr) {
			sendEmployeePutRequest();
		}
	}

	function sendEmployeePutRequest() {
		let cancelToken;
		setIsLoading(true);
		axios({
			method: "put",
			url: EMPLOYEE_ZONE_ASSIGN_URL,
			params: { disable: !employee?.disabled, id: employee?.id },
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
					setResponseErrMsg("Employee is already assigned to this zone");
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
				<Modal.Header>Toggle Employee</Modal.Header>
				<Modal.Body>
					<div className="flex flex-col">
						Are you sure you want to{" "}
						{employee?.disabled
							? "enable this employee again? They will be able to be assigned to jobs again."
							: "disable this employee? They will no longer be assigned to new jobs."}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="flex flex-row justify-end gap-4 w-full items-center">
						{responseHasErr ? (
							<div className="text-red-600 flex-1 text-sm text-center">
								{responseErrMsg}
							</div>
						) : (
							""
						)}
						<div className="">
							<Button
								color={employee.disabled ? "success" : "failure"}
								onClick={validateSubmission}
								disabled={isLoading}
							>
								{employee?.disabled ? (
									<ArrowPathIcon className="w-5 h-5 mr-2" />
								) : (
									<HandRaisedIcon className="w-5 h-5 mr-2" />
								)}
								{isLoading ? (
									<Fragment>
										<div className="flex flex-row">
											<div className="mr-2">
												{employee?.disabled ? "Enabling..." : "Disabling..."}
											</div>
											<Spinner size="sm" />
										</div>
									</Fragment>
								) : (
									<>{employee?.disabled ? "Enable" : "Disable"}</>
								)}
							</Button>
						</div>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default EmployeeToggleModal;