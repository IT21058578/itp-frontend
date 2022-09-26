import React from "react";
import { Container, RegisterForm } from "../components";

//Self explanatory
function RegisterPage() {
	return (
		<div className="w-4/6 p-8">
			<div className="text-2xl font-medium">Register Form</div>
			<div className="border-t m-4"></div>
			<RegisterForm />
		</div>
	);
}

export default RegisterPage;
