import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ReactSession } from "react-client-session";

const FORGOT_PASSWORD_URL = "";

function UserChangePasswordPage() {
	const [oldPassword, setOldPassword] = useState("");
	const [oldPasswordHasErr, setOldPasswordHasErr] = useState(false);
	const [oldPasswordErrMsg, setOldPasswordErrMsg] = useState(false);
	const [password, setPassword] = useState("");
	const [passwordHasErr, setPasswordHasErr] = useState(false);
	const [passwordErrMsg, setPasswordErrMsg] = useState(false);
	const [isPasswordFocus, setIsPasswordFocus] = useState(false);
	const [passwordHintClasses, setPasswordHintClasses] = useState(
		"absolute bg-white p-4 border rounded-md top-12 invisible"
	);

	const [retypePassword, setRetypePassword] = useState("");
	const [retypePasswordHasErr, setRetypePasswordHasErr] = useState(false);
	const [retypePasswordErrMsg, setRetypePasswordErrMsg] = useState("");

	const [isRequestSuccess, setIsRequestSuccess] = useState(false);
	const [requestHasErr, setRequestHasErr] = useState(false);
	const [requestErrMsg, setRequestErrMsg] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");

	useEffect(() => {
		setEmail(ReactSession.get("email"));
	}, []);

	useEffect(() => {
		if (isPasswordFocus === false) {
			setPasswordHintClasses(
				"absolute bg-white p-4 border rounded-md top-12 invisible"
			);
		} else {
			setPasswordHintClasses(
				"absolute bg-white p-4 border rounded-md top-12 z-50"
			);
		}
	}, [isPasswordFocus]);

	useEffect(() => {
		setPasswordHasErr(false);
		setRequestHasErr(false);
	}, [password]);

	function validatePassword() {
		let hasAnyErr = false;

		//Check password
		setPasswordHasErr(false);
		if (
			!password.match(
				/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/
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

		if (!hasAnyErr && !isRequestSuccess) {
			sendPasswordResetRequest();
		}
	}

	function sendPasswordResetRequest() {
		setIsLoading(true);
		setRequestHasErr(false);
		let cancelToken;
		axios
			.put(
				FORGOT_PASSWORD_URL,
				{ email, newPassword: password, oldPassword },
				{
					params: { reset: true },
					cancelToken: axios.CancelToken((c) => (cancelToken = c)),
				}
			)
			.then((response) => {
				setIsRequestSuccess(true);
			})
			.catch((err) => {
				setRequestHasErr(true);
				if (axios.isCancel(err)) {
					return;
				}
				if (err.response !== undefined) {
					if (err.response.status === 0) {
						setRequestErrMsg("Failed to connect to server. Please try again.");
					} else if (err.response.status === 400) {
						setRequestErrMsg(
							"Current password is incorrect. Please enter correct password and try again."
						);
					} else if (err.response.status === 404) {
						setRequestErrMsg("This email does not exist in our system!");
					} else {
						setRequestErrMsg("An error occured. Please try again.");
					}
				} else {
					setRequestErrMsg("Request couldn't be made. Please try again.");
					console.log(err);
				}
			})
			.then(() => setIsLoading(false));
	}

	return (
		<div className="flex flex-col mr-16 h-full">
			<div className="flex text-4xl font-light pb-4 border-b">
				Change Password
			</div>
			<div className="flex-grow flex flex-col h-full w-full">
				<div className="mt-4">
					Please enter a password below that follows the strength rules of our
					website. Then press the edit button to change the password.
				</div>
				<div className="flex-grow flex flex-col gap-8 items-center justify-center mt-4">
					<div className="flex flex-col gap-4 items-center w-full h-full">
						<div className="w-1/2 border-b pb-4">
							<div className="mb-2 block">
								<Label value="Current Password" />
							</div>
							<div>
								<TextInput
									type="password"
									value={oldPassword}
									onChange={(e) => setOldPassword(e.target.value)}
									placeholder="Current Password"
									disabled={isLoading || isRequestSuccess}
									color={oldPasswordHasErr ? "failure" : "gray"}
									helperText={
										oldPasswordHasErr ? (
											<span className="text-red-600">{oldPasswordErrMsg}</span>
										) : (
											""
										)
									}
								/>
							</div>
						</div>
						<div className="w-1/2">
							<div className="mb-2 block">
								<Label value="New Password" />
							</div>
							<div className="relative">
								<div className={passwordHintClasses}>
									<div className="text-sm font-medium border-b mb-2">
										Password Strength Rules
									</div>
									<ul className="list-disc ml-4">
										<li className="text-xs text-gray-600 font-medium">
											8 to 16 characters in length
										</li>
										<li className="text-xs text-gray-600 font-medium">
											Atleast 1 upper-case letter
										</li>
										<li className="text-xs text-gray-600 font-medium">
											Atleast 1 lower-case letter
										</li>
										<li className="text-xs text-gray-600 font-medium">
											Atleast 1 number
										</li>
										<li className="text-xs text-gray-600 font-medium">
											Atleast 1 of these special characters
											<ul className="list-disc bg-gray-100 p-0.5 rounded-md">
												<li className="inline-block mx-2">#</li>
												<li className="inline-block mx-2">$</li>
												<li className="inline-block mx-2">.</li>
												<li className="inline-block mx-2">%</li>
												<li className="inline-block mx-2">&</li>
												<li className="inline-block mx-2">*</li>
											</ul>
										</li>
									</ul>
								</div>
								<TextInput
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									onFocus={() => setIsPasswordFocus(true)}
									onBlur={() => setIsPasswordFocus(false)}
									placeholder="Password"
									disabled={isLoading || isRequestSuccess}
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
						<div className="w-1/2">
							<div className="mb-2 block">
								<Label value="Re-Type New Password" />
							</div>
							<div>
								<TextInput
									type="password"
									value={retypePassword}
									onChange={(e) => setRetypePassword(e.target.value)}
									placeholder="Re-Type Password"
									disabled={isLoading || isRequestSuccess}
									color={retypePasswordHasErr ? "failure" : "gray"}
									helperText={
										retypePasswordHasErr ? (
											<span className="text-red-600">
												{retypePasswordErrMsg}
											</span>
										) : (
											""
										)
									}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="pt-4 border-t flex flex-row gap-2 justify-end">
					{requestHasErr && !isRequestSuccess ? (
						<div className="text-red-600 text-sm py-4 text-center">
							{requestErrMsg}
						</div>
					) : (
						""
					)}
					{isRequestSuccess ? (
						<div className="text-green-400 text-sm py-4 text-center">
							Your password has been succesfully reset. You can now login using
							your email and new password from next time.
						</div>
					) : (
						""
					)}
					<Button
						style={{ width: "25%" }}
						disabled={isLoading || isRequestSuccess}
						onClick={validatePassword}
					>
						<div className="flex flex-row items-center gap-1">
							<PaperAirplaneIcon className="w-4 h-4 mr-1" />
							{isLoading ? (
								<Fragment>
									<div>Sending...</div>
									<Spinner size="sm" />
								</Fragment>
							) : (
								"Save"
							)}
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default UserChangePasswordPage;
