import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="text-4xl font-light mb-2">
				Oops! Looks like you got lost!
			</div>
			<div className="text-gray-600 mb-2">
				This page doesn't exist. No idea how you got here...
			</div>
			<div>
				<Button size="lg" onClick={() => navigate("/")}>
					Back to homepage
				</Button>
			</div>
		</div>
	);
}

export default ErrorPage;
