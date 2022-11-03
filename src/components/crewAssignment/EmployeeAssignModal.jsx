import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import {
	Button,
	Label,
	Modal,
	Select,
	Spinner,
	Textarea,
	TextInput,
} from "flowbite-react";
import React, { Fragment, useEffect, useState } from "react";

const ZONE_SEARCH_API_URL = process.env.REACT_APP_ZONE_SEARCH_API_URL;
const EMPLOYEE_ZONE_ASSIGN_URL =
	process.env.REACT_APP_EMPLOYEE_ZONE_ASSIGN_API_URL;

function EmployeeAssignModal({ isActive, setIsActive, employee }) {
	const [zones, setZones] = useState([]);

	const [selectedZoneId, setSelectedZoneId] = useState("");
	const [selectedZoneIdHasErr, setSelectedZoneIdHasErr] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

	useEffect(() => {
		getZoneList();
		setSelectedZoneId(zones[0]?.id || "");
	}, [employee]);

	function validateSubmission() {
		let hasAnyErr = false;

		setSelectedZoneIdHasErr(false);
		if (selectedZoneId === "") {
			setSelectedZoneIdHasErr(true);
			hasAnyErr = true;
		}

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
			params: {
				zoneId: selectedZoneId,
				unassign: false,
				employeeId: employee?.id,
			},
			cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
		})
			.then((response) => {
				setZones(response?.data || []);
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

	function getZoneList() {
		let cancelToken;
		setIsLoading(true);
		axios
			.post(
				ZONE_SEARCH_API_URL,
				{
					pgNum: 1,
					pgSize: 100,
				},
				{
					cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
				}
			)
			.then((response) => {
				setZones(response.data.content);
			})
			.catch((err) => {
				if (axios.isCancel(err)) {
					return;
				}
				setResponseHasErr(true);
				setResponseErrMsg("Some error occurred. Please try again.");
			})
			.then(() => {
				setIsLoading(false);
			});
	}

	return (
		<>
			<Modal show={isActive} onClose={() => setIsActive(false)}>
				<Modal.Header>Assign Employee to Zone</Modal.Header>
				<Modal.Body>
					<div className="flex flex-col">
						<div className="mb-2 text-gray-500">
							Please select a zone for the employee to be assigned to.
						</div>
						<div className="flex flex-row gap-4">
							<div className="h-full w-full">
								<div className="mb-2">
									<Label>Zone</Label>
								</div>
								<Select
									type="text"
									color={selectedZoneIdHasErr ? "failure" : "primary"}
									onChange={(e) => setSelectedZoneId(e.target.value)}
									disabled={isLoading}
								>
									{zones?.map((zone, i) => (
										<option value={zone?.id} key={i}>
											{zone?.sign} - {zone?.name}
										</option>
									))}
								</Select>
							</div>
						</div>
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
							<Button onClick={validateSubmission} disabled={isLoading}>
								<PaperAirplaneIcon className="h-5 w-5 mr-2" />
								{isLoading ? (
									<Fragment>
										<div className="flex flex-row">
											<div className="mr-2">Submitting...</div>
											<Spinner size="sm" />
										</div>
									</Fragment>
								) : (
									"Submit"
								)}
							</Button>
						</div>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default EmployeeAssignModal;
