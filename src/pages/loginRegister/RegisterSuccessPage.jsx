import React, { useEffect, useMemo, useState } from "react";
import { Button } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";

function RegisterSuccessPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");

	useEffect(() => {
		if (location?.state?.email == undefined) {
			navigate("/"); //Redirect to homepage if it doesnt exist.
		}
		setEmail(location.state.email); //Otherwise set email
	}, []);

	return (
		<div className="flex flex-col items-center justify-center">
			<div className="text-4xl font-light mb-2">
				Your registration was successful!
			</div>
			<div className="text-gray-600 mb-2 text-center">
				We've sent an email to you at{" "}
				<span className="text-blue-500">{email}</span>
				.
				<br /> Click the link provided to finalize the registration process
			</div>
			<div>
				<Button size="lg" onClick={() => navigate("/")}>
					Back to homepage
				</Button>
			</div>
		</div>
	);
}

export default RegisterSuccessPage;
