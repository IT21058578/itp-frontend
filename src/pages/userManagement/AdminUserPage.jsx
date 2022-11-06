import {
	AdminUserJobTable,
	Container,
	UserRoleChangeModal,
} from "../../components";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const USER_DATA_URL = process.env.REACT_APP_USER_DETAILS_API_URL;
const pgSize = 10;

function AdminUserPage() {
	const navigate = useNavigate();
	const [isRoleChangeMdlActive, setIsRoleChangeMdlActive] = useState(false);

	const [userEmail, setUserEmail] = useState("");
	const [userType, setUserType] = useState("");
	const [toRole, setToRole] = useState("");
	const [user, setUser] = useState({});

	const [searchParams, setSearchParams] = useSearchParams();

	const [isLoading, setIsLoading] = useState(true);
	const [isRequestSuccess, setIsRequestSuccess] = useState(false);
	const [requestHasErr, setRequestHasErr] = useState(false);
	const [requestErrMsg, setRequestErrMsg] = useState("");

	useEffect(() => {
		setUserEmail(searchParams.get("email"));
	}, []);

	useEffect(() => {
		setToRole(user.userType === "USER" ? "ADMIN" : "USER");
	}, [user]);

	useEffect(() => {
		sendUserDataRequest();
	}, [userEmail]);

	function sendUserDataRequest() {
		setIsLoading(true);
		setRequestHasErr(false);
		let cancelToken;
		axios
			.get(USER_DATA_URL, {
				params: { email: searchParams.get("email") },
				cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
			})
			.then((response) => {
				setIsRequestSuccess(true);
				setUser(response.data);
			})
			.catch((err) => {
				setRequestHasErr(true);
				if (axios.isCancel(err)) {
					return;
				}
				if (err.response !== undefined) {
					setRequestErrMsg(
						"An error curred. Could not get user data. Please try again later."
					);
				}
			})
			.then(() => setIsLoading(false));
	}

	return (
		<Fragment>
			<Container className="w-full h-full -z-50">
				<div className="flex flex-col mr-16 h-full relative">
					{isLoading ? (
						<div className="h-full w-full flex z-50 bg-black  bg-opacity-10 rounded items-center justify-center absolute">
							<Spinner size="xl" />
						</div>
					) : (
						<Fragment>
							<div className="flex flex-row text-2xl pb-2 border-b items-center justify-between">
								<span className="flex flex-row items-center gap-4">
									<span onClick={() => navigate(-1)}>
										<ChevronLeftIcon className="h-10 w-10 p-2 rounded transition-all hover:cursor-pointer hover:text-blue-600 active:text-blue-700 hover:bg-blue-50 active:bg-blue-200" />
									</span>
									<span className="bg-slate-100 text-slate-600 py-1 px-4 rounded ">
										#{user.id}
									</span>
								</span>
								<span className="py-1 px-4 rounded text-sm border-l text-gray-500 font-medium">
									<div className="text-black">Last Login</div>
									On {user?.lastLoggedAt?.split("T")[0] || "Unknown"} At{" "}
									{user?.lastLoggedAt?.split("T")[1].slice(0, 5) || "Unknown"}
								</span>
								<span className="py-1 px-4 rounded text-sm border-l text-gray-500 font-medium">
									<div className="text-black">Created At</div>
									On {user?.createdAt?.split("T")[0] || "Unknown"} At{" "}
									{user.createdAt?.split("T")[1].slice(0, 5) || "Unknown"}
								</span>
							</div>
							<div className="flex-grow flex flex-col h-full pt-4 gap-4">
								<div className=" flex flex-col gap-2 border-b p-2">
									<div className="flex-1 flex-col gap-1">
										<div className="flex flex-row justify-between items-center">
											<div className="text-2xl mb-2">
												{user.firstName} {user.lastName}
											</div>
											<span className="bg-slate-100 text-slate-600 py-1 px-4 rounded font-medium h-full">
												{user.userType === "USER" ? "CLIENT" : user.userType}
											</span>
										</div>
										<div className="flex flex-row font-medium">
											<div className="flex-1">
												<div className="text-black">Email</div>
												<div className="font-medium text-sm text-gray-500 mb-4">
													{user.email}
												</div>
												<div className="text-black">Mobile</div>
												<div className="font-medium text-sm text-gray-500 mb-2">
													{user.mobile || "Mobile not specified"}
												</div>
											</div>
											<div className="flex-1">
												<div className="text-black">Total Earnings</div>
												<div className="font-medium text-sm text-gray-500 mb-4">
													{user.totalEarnings || 0}
												</div>
												<div className="text-black">Average Earnings </div>
												<div className="font-medium text-sm text-gray-500 mb-2">
													{user.averageEarnings !== "NaN"
														? user.averageEarnings
														: 0}
												</div>
											</div>
											<div className="flex-1">
												<div className="text-black">Reviews Left</div>
												<div className="font-medium text-sm text-gray-500 mb-4">
													{user.reviewsLeft || 0}
												</div>
												<div className="text-black">Average Rating</div>
												<div className="font-medium text-sm text-gray-500 mb-2">
													{user.averageRating !== "NaN"
														? user.averageRating?.toString()?.slice(0, 4)
														: "0.00"}
												</div>
											</div>
										</div>
									</div>
									<div className="flex flex-row justify-end">
										<div className="flex-1">
											<div className="text-black">Address</div>
											<div className="font-medium text-sm text-gray-500 mb-4">
												{user.address || "Address not specified"}
											</div>
										</div>
										<div className="w-1/6">
											<Button onClick={() => setIsRoleChangeMdlActive(true)}>
												Change Role
											</Button>
										</div>
									</div>
								</div>
								<div className="flex flex-1 gap-2">
									<div className="flex-1 border-r flex flex-col gap-3 px-4">
										<div className="flex flex-row gap-3 items-center">
											<div className="font-medium text-lg">Completed Jobs</div>
											<div className="text-sm bg-blue-500 text-white px-2 rounded">
												{user.completedJobCount || 0}
											</div>
										</div>
										<div
											className="flex-grow border rounded bg-gray-50 overflow-y-scroll"
											style={{ height: "10vh" }}
										>
											<AdminUserJobTable
												type="COMPLETED"
												pgSize={pgSize}
												clientId={user?.id}
											/>
										</div>
									</div>
									<div className="flex-1 flex flex-col gap-3 px-4">
										<div className="flex flex-row gap-3 items-center">
											<div className="font-medium text-lg">Pending Jobs</div>
											<div className="text-sm bg-blue-500 text-white px-2 rounded">
												{user.pendingJobCount || 0}
											</div>
										</div>
										<div
											className="flex-grow border rounded bg-gray-50 overflow-y-scroll"
											style={{ height: "10vh" }}
										>
											<AdminUserJobTable
												type="PENDING"
												pgSize={pgSize}
												clientId={user?.id}
											/>
										</div>
									</div>
								</div>
							</div>
						</Fragment>
					)}
				</div>
			</Container>
			<UserRoleChangeModal
				isActive={isRoleChangeMdlActive}
				setIsActive={setIsRoleChangeMdlActive}
				userEmail={userEmail}
				userType={userType}
				toRole={toRole}
			/>
		</Fragment>
	);
}

export default AdminUserPage;
