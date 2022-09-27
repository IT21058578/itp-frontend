import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Label,
	TextInput,
	Spinner,
	Textarea,
	Button,
	Checkbox,
} from "flowbite-react";
import axios from "axios";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const REGISTER_URL = process.env.REACT_APP_REGISTER_API_URL;
const REGISTER_SUCCESS_URL = "#";

function RegisterForm() {
	const navigate = useNavigate();
	const crntDate = 0; //Date.now().toISOString().split("T").toString();

	const [firstName, setFirstName] = useState(""); //cannot be empty
	const [lastName, setLastName] = useState(""); //cannot be empty

	const [dateOfBirth, setDateOfBirth] = useState("");
	const [dateOfBirthHasErr, setDateOfBirthHasErr] = useState(false);
	const [dateOfBirthErrMsg, setDateOfBirthErrMsg] = useState("");

	const [mobile, setMobile] = useState(""); //Either blank or valid phone number.
	const [mobileHasErr, setMobileHasErr] = useState(false);
	const [mobileErrMsg, setMobileErrMsg] = useState("");
	const [isMobileFocus, setIsMobileFocus] = useState(false);

	const [address, setAddress] = useState("");

	const [email, setEmail] = useState("");
	const [emailHasErr, setEmailHasErr] = useState(false);
	const [emailErrMsg, setEmailErrMsg] = useState("");

	const [password, setPassword] = useState("");
	const [passwordHasErr, setPasswordHasErr] = useState(false);
	const [passwordErrMsg, setPasswordErrMsg] = useState("");
	const [isPasswordFocus, setIsPasswordFocus] = useState(false);

	const [retypePassword, setRetypePassword] = useState("");
	const [retypePasswordHasErr, setRetypePasswordHasErr] = useState(false);
	const [retypePasswordErrMsg, setRetypePasswordErrMsg] = useState("");

	const [tosAccepted, setTosAccepted] = useState(false);
	const [tosAcceptedHasErr, setTosAcceptedHasErr] = useState(false);
	const [tosAcceptedErrMsg, setTosAcceptedErrMsg] = useState("");

	const [emailsAccepted, setEmailsAccepted] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	function validateRegistration() {
		let hasAnyErr = false;

		//Check date of birth.
		setDateOfBirthHasErr(false);
		const dateOfBirthAsDate = new Date(dateOfBirth);
		const age = Math.abs(
			new Date(Date.now() - dateOfBirthAsDate).getUTCFullYear - 1970
		);
		if (age < 18) {
			setDateOfBirthHasErr(true);
			setDateOfBirthErrMsg("You must be 18 or older to create an account.");
			hasAnyErr = true;
		}

		//Check mobile
		setMobileHasErr(false);
		if (!mobile.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
			setMobileHasErr(true);
			setMobileErrMsg("Must be empty or a valid mobile number!");
			hasAnyErr = true;
		}

		//Check email.
		setEmailHasErr(false);
		if (
			!email.match(
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			setEmailHasErr(true);
			setEmailErrMsg("Must be a valid email!");
			hasAnyErr = true;
		}

		//Check password
		setPasswordHasErr(false);
		if (
			!password.match(
				/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/
			)
		) {
			setPasswordHasErr(true);
			setPasswordErrMsg("Password does not abide by strength rules!");
			hasAnyErr = true;
		}

		//Check retype password
		setRetypePasswordHasErr(false);
		if (password !== retypePassword) {
			setRetypePasswordHasErr(true);
			setRetypePasswordErrMsg("Password does not match!");
			hasAnyErr = true;
		}

		//Check tos
		setTosAcceptedHasErr(false);
		if (!tosAccepted) {
			setTosAcceptedHasErr(true);
			setTosAcceptedErrMsg("Please read and agree to our terms of service!");
			hasAnyErr = true;
		}

		sendRegistrationRequest();
	}

	function sendRegistrationRequest() {
		setIsLoading(true);
		axios
			.post(REGISTER_URL, {
				firstName,
				lastName,
				dateOfBirth,
				mobile,
				email,
				password,
				emailsAccepted,
			})
			.then((response) => {
				navigate(REGISTER_SUCCESS_URL, { state: { firstName, email } });
			})
			.catch((err) => {})
			.then(() => setIsLoading(false));
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row gap-2 w-full h-full">
				<div className="flex-1 w-1/2 block">
					<div className="mb-2 block">
						<Label value="First Name" />
					</div>
					<div>
						<TextInput
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							type="text"
							placeholder="First Name"
							disabled={isLoading}
						/>
					</div>
				</div>
				<div className="flex-1 w-1/2 ">
					<div className="mb-2 block">
						<Label value="Last Name" />
					</div>
					<div>
						<TextInput
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							type="text"
							placeholder="Last Name"
							disabled={isLoading}
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-2 w-full h-full">
				<div className="flex-1 w-1/2">
					<div className="mb-2 block">
						<Label value="Date Of Birth" />
					</div>
					<div>
						<TextInput
							value={dateOfBirth}
							onChange={(e) => setDateOfBirth(e.target.value)}
							type="date"
							placeholder={crntDate}
							color={dateOfBirthHasErr ? "failure" : "gray"}
							disabled={isLoading}
							helperText={
								dateOfBirthHasErr ? (
									<span className="text-red-600">{dateOfBirthErrMsg}</span>
								) : (
									""
								)
							}
						/>
					</div>
				</div>
				<div className="flex-1 w-1/2">
					<div className="mb-2 block">
						<Label value="Mobile" />
					</div>
					<div>
						<TextInput
							value={mobile}
							onChange={(e) => setMobile(e.target.value)}
							type="text"
							placeholder="Mobile"
							disabled={isLoading}
							color={mobileHasErr ? "failure" : "gray"}
							helperText={
								mobileHasErr ? (
									<span className="text-red-600">{mobileErrMsg}</span>
								) : (
									""
								)
							}
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-2 w-full h-full">
				<div className="flex-1">
					<div className="mb-2 block">
						<Label value="Address" />
					</div>
					<div>
						<Textarea
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							rows={3}
							placeholder="Type your address here..."
							style={{ resize: "none", fontSize: "0.90em" }}
							disabled={isLoading}
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-2 w-full h-full">
				<div className="flex-1">
					<div className="mb-2 block">
						<Label value="Email" />
					</div>
					<div>
						<TextInput
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Type your email here..."
							disabled={isLoading}
							color={emailHasErr ? "failure" : "gray"}
							helperText={
								emailHasErr ? (
									<span className="text-red-600">{emailErrMsg}</span>
								) : (
									""
								)
							}
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-2 w-full h-full">
				<div className="flex-1 w-1/2">
					<div className="mb-2 block">
						<Label value="Password" />
					</div>
					<div>
						<TextInput
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							disabled={isLoading}
							color={passwordHasErr ? "failure" : "gray"}
							helperText={
								passwordHasErr ? (
									<span className="text-red-600">{passwordErrMsg}</span>
								) : (
									""
								)
							}
						/>
					</div>
				</div>
				<div className="flex-1 w-1/2">
					<div className="mb-2 block">
						<Label value="Re-Type Password" />
					</div>
					<div>
						<TextInput
							type="password"
							value={retypePassword}
							onChange={(e) => setRetypePassword(e.target.value)}
							placeholder="Re-Type Password"
							disabled={isLoading}
							color={retypePasswordHasErr ? "failure" : "gray"}
							helperText={
								retypePasswordHasErr ? (
									<span className="text-red-600">{retypePasswordErrMsg}</span>
								) : (
									""
								)
							}
						/>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-2 w-full h-full border-t py-2">
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<Checkbox
							value={tosAccepted}
							onChange={(e) => setTosAccepted(e.target.value)}
							defaultChecked={false}
							disabled={isLoading}
							color={tosAcceptedHasErr ? "failure" : "gray"}
						/>
						<Label>
							By clicking here, I state that I have read and understood the{" "}
							<a
								href="/forms"
								className="text-blue-600 hover:underline dark:text-blue-500"
							>
								terms and conditions
							</a>
							.
						</Label>
						{tosAcceptedHasErr ? (
							<span className="text-red-600 text-sm">{tosAcceptedErrMsg}</span>
						) : (
							""
						)}
					</div>

					<div className="flex items-center gap-2">
						<Checkbox
							value={emailsAccepted}
							onChange={(e) => setEmailsAccepted(e.target.value)}
							defaultChecked={true}
							disabled={isLoading}
						/>
						<Label>
							By clicking here, I agree to receive emails about QuickClean news,
							promotions and offers.
						</Label>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-2 w-full h-full border-t py-2">
				<Button
					style={{ width: "100%" }}
					onClick={validateRegistration}
					disabled={isLoading}
				>
					<CheckBadgeIcon className="h-6 w-6 mx-2" />
					{isLoading ? (
						<div>
							Registering... <Spinner />
						</div>
					) : (
						<div>Register</div>
					)}
				</Button>
			</div>
		</div>
	);
}

export default RegisterForm;
