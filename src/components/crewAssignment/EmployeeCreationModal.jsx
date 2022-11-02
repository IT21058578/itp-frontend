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
import React, { Fragment, useState } from "react";

const jobTitleList = [
	{
		value: "DRIVER",
		display: "Driver",
	},
	{
		value: "CLEANER",
		display: "Cleaner",
	},
];
const EMPLOYEE_API_URL = process.env.REACT_APP_EMPLOYEE_API_URL;

function EmployeeCreationModal({ isActive, setIsActive }) {
	const firstNameMaxLength = 50;
	const [firstName, setFirstName] = useState("");
	const [firstNameHasErr, setFirstNameHasErr] = useState(false);

	const lastNameMaxLength = 50;
	const [lastName, setLastName] = useState("");
	const [lastNameHasErr, setLastNameHasErr] = useState(false);

	const [jobTitle, setJobTitle] = useState(jobTitleList[0].value);
	const [jobTitleHasErr, setJobTitleHasErr] = useState(false);

	const [mobile, setMobile] = useState("");
	const [mobileHasErr, setMobileHasErr] = useState(false);

	const [email, setEmail] = useState("");
	const [emailHasErr, setEmailHasErr] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

	function validateSubmission() {
		let hasAnyErr = false;

		setMobileHasErr(false);
		if (!mobile.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
			setMobileHasErr(true);
			hasAnyErr = true;
		}

		setEmailHasErr(false);
		if (
			!email.match(
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			setEmailHasErr(true);
			hasAnyErr = true;
		}

		setLastNameHasErr(false);
		if (lastName.length > lastNameMaxLength || lastName.length < 1) {
			hasAnyErr = true;
			setLastNameHasErr(true);
		}

		setFirstNameHasErr(false);
		if (firstName.length > firstNameMaxLength || firstName.length < 1) {
			hasAnyErr = true;
			setFirstNameHasErr(true);
		}

		if (!hasAnyErr) {
			sendEmployeePostRequest();
		}
	}

	function sendEmployeePostRequest() {
		let cancelToken;
		setIsLoading(true);
		axios
			.post(
				EMPLOYEE_API_URL,
				{
					firstName,
					lastName,
					jobTitle,
					mobile,
					email,
				},
				{
					cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
				}
			)
			.then(() => {})
			.catch((err) => {
				if (axios.isCancel(err)) {
					return;
				}
				setResponseHasErr(true);
				if (err.response.status === 404) {
					setResponseErrMsg("Employee was not found. It no longer exists.");
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
				<Modal.Header>Create New Employee</Modal.Header>
				<Modal.Body>
					<div className="flex flex-col">
						<div className="mb-2 text-gray-500">
							Please enter the details to create a new employee.
						</div>
						<div className="flex flex-row gap-4">
							<div className="h-full w-full">
								<div className="mb-2">
									<Label>First Name</Label>
								</div>
								<TextInput
									type="text"
									placeholder="John"
									maxLength={firstNameMaxLength}
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									color={firstNameHasErr ? "failure" : "gray"}
									disabled={isLoading}
								/>
								<div className="text-gray-500 text-sm mt-1 flex flex-row items-start justify-end">
									{firstNameHasErr ? (
										<div className="text-red-600 w-5/6">
											Must not be empty and less than {firstNameMaxLength + 1}{" "}
											characters long!
										</div>
									) : (
										""
									)}
									<div className="w-1/6 text-end">
										{firstName?.length} / {firstNameMaxLength}
									</div>
								</div>
							</div>
							<div className="h-full w-full">
								<div className="mb-2">
									<Label>Last Name</Label>
								</div>
								<TextInput
									type="text"
									placeholder="Doe"
									maxLength={lastNameMaxLength}
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									color={lastNameHasErr ? "failure" : "gray"}
									disabled={isLoading}
								/>
								<div className="text-gray-500 text-sm mt-1 flex flex-row items-start justify-end">
									{lastNameHasErr ? (
										<div className="text-red-600 w-5/6">
											Must not be empty and less than {lastNameMaxLength + 1}{" "}
											characters long!
										</div>
									) : (
										""
									)}
									<div className="w-1/6 text-end">
										{lastName?.length} / {lastNameMaxLength}
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-row gap-4">
							<div className="h-full w-full">
								<div className="mb-2">
									<Label>Job Title</Label>
								</div>
								<Select
									type="text"
									placeholder="JOHN"
									onChange={(e) => setJobTitle(e.target.value)}
									color={jobTitleHasErr ? "failure" : "gray"}
									disabled={isLoading}
								>
									{jobTitleList?.map((item, i) => (
										<option value={item?.value} key={i}>
											{item?.display}
										</option>
									))}
								</Select>
							</div>
							<div className="h-full w-full">
								<div className="mb-2">
									<Label>Mobile</Label>
								</div>
								<TextInput
									type="text"
									value={mobile}
									onChange={(e) => setMobile(e.target.value)}
									color={mobileHasErr ? "failure" : "gray"}
									disabled={isLoading}
								/>
								<div className="text-gray-500 text-sm mt-1 flex flex-row items-start justify-start">
									{mobileHasErr ? (
										<div className="text-red-600">
											This mobile number is not in an acceptable format
										</div>
									) : (
										""
									)}
								</div>
							</div>
						</div>
						<div className="flex flex-row gap-4">
							<div className="h-full w-full">
								<div className="mb-2">
									<Label>Email</Label>
								</div>
								<TextInput
									type="text"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									color={emailHasErr ? "failure" : "gray"}
									disabled={isLoading}
								/>
								<div className="text-gray-500 text-sm mt-1 flex flex-row items-start justify-start">
									{emailHasErr ? (
										<div className="text-red-600">
											This email is not in an acceptable format
										</div>
									) : (
										""
									)}
								</div>
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

export default EmployeeCreationModal;
