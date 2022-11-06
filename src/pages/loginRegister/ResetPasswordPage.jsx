import React, { useMemo, useEffect, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Spinner, TextInput, Label } from "flowbite-react";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const FORGOT_PASSWORD_URL = process.env.REACT_APP_FORGOT_PASSWORD_API_URL;

function ResetPasswordPage() {
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

	const { search } = useLocation();
	const query = useMemo(() => new URLSearchParams(search), [search]);
	const [email, setEmail] = useState("");
	const [resetToken, setResetToken] = useState("");

	useEffect(() => {
		setEmail(query.get("email"));
		setResetToken(query.get("resetToken"));
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
			sendPasswordResetEmailRequest();
		}
	}

	function sendPasswordResetEmailRequest() {
		setIsLoading(true);
		setRequestHasErr(false);
		let cancelToken;
		axios
			.put(
				FORGOT_PASSWORD_URL,
				{ email, password, resetToken },
				{
					params: { reset: true },
					cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
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
							"Some credentials provided do not match. Please try again or go through the forgot password process again."
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
		<div className="w-4/6 p-8">
			<div className="text-2xl font-medium">Reset Password</div>
			<div className="border-t m-4"></div>
			<div className="">
				Please enter a password below that follows the strength rules of our
				website. Then press the edit button to change the password for{" "}
				<span className="text-blue-500">{email}</span>.
			</div>
			<div className="flex flex-col gap-8 items-center justify-center mt-4">
				<div className="flex flex-col gap-4 items-center w-full h-full">
					<div className="flex-1 w-1/2">
						<div className="mb-2 block">
							<Label value="Password" />
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
								disabled={isLoading || isRequestSuccess}
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
				<div className="w-3/6 border-t pt-2">
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
							your email and new password.
						</div>
					) : (
						""
					)}
					<Button
						style={{ width: "100%" }}
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
								"Send"
							)}
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ResetPasswordPage;
