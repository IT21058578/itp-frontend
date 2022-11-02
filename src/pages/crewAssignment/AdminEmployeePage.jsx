import {
	AdminEmployeeJobTable,
	Container,
	EmployeeAssignModal,
	EmployeeDisableModal,
	EmployeeEditModal,
} from "../../components";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	ChevronLeftIcon,
	MapIcon,
	PencilIcon,
	TrashIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";

const EMPLOYEE_DATA_URL = process.env.REACT_APP_EMPLOYEE_API_URL;

const EMPLOYEE_ZONE_ASSIGN_URL = process.env.REACT_APP_EMPLOYEE_ASSIGN_API_URL;
const pgSize = 10;

function AdminEmployeePage() {
	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();

	const [employee, setEmployee] = useState({});
	const [isEmployeeAssignMdlActive, setIsEmployeeAssignMdlActive] =
		useState(false);
	const [isEmployeeEditMdlActive, setIsEmployeeEditMdlActive] = useState(false);
	const [isEmployeeDeleteMdlActive, setIsEmployeeDeleteMdlActive] =
		useState(false);

	const [isLoading, setIsLoading] = useState(false);
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
								</span>
								<span className="flex flex-row items-center">
									<span>
										{employee?.firstName || "Unknown"}{" "}
										{employee?.lastName || "Unknown"}
									</span>
								</span>
								<span className="py-1 px-4 rounded text-sm border-l text-gray-500 font-medium">
									<div className="text-black">Created On</div>
									On {employee?.createdOn || "Unknown"}
								</span>
							</div>
							<div className="flex-1 flex flex-row h-full pt-4 gap-4 border-b">
								<div className="flex-1 flex flex-col h-full gap-4"></div>
								<div className="flex flex-col h-full gap-4">
									<Button onClick={() => setIsEmployeeEditMdlActive(true)}>
										<PencilIcon className="w-10 h-10" />
									</Button>
									<Button onClick={() => setIsEmployeeAssignMdlActive(true)}>
										<MapIcon className="w-10 h-10" />
									</Button>
									<Button
										color="failure"
										onClick={() => setIsEmployeeDeleteMdlActive(true)}
									>
										<TrashIcon className="w-10 h-10" />
									</Button>
								</div>
							</div>
							<div className="flex flex-1 flex-row gap-2 pt-4">
								<div className="flex-1 border-r flex flex-col gap-3 px-4">
									<div className="flex flex-row gap-3 items-center">
										<div className="font-medium text-lg">Pending Jobs</div>
										<div className="text-sm bg-blue-500 text-white px-2 rounded">
											{employee?.pendingJobCount || 0}
										</div>
									</div>
									<div
										className="flex-grow border rounded bg-gray-50 overflow-y-scroll"
										style={{ height: "10vh" }}
									>
										<AdminEmployeeJobTable
											type="PENDING"
											pgSize={pgSize}
											email={employee?.id}
										/>
									</div>
								</div>
								<div className="flex-1 flex flex-col gap-3 px-4">
									<div className="flex flex-row gap-3 items-center">
										<div className="font-medium text-lg">Completed Jobs</div>
										<div className="text-sm bg-blue-500 text-white px-2 rounded">
											{employee?.completedJobCount || 0}
										</div>
									</div>
									<div
										className="flex-grow border rounded bg-gray-50 overflow-y-scroll"
										style={{ height: "10vh" }}
									>
										<AdminEmployeeJobTable
											type="COMPLETED"
											pgSize={pgSize}
											email={employee?.id}
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
			/>
			<EmployeeDisableModal
				isActive={isEmployeeDeleteMdlActive}
				setIsActive={setIsEmployeeDeleteMdlActive}
			/>
			<EmployeeEditModal
				isActive={isEmployeeEditMdlActive}
				setIsActive={setIsEmployeeEditMdlActive}
			/>
		</Fragment>
	);
}

export default AdminEmployeePage;
