import { Button, Checkbox, Label, Spinner } from "flowbite-react";
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import axios from "axios";

const USER_DETAILS_API_URL = process.env.REACT_APP_USER_DETAILS_API_URL;

function UserDashboardPage() {
	const navigate = useNavigate();
	const [user, setUser] = useState({});

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		sendUserDetailsRequest();
	}, []);

	function sendUserDetailsRequest() {
		setIsLoading(true);
		axios
			.get(USER_DETAILS_API_URL, { params: { email: ReactSession.get("email") } } )
			.then((response) => {
				console.log(response.data);
				setUser(response?.data);
			})
			.catch((err) => {})
			.then(() => setIsLoading(false));
	}

	return (
		<div className="flex flex-col mr-16 h-full">
			<div className="flex text-4xl font-light pb-4 border-b">Dashboard</div>			
			<div className="flex-grow flex flex-col h-full relative">
			{isLoading ?(<div className="w-full h-full flex z-50 bg-black  bg-opacity-10 rounded items-center justify-center absolute">
				<Spinner size="xl" />
			</div>) : <Fragment >
				<div className="flex-grow flex flex-col pb-4">
					<div className="flex gap-2 flex-row mt-4">
						<div className="text-2xl">{user?.firstName || 'John'}</div>
						<div className="text-2xl">{user?.lastName || 'Doe'}</div>
					</div>
					<div className="flex gap-2 flex-row mt-2 text-gray-700">{user?.email || 'johndoe@mgail.com'}</div>
					<div className="flex-1 flex flex-col text-sm font-medium text-gray-500">
						<div className="flex flex-col my-4">
							<div className="text-black">Address</div>
							<div>{user?.address || 'Address not specified'}</div>
						</div>
						<div className="flex flex-row pb-4 border-b">
							<div className="flex-1 flex flex-col">
								<div className="text-black">Joined on</div>
								<div>On {user?.createdAt?.split('T')[0] || 'Unknown'} At {user.createdAt?.split('T')[1].slice(0,5) || 'Unknown'}</div>
							</div>
							<div className="flex-1 flex flex-col">
								<div className="text-black">Mobile</div>
								<div>{user?.mobile || 'Mobile number not specified'}</div>
							</div>
							<div className="flex-1 flex flex-col">
								<div className="text-black">Date of Birth</div>
								<div>{user?.dateOfBirth || '200-01-01'}</div>
							</div>
						</div>
						<div className="flex-1 flex flex-row gap-4 pt-4">
							<div className="flex-1 flex flex-col gap-4">
								<div className="">
									<div className="text-black">Total Jobs</div>
									<div>{user?.totalJobCount || 0}</div>
								</div>
								<div className="">
									<div className="text-black">Completed Jobs</div>
									<div>{user?.completedJobCount || 0}</div>
								</div>
								<div className="">
									<div className="text-black">Pending Jobs</div>
									<div>{user?.pendingJobCount || 0}</div>
								</div>
								
							</div>
							<div className="flex-1 flex flex-col gap-4">
								<div className="">
									<div className="text-black">Reviews Left</div>
									<div>{user?.reviewsLeft || 0}</div>
								</div>
								<div className="">
									<div className="text-black">Average Rating</div>
									<div>{user?.averageRating?.toString().slice(0,4) || "0.00"}</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2 mt-2 font-medium ">
						<Checkbox disabled checked={user?.isEmailsAccepted || false} />
						<Label>
							I agree to receive emails about QuickClean news, promotions and
							offers.
						</Label>
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
				</Fragment>}
			</div>
		</div>
	);
}

export default UserDashboardPage;
