import axios from "axios";
import { Label, Modal, TextInput, Spinner, Button } from "flowbite-react";
import React, { Fragment } from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context";

const LOGIN_URL = process.env.REACT_APP_LOGIN_API_URL;

function LoginModal({ isLoginMdlActive, setIsLoginMdlActive }) {
	const { auth, setAuth } = useContext(AuthContext);
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

		if (hasAnyErr) {
			sendLoginRequest();
		}
	}

	function sendLoginRequest() {
		setIsLoading(true);
		axios
			.get(LOGIN_URL, { params: { email, password } })
			.then((response) => {
				let { email, accessToken, role } = response.data;
				setAuth({ email, accessToken, role });
			})
			.catch((err) => {
				setLoginHasErr(true);
				if (err.response !== undefined) {
					//For errors with response
					if (err.response.status === 0) {
						setLoginErrMsg("Failed to connect to server. Please try again.");
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
		<Modal
			show={isLoginMdlActive}
			onClose={() => {
				setPassword("");
				setEmail("");
				setIsLoginMdlActive(false);
			}}
		>
			<Modal.Header>User Login</Modal.Header>
			<Modal.Body>
				<div className="flex flex-col gap-2">
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
			</Modal.Body>
			<Modal.Footer>
				<div className="flex gap-2 justify-end w-full items-center">
					{loginHasErr ? (
						<span
							className="text-red-600 flex-1"
							style={{ fontSize: "0.92em" }}
						>
							{loginErrMsg}
						</span>
					) : (
						""
					)}
					<Button
						color="gray"
						onClick={() => {
							setPassword("");
							setEmail("");
							setIsLoginMdlActive(false);
						}}
					>
						Cancel
					</Button>
					<Button onClick={validateLogin} disabled={isLoading}>
						{isLoading ? (
							<div className="flex items-center gap-2">
								<Spinner size="sm" /> Logging in...
							</div>
						) : (
							<div>Login</div>
						)}
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default LoginModal;
