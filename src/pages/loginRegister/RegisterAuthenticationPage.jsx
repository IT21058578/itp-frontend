import React, { useMemo, useEffect, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import { useState } from "react";
import axios, { AxiosError } from "axios";

const AUTHORIZATION_URL = process.env.REACT_APP_AUTHORIZATION_API_URL;

function RegisterAuthenticationPage() {
	const navigate = useNavigate();
	const { search } = useLocation();
	const query = useMemo(() => new URLSearchParams(search), [search]);

	let email;
	let authorizationToken;

	const [isLoading, setIsLoading] = useState(true);
	const [authHasErr, setAuthHasErr] = useState(false);
	const [errStatusCode, setErrStatusCode] = useState(403);

	let errorDisplay;

	useEffect(() => {
		email = query.get("email");
		authorizationToken = query.get("authorizationToken");
		authorizeUser();
	}, []);

	function authorizeUser() {
		setIsLoading(true);
		axios
			.post(AUTHORIZATION_URL, null, { params: { email, authorizationToken } })
			.then((response) => {
				setAuthHasErr(false);
				setErrStatusCode(0);
			})
			.catch((err) => {
				setAuthHasErr(true);
				setErrStatusCode(err.response.status);
				configureErrorDisplay();
			})
			.then(() => setIsLoading(false));
	}

	function configureErrorDisplay() {
		if (errStatusCode === 403) {
			errorDisplay = (
				<Fragment>
					<div className="text-4xl font-light mb-2">
						This email has already been authorized!
					</div>
					<div className="text-gray-600 font-light mb-4">
						You can sign in using the email and password you have provided at
						registration.
					</div>
				</Fragment>
			);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center gap-1 transition-all">
			{isLoading ? (
				<Fragment>
					<div className="text-4xl font-light">You are almost there!</div>
					<div className="text-gray-600 font-light mb-2">
						Give us a second while we try to authorize your email...
					</div>
					<Spinner size="xl" />{" "}
				</Fragment>
			) : authHasErr ? (
				errStatusCode === 403 ? (
					<Fragment>
						<span className="text-red-600 text-4xl"> Already authorized!</span>
						<div className="text-2xl font-light ">
							Your email has already been authorized.
						</div>
						<div className="text-gray-600 font-light text-center">
							You can login with the credentials you have provided at
							registration
						</div>
					</Fragment>
				) : (
					<Fragment>
						<span className="text-red-600 text-4xl">An Error Occured!</span>
						<div className="text-2xl font-light ">
							We couldn't authorize your email
						</div>
						<div className="text-gray-600 font-light text-center mb-2">
							Press the button below so we can retry your authorization.
						</div>
						<Button onClick={() => authorizeUser()}>Authorize</Button>
					</Fragment>
				)
			) : (
				<Fragment>
					<span className="text-green-400 text-4xl"> Congratulations!</span>
					<div className="text-2xl font-light ">
						Your email has been authorized
					</div>
					<div className="text-gray-600 font-light text-center">
						You can now login using the credentials provided at registration
					</div>
				</Fragment>
			)}
		</div>
	);
}

export default RegisterAuthenticationPage;
