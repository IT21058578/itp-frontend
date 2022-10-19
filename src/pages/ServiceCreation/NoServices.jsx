import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function NoService() {
	const navigate = useNavigate();
	return (
		<div className="flex flex-col items-center justify-center mx-auto my-auto">
			<div className="text-4xl font-light mb-2">
				Oops! Looks like you got lost!
			</div>
			<div className="text-gray-600 mb-2">
				No services found in this Category...
			</div>
			<div>
				<Button size="lg" onClick={() => navigate("/categories")}>
					Back to CategoryPage
				</Button>
			</div>
		</div>
	);
}

export default NoService;
