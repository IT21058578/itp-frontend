import {
	AdminEmployeeJobTable,
	AdminEmployeeZoneBadge,
	Container,
	EmployeeAssignModal,
	EmployeeEditModal,
	EmployeeToggleModal,
	EmployeeUnassignModal,
} from "../../components";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	ArrowPathIcon,
	ChevronLeftIcon,
	HandRaisedIcon,
	MapIcon,
	PencilIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";

const EMPLOYEE_DATA_URL = process.env.REACT_APP_EMPLOYEE_API_URL;
const pgSize = 10;

function AdminEmployeePage() {
	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();

	const [employee, setEmployee] = useState({});
	const [pendingJobCount, setPendingJobCount] = useState(0);
	const [completedJobCount, setCompletedJobCount] = useState(0);

	const [isEmployeeAssignMdlActive, setIsEmployeeAssignMdlActive] =
		useState(false);
	const [isEmployeeEditMdlActive, setIsEmployeeEditMdlActive] = useState(false);
	const [isEmployeeDeleteMdlActive, setIsEmployeeDeleteMdlActive] =
		useState(false);
	const [isEmployeeToggleMdlActive, setIsEmployeeToggleMdlActive] =
		useState(false);

	const [isEmployeeUnassignMdlActive, setIsEmployeeUnassignMdlActive] =
		useState(false);
	const [unassignZoneId, setUnassignZoneId] = useState("");

	const [isLoading, setIsLoading] = useState(true);
	const [isRequestSuccess, setIsRequestSuccess] = useState(false);
	const [requestHasErr, setRequestHasErr] = useState(false);
	const [requestErrMsg, setRequestErrMsg] = useState("");

	useEffect(() => {
		sendEmployeeDataRequest();
	}, []);

	function sendEmployeeDataRequest() {
		setIsLoading(true);
		setRequestHasErr(false);
		let cancelToken;
		axios
			.get(EMPLOYEE_DATA_URL, {
				params: { id: searchParams.get("id") },
				cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
			})
			.then((response) => {
				setIsRequestSuccess(true);
				setEmployee(response.data);
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
										#{employee.id || "???"}
									</span>
									<span className="flex flex-row items-center">
										<span>
											{employee?.firstName || "Unknown"}{" "}
											{employee?.lastName || "Unknown"}
										</span>
									</span>
								</span>
								<span className="py-1 px-4 rounded text-sm border-l text-gray-500 font-medium">
									<div className="text-black">Joined On</div>
									On {employee?.joinedOn || "Unknown"}
								</span>
							</div>
							<div className="flex-1 flex flex-row h-full pt-4 gap-4 border-b">
								<div className="flex-1 flex flex-col h-full gap-4">
									<div className="flex-1"></div>
									<div>
										<div className="flex-1 font-medium border-t pt-2">
											<div className="text-black mb-2 text-lg">
												Assigned Zones
											</div>
											<div className="flex flex-row gap-2 font-medium text-lg text-gray-500 mb-4">
												{employee?.zoneAssignmentsList?.map((zone, i) => (
													<AdminEmployeeZoneBadge
														zone={zone}
														key={i}
														setUnassignZoneId={setUnassignZoneId}
														setIsEmployeeUnassignMdlActive={
															setIsEmployeeUnassignMdlActive
														}
													/>
												))}
												{employee?.zoneAssignmentsList?.length === 0 && (
													<span className="transition-all w-fit bg-gray-300 text-white px-4 py-1 rounded">
														Unassigned
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col h-full gap-2">
									<Button onClick={() => setIsEmployeeEditMdlActive(true)}>
										<PencilIcon className="w-8 h-8" />
									</Button>
									<Button onClick={() => setIsEmployeeAssignMdlActive(true)}>
										<MapIcon className="w-8 h-8" />
									</Button>
									<Button
										color={employee?.disabled ? "success" : "failure"}
										onClick={() => setIsEmployeeToggleMdlActive(true)}
									>
										{employee?.disabled ? (
											<ArrowPathIcon className="w-8 h-8" />
										) : (
											<HandRaisedIcon className="w-8 h-8" />
										)}
									</Button>
								</div>
							</div>
							<div className="flex flex-1 flex-row gap-2 pt-4">
								<div className="flex-1 border-r flex flex-col gap-3 px-4">
									<div className="flex flex-row gap-3 items-center">
										<div className="font-medium text-lg">Pending Jobs</div>
										<div className="text-sm bg-blue-500 text-white px-2 rounded">
											{pendingJobCount || 0}
										</div>
									</div>
									<div
										className="flex-grow border rounded bg-gray-50 overflow-y-scroll"
										style={{ height: "10vh" }}
									>
										<AdminEmployeeJobTable
											type="PENDING"
											pgSize={pgSize}
											id={employee?.id}
											setItemCount={setPendingJobCount}
										/>
									</div>
								</div>
								<div className="flex-1 flex flex-col gap-3 px-4">
									<div className="flex flex-row gap-3 items-center">
										<div className="font-medium text-lg">Completed Jobs</div>
										<div className="text-sm bg-blue-500 text-white px-2 rounded">
											{completedJobCount || 0}
										</div>
									</div>
									<div
										className="flex-grow border rounded bg-gray-50 overflow-y-scroll"
										style={{ height: "10vh" }}
									>
										<AdminEmployeeJobTable
											type="COMPLETED"
											pgSize={pgSize}
											id={employee?.id}
											setItemCount={setCompletedJobCount}
										/>
									</div>
								</div>
							</div>
						</Fragment>
					)}
				</div>
			</Container>
			<EmployeeAssignModal
				isActive={isEmployeeAssignMdlActive}
				setIsActive={setIsEmployeeAssignMdlActive}
				employee={employee}
			/>
			<EmployeeToggleModal
				isActive={isEmployeeToggleMdlActive}
				setIsActive={setIsEmployeeToggleMdlActive}
				employee={employee}
			/>
			<EmployeeEditModal
				isActive={isEmployeeEditMdlActive}
				setIsActive={setIsEmployeeEditMdlActive}
				employee={employee}
			/>
			<EmployeeUnassignModal
				isActive={isEmployeeUnassignMdlActive}
				setIsActive={setIsEmployeeUnassignMdlActive}
				employee={employee}
				zoneId={unassignZoneId}
			/>
		</Fragment>
	);
}

export default AdminEmployeePage;
