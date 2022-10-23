import { Button, Checkbox, Label } from "flowbite-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import axios from "axios";

const USER_DETAILS_API_URL = process.env.REACT_APP_USER_DETAILS_API_URL;

function UserDashboardPage() {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState("John");
	const [lastName, setLastName] = useState("Doe");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("Address");
	const [completedJobsNum, setCompletedJobsNum] = useState(0);
	const [futureJobsNum, setFutureJobsNum] = useState(0);

	const [isLoading, setIsLoading] = useState();

	useEffect(() => {
		sendUserDetailsRequest();
	}, []);

	function sendUserDetailsRequest() {
		setEmail(ReactSession.get("email"));
		axios
			.get(USER_DETAILS_API_URL, { params: { email: ReactSession.get("email") } } )
			.then((response) => {
				console.log(response.data);
				setFirstName(response.data.firstName);
				setLastName(response.data.lastName);
				setAddress(response.data.address);
			})
			.catch((err) => {})
			.then(() => setIsLoading(false));
	}

	return (
		<div className="flex flex-col mr-16 h-full">
			<div className="flex text-4xl font-light pb-4 border-b">Dashboard</div>
			<div className="flex-grow flex flex-col h-full">
				<div className="flex-grow flex flex-col pb-4">
					<div className="flex gap-2 flex-row mt-4">
						<div className="text-2xl">{firstName}</div>
						<div className="text-2xl">{lastName}</div>
					</div>
					<div className="flex gap-2 flex-row mt-2 text-gray-700">{email}</div>
					<div className="flex gap-2 flex-row mt-2 text-gray-500">
						{address}
					</div>
					<div className="flex items-center gap-2 mt-2">
						<Checkbox disabled checked />
						<Label>
							I agree to receive emails about QuickClean news, promotions and
							offers.
						</Label>
					</div>
					<div className="flex gap-2 flex-row mt-4">
						<div className="flex-1 ">Completed Jobs : {completedJobsNum}</div>
						<div className="flex-1 ">Future Jobs : {futureJobsNum}</div>
					</div>
				</div>
				<div className="pt-4 border-t flex flex-row gap-2 justify-end">
					<Button
						style={{ width: "25%" }}
						onClick={() => navigate("/profile/password")}
					>
						Change Password
					</Button>
					{/* <Button
						style={{ width: "25%" }}
						onClick={() => navigate("/profile/edit")}
					>
						Edit Details
					</Button> */}
				</div>
			</div>
		</div>
	);
}

export default UserDashboardPage;
