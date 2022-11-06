import axios from "axios";
import { Label, Modal, TextInput, Spinner, Button, Select } from "flowbite-react";
import React, { Fragment } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

const PAYMENT_URL = 'http://localhost:8000/api/payment';
const USER_DASHBOARD_URL = "/profile";
const AUTH_REGISTER_URL = "/auth/register";
const ADMIN_DASHBOARD_URL = "/admin";
const FORGOT_PASSWORD_URL = "/auth/forgotpassword";

function MyCartToPayament() {
	const navigate = useNavigate();
	const [Date, setDate] = useState("");
	const [DateHasErr, setDateHasErr] = useState(false);
	const [DateErrMsg, setDateErrMsg] = useState("");

	const [STime, setSTime] = useState("");
	const [STimeHasErr, setSTimeHasErr] = useState(false);
	const [STimeErrMsg, setSTimeErrMsg] = useState("");


	const [ETime, setETime] = useState("");
	const [ETimeHasErr, setETimeHasErr] = useState(false);
	const [ETimeErrMsg, setETimeErrMsg] = useState("");

	const [Address, setAddress] = useState("");
	const [AddressHasErr, setAddressHasErr] = useState(false);
	const [AddressErrMsg, setAddressErrMsg] = useState("");

	const [Zone, setZone] = useState("");
	const [ZoneHasErr, setZoneHasErr] = useState(false);
	const [ZoneErrMsg, setZoneErrMsg] = useState("");

	const [password, setPassword] = useState("");
	const [passwordHasErr, setPasswordHasErr] = useState(false);
	const [passwordErrMsg, setPasswordErrMsg] = useState("");

	const [email, setEmail] = useState("");
	const [emailHasErr, setEmailHasErr] = useState(false);
	const [emailErrMsg, setEmailErrMsg] = useState("");

	const [loginHasErr, setLoginHasErr] = useState(false);
	const [loginErrMsg, setLoginErrMsg] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const [crew, setCrew] = useState('');


	function validatePayment(e) {
		e.preventDefault();
		console.log(Date, STime, ETime, Address, Zone, "payment")
		let hasAnyErr = false;
		var dif = (new window.Date("1970-1-1 " + ETime) - new window.Date("1970-1-1 " + STime)) / 1000 / 60 / 60;

		//Check password
		setDateHasErr(false);
		if (Date.length <= 0) {
			console.log(Date);
			setDateHasErr(true);
			setDateErrMsg("Date cannot be empty!");
			hasAnyErr = true;
		}



		setSTimeHasErr(false);
		if (STime.length <= 0) {
			console.log(STime);
			setSTimeHasErr(true);
			setSTimeErrMsg("start time cannot be empty!");
			hasAnyErr = true;
		}

		setETimeHasErr(false);
		if (ETime.length <= 0) {
			console.log(ETime);
			setETimeHasErr(true);
			setETimeErrMsg("End time cannot be empty!");
			hasAnyErr = true;
		}
		if (dif < 0) {
			console.log(ETime);
			setETimeHasErr(true);
			setETimeErrMsg("End time greater than start time");
			hasAnyErr = true;

		}
		if (dif > 1) {
			console.log(ETime, dif < 1);
			setETimeHasErr(true);
			setETimeErrMsg("End time time limit is 1 hour from start time");
			hasAnyErr = true;

		}
		setAddressHasErr(false);
		if (Address.length <= 0) {
			console.log(Address);
			setAddressHasErr(true);
			setAddressErrMsg("Address cannot be empty!");
			hasAnyErr = true;
		}

		console.log(dif, new window.Date("1970-1-1 " + ETime), new window.Date("1970-1-1 " + STime), "difdifdif")
		// console.log(new window.Date())
		if (!hasAnyErr) {
			sendLoginRequest();
		}
	}
	// add payment part here
	function sendLoginRequest() {
		setIsLoading(true);
		axios
			.post(PAYMENT_URL, null, { params: { email, password } })
			.then((response) => {
				alert("successfully completed !")

				if (response.data.permissions.includes("USER")) {
					navigate(USER_DASHBOARD_URL);
				} else if (response.data.permissions.includes("ADMIN")) {
					navigate(ADMIN_DASHBOARD_URL);
				}

				window.location.reload();
			})
			.catch((err) => {
				setLoginHasErr(true);
				if (err.response !== undefined) {
					//For errors with response
					if (err.response.status === 0) {
						setLoginErrMsg("Failed to connect to server. Please try again.");
					} else if (err.response.status === 403) {
						setLoginErrMsg(
							"Email has not been authorized. We just resent the email!"
						);
					} else {
						setLoginErrMsg("An error occured. Please try again.");
					}
				} else {
					setLoginErrMsg("Request couldn't be made. Please try again.");
				}
			})
			.then(() => setIsLoading(false));
	}
const crews =[
	'CREW 01','CREW 02',"CREW 03",'CREW 05','CREW 05'
]
	return (
		<div className="w-2/6 p-8 flex flex-col items-center justify-center">
			<div className="text-2xl font-medium">Make a Payment</div>
			<div className="border-t m-4 w-full"></div>
			<div className="flex w-full flex-col gap-2">
				<div>
					<div className="mb-2 block">
						<Label value="Date" />
					</div>
					<div>
						<TextInput
							type="date"
							disabled={isLoading}
							value={Date}
							onChange={(e) => setDate(e.target.value)}
							color={DateHasErr ? "failure" : "gray"}
							helperText={
								DateHasErr ? (
									<span className="text-red-600">{DateErrMsg}</span>
								) : (
									""
								)
							}
							placeholder="Date"
						/>
					</div>
				</div>
				<div>
					<div className="mb-2 block">
						<Label value="Start Time" />
					</div>
					<div>
						<TextInput
							type="time"
							disabled={isLoading}
							value={STime}
							onChange={(e) => setSTime(e.target.value)}
							color={STimeHasErr ? "failure" : "gray"}
							helperText={
								STimeHasErr ? (
									<span className="text-red-600">{STimeErrMsg}</span>
								) : (
									""
								)
							}
							placeholder="Start Time"
						/>
					</div>
				</div>
				<div>
					<div className="mb-2 block">
						<Label value="End Time" />
					</div>
					<div>
						<TextInput
							type="time"
							disabled={isLoading}
							value={ETime}
							onChange={(e) => setETime(e.target.value)}
							color={ETimeHasErr ? "failure" : "gray"}
							helperText={
								ETimeHasErr ? (
									<span className="text-red-600">{ETimeErrMsg}</span>
								) : (
									""
								)
							}
							placeholder="End Time"
						/>
					</div>
				</div>

				<div>
					<div className="mb-2 block">
						<Label value="Address" />
					</div>
					<div>
						<TextInput
							type="text"
							disabled={isLoading}
							value={Address}
							onChange={(e) => setAddress(e.target.value)}
							color={AddressHasErr ? "failure" : "gray"}
							helperText={
								AddressHasErr ? (
									<span className="text-red-600">{AddressErrMsg}</span>
								) : (
									""
								)
							}
							placeholder="Address"
						/>

					</div>
				</div>
				<div className="mb-2 block">
						<Label value="Crew" />
					</div>
				<Select
					defaultValue={crew}
					onChange={(e) => setCrew(e.target.value)}
				>
					{
						crews && crews.map((item,i)=>(

							<option key={i} value={item}>{item}</option>
						))
					}
				</Select>

			</div>

			<div className="border-t m-4 w-full"></div>
			<div className="flex flex-col gap-2 w-full items-center">
				{loginHasErr ? (
					<span className="text-red-600 flex-1" style={{ fontSize: "0.92em" }}>
						{loginErrMsg}
					</span>
				) : (
					""
				)}
				<div className="border flex-1 w-1/2">
					<Button
						onClick={validatePayment}
						disabled={isLoading}
						style={{ width: "100%" }}
					>
						{isLoading ? (
							<div className="flex items-center gap-2">
								<Spinner size="sm" /> Loading ...
							</div>
						) : (
							<div>Payment</div>
						)}
					</Button>
				</div>

				
			</div>
		</div>
	);
}

export default MyCartToPayament;
