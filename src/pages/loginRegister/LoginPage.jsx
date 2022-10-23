import axios from "axios";
import { Label, Modal, TextInput, Spinner, Button } from "flowbite-react";
import React, { Fragment } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

const LOGIN_URL = process.env.REACT_APP_LOGIN_API_URL;
const USER_DASHBOARD_URL = "/user/dashboard";
const AUTH_REGISTER_URL = "/auth/register";
const ADMIN_DASHBOARD_URL = "/admin";
const FORGOT_PASSWORD_URL = "/auth/forgotpassword";

function LoginPage() {
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [passwordHasErr, setPasswordHasErr] = useState(false);
	const [passwordErrMsg, setPasswordErrMsg] = useState("");

	const [email, setEmail] = useState("");
	const [emailHasErr, setEmailHasErr] = useState(false);
	const [emailErrMsg, setEmailErrMsg] = useState("");

	const [loginHasErr, setLoginHasErr] = useState(false);
	const [loginErrMsg, setLoginErrMsg] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	function validateLogin(e) {
		e.preventDefault();
		let hasAnyErr = false;

		//Check password
		setPasswordHasErr(false);
		if (password.length <= 0) {
			console.log(password);
			setPasswordHasErr(true);
			setPasswordErrMsg("Password cannot be empty!");
			hasAnyErr = true;
		}

		//Check email
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
			sendLoginRequest();
		}
	}

	function sendLoginRequest() {
		setIsLoading(true);
		axios
			.post(LOGIN_URL, null, { params: { email, password } })
			.then((response) => {
				ReactSession.set("email", response.data.email);
				ReactSession.set("firstName", response.data.firstName);
				ReactSession.set("lastName", response.data.lastName);
				ReactSession.set("permissions", response.data.permissions);
				ReactSession.set("userKind", response.data.userKind);

				if (response.data.userKind === "USER") {
					navigate(USER_DASHBOARD_URL);
				} else if (response.data.userKind === "ADMIN") {
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

	return (
		<div className="w-2/6 p-8 flex flex-col items-center justify-center">
			<div className="text-2xl font-medium">Login to your account</div>
			<div className="border-t m-4 w-full"></div>
			<div className="flex w-full flex-col gap-2">
				<div>
					<div className="mb-2 block">
						<Label value="Email" />
					</div>
					<div>
						<TextInput
							type="email"
							disabled={isLoading}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							color={emailHasErr ? "failure" : "gray"}
							helperText={
								emailHasErr ? (
									<span className="text-red-600">{emailErrMsg}</span>
								) : (
									""
								)
							}
							placeholder="Email"
						/>
					</div>
				</div>
				<div>
					<div className="mb-2 block">
						<Label value="Password" />
					</div>
					<div>
						<TextInput
							type="password"
							disabled={isLoading}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							color={passwordHasErr ? "failure" : "gray"}
							helperText={
								passwordHasErr ? (
									<span className="text-red-600">{passwordErrMsg}</span>
								) : (
									""
								)
							}
							placeholder="Password"
						/>
					</div>
				</div>
			</div>
			<div
				className=" my-4 text-blue-500 underline hover:cursor-pointer active:text-blue-800 hover:text-blue-400 text-sm text-right "
				onClick={() => navigate(FORGOT_PASSWORD_URL)}
			>
				Forgot your password?
			</div>
			<div
				className=" my-4 text-blue-500 underline hover:cursor-pointer active:text-blue-800 hover:text-blue-400 text-sm text-right "
				onClick={() => navigate(AUTH_REGISTER_URL)}
			>
				Create an account
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
						onClick={validateLogin}
						disabled={isLoading}
						style={{ width: "100%" }}
					>
						{isLoading ? (
							<div className="flex items-center gap-2">
								<Spinner size="sm" /> Logging in...
							</div>
						) : (
							<div>Login</div>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
