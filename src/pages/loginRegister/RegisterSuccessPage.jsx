import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function RegisterSuccessPage() {
	const navigate = useNavigate();
	const email = "gunasekeratharindu@gmail.com";
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
