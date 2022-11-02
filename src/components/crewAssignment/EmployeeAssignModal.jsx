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
const EMPLOYEE_ZONE_ASSIGN_URL = process.env.REACT_APP_EMPLOYEE_ASSIGN_API_URL;

function EmployeeAssignModal({ isActive, setIsActive, employee }) {
	const [zones, setZones] = useState([]);
	const [selectedZoneId, setSelectedZoneId] = useState("");

	const [isLoading, setIsLoading] = useState(true);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

	function sendEmployeePutRequest() {
		let cancelToken;
		setIsLoading(true);
		axios
			.put(EMPLOYEE_ZONE_ASSIGN_URL, {
				params: { zoneId: selectedZoneId, employee: employee?.id },
				cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
			})
			.then((response) => {
				setZones(response.data);
			})
			.catch((err) => {
				if (axios.isCancel(err)) {
					return;
				}
				setResponseHasErr(true);
				if (err.response.status === 409) {
					setResponseErrMsg("Employee is already assigned to this zone");
				} else if (err.response.status < 500) {
					setResponseErrMsg(
						"A miscellaneous client-side error occured. Please try again."
					);
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
				setZones(response.data);
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
							Please change the details of the employee as fit and press the
							submit button.
						</div>
						<div className="flex flex-row gap-4">
							<div className="h-full w-full">
								<div className="mb-2">
									<Label>Zone</Label>
								</div>
								<Select
									type="text"
									onChange={(e) => selectedZoneId(e.target.value)}
									disabled={isLoading}
								>
									{zones?.map((zone, i) => {
										<option value={zone?.id} key={i}>
											{zone?.sign} - {zone?.name}
										</option>;
									})}
								</Select>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
		</>
	);
}

export default EmployeeAssignModal;
