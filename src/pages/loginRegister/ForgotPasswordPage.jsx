import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { useState } from "react";

const FORGOT_PASSWORD_URL = process.env.REACT_APP_FORGOT_PASSWORD_API_URL;

function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [emailHasErr, setEmailHasErr] = useState(false);
	const [emailErrMsg, setEmailErrMsg] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [requestIsSuccess, setRequestIsSuccess] = useState(false);

	useEffect(() => {
		setEmailHasErr(false);
		setRequestIsSuccess(false);
	}, [email]);

	function validateEmail() {
		let hasAnyErr = false;

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

		if (!hasAnyErr) {
			sendPasswordResetEmailRequest();
		}
	}

	function sendPasswordResetEmailRequest() {
		setIsLoading(true);
		setRequestIsSuccess(false);
		let cancelToken;
		axios
			.put(
				FORGOT_PASSWORD_URL,
				{ email },
				{ cancelToken: axios.CancelToken((c) => (cancelToken = c)) }
			)
			.then((response) => {
				setRequestIsSuccess(true);
			})
			.catch((err) => {
				setEmailHasErr(true);
				if (axios.isCancel(err)) {
					return;
				}
				if (err.response !== undefined) {
					if (err.response.status === 0) {
						setEmailErrMsg("Failed to connect to server. Please try again.");
					} else if (err.response.status === 403) {
						setEmailErrMsg(
							"Email has not been authorized. We just resent the email!"
						);
					} else if (err.response.status === 404) {
						setEmailErrMsg("This email does not exist in our system!");
					} else {
						setEmailErrMsg("An error occured. Please try again.");
					}
				} else {
					setEmailErrMsg("Request couldn't be made. Please try again.");
					console.log(err);
				}
			})
			.then(() => setIsLoading(false));
	}

	return (
		<div className="w-4/6 p-8">
			<div className="text-2xl font-medium">Forgot Password</div>
			<div className="border-t m-4"></div>
			<div className="">
				Please enter the email you used while registering. If it exists in our
				system we'll send you an email with a link to reset your password.
			</div>
			<div className="flex flex-row gap-4 items-start justify-center mt-2">
				<div className="w-2/4">
					<TextInput
						type="email"
						disabled={isLoading}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						color={
							emailHasErr ? "failure" : requestIsSuccess ? "success" : "gray"
						}
						helperText={
							emailHasErr ? (
								<span className="text-red-600">{emailErrMsg}</span>
							) : requestIsSuccess ? (
								<span className="text-green-500">
									We've sent you an email at {email} to reset your password.
									Please follow the instructions specified.
								</span>
							) : (
								""
							)
						}
						placeholder="Type your email here..."
					/>
				</div>
				<div className="w-1/6">
					<Button
						style={{ width: "100%" }}
						disabled={isLoading}
						onClick={validateEmail}
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

export default ForgotPasswordPage;
