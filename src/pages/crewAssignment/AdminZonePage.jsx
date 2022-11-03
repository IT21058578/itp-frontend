import {
	Container,
	AdminZoneEmployeeTable,
	AdminZoneJobTable,
	ZoneDeleteModal,
	ZoneEditModal,
	ZoneToggleModal,
} from "../../components";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Spinner, Tooltip } from "flowbite-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	ChevronLeftIcon,
	PencilIcon,
	TrashIcon,
	ArrowPathIcon,
	HandRaisedIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";

const ZONE_DATA_URL = process.env.REACT_APP_ZONE_API_URL;
const pgSize = 10;

function AdminZonePage() {
	const navigate = useNavigate();
	const [zone, setZone] = useState({});
	const [employeeCount, setEmployeeCount] = useState(1);
	const [jobCount, setJobCount] = useState(1);

	const [isZoneEditMdlActive, setIsZoneEditMdlActive] = useState(false);
	const [isZoneDeleteMdlActive, setIsZoneDeleteMdlActive] = useState(false);
	const [isZoneToggleMdlActive, setIsZoneToggleMdlActive] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams();

	const [isLoading, setIsLoading] = useState(true);
	const [isRequestSuccess, setIsRequestSuccess] = useState(false);
	const [requestHasErr, setRequestHasErr] = useState(false);
	const [requestErrMsg, setRequestErrMsg] = useState("");

	useEffect(() => {
		sendZoneDataRequest();
	}, []);

	function sendZoneDataRequest() {
		setIsLoading(true);
		setRequestHasErr(false);
		let cancelToken;
		axios
			.get(ZONE_DATA_URL, {
				params: { id: searchParams.get("id") },
				cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
			})
			.then((response) => {
				setIsRequestSuccess(true);
				setZone(response.data);
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
										#{zone.id || "???"}
									</span>
									<span className="flex flex-row items-center w-fit bg-blue-400 text-white px-4 py-1 rounded">
										<span>{zone?.sign || "???"}</span>
									</span>
								</span>
								<span className="py-1 px-4 rounded text-sm border-l text-gray-500 font-medium">
									<div className="text-black">Last Updated On</div>
									On {zone?.lastUpdatedOn || "Unknown"}
								</span>
								<span className="py-1 px-4 rounded text-sm border-l text-gray-500 font-medium">
									<div className="text-black">Created On</div>
									On {zone?.createdOn || "Unknown"}
								</span>
							</div>
							<div className="flex-1 flex flex-row h-full pt-4 gap-4 border-b">
								<div className="flex-1 flex flex-col h-full gap-4">
									<div className="flex-1 flex flex-col font-medium">
										<div className="text-xl mb-2">{zone?.name || "?"}</div>
										<div className="text-gray-500">
											{zone?.description || "?"}
										</div>
									</div>
									<div className="flex flex-row font-medium border-t pt-2 mt-2">
										<div className="flex-1">
											<div className="text-black">Average Rating</div>
											<div className="font-medium text-sm text-gray-500 mb-4">
												{zone?.averageRating || "0.00"}
											</div>
											<div className="text-black">Pending Job Count</div>
											<div className="font-medium text-sm text-gray-500 mb-2">
												{zone?.pendingJobCount || 0}
											</div>
										</div>
										<div className="flex-1">
											<div className="text-black">Completed Job Count</div>
											<div className="font-medium text-sm text-gray-500 mb-4">
												{zone?.completedJobCount || 0}
											</div>
										</div>
									</div>
								</div>
								<div className="flex flex-col h-full gap-4 border-l p-4">
									<Button onClick={() => setIsZoneEditMdlActive(true)}>
										<PencilIcon className="w-8 h-8" />
									</Button>
									<Button
										color={zone?.disabled ? "success" : "failure"}
										onClick={() => setIsZoneToggleMdlActive(true)}
									>
										{zone?.disabled ? (
											<ArrowPathIcon className="w-8 h-8" />
										) : (
											<HandRaisedIcon className="w-8 h-8" />
										)}
									</Button>
									<Tooltip
										content="Zone can only be deleted if there are no jobs and employees assigned to it"
										style="light"
										placement="right"
									>
										<Button
											disabled={jobCount > 0 ||  employeeCount > 0}
											color="failure"
											onClick={() => setIsZoneDeleteMdlActive(true)}
										>
											<TrashIcon className="w-8 h-8" />
										</Button>
									</Tooltip>
								</div>
							</div>
							<div className="flex flex-1 flex-row gap-2 pt-4">
								<div className="flex-1 border-r flex flex-col gap-3 px-4">
									<div className="flex flex-row gap-3 items-center">
										<div className="font-medium text-lg">Employees</div>
										<div className="text-sm bg-blue-500 text-white px-2 rounded">
											{employeeCount || 0}
										</div>
									</div>
									<div
										className="flex-grow border rounded bg-gray-50 overflow-y-scroll"
										style={{ height: "10vh" }}
									>
										<AdminZoneEmployeeTable
											zoneId={zone?.id}
											pgSize={pgSize}
											setItemCount={setEmployeeCount}
										/>
									</div>
								</div>
								<div className="flex-1 flex flex-col gap-3 px-4">
									<div className="flex flex-row gap-3 items-center">
										<div className="font-medium text-lg">Jobs</div>
										<div className="text-sm bg-blue-500 text-white px-2 rounded">
											{jobCount || 0}
										</div>
									</div>
									<div
										className="flex-grow border rounded bg-gray-50 overflow-y-scroll"
										style={{ height: "10vh" }}
									>
										<AdminZoneJobTable
											zoneId={zone?.id}
											pgSize={pgSize}
											setItemCount={setJobCount}
										/>
									</div>
								</div>
							</div>
						</Fragment>
					)}
				</div>
			</Container>
			<ZoneToggleModal
				isActive={isZoneToggleMdlActive}
				setIsActive={setIsZoneToggleMdlActive}
				zone={zone}
			/>
			<ZoneDeleteModal
				isActive={isZoneDeleteMdlActive}
				setIsActive={setIsZoneDeleteMdlActive}
				zone={zone}
			/>
			<ZoneEditModal
				isActive={isZoneEditMdlActive}
				setIsActive={setIsZoneEditMdlActive}
				zone={zone}
			/>
		</Fragment>
	);
}

export default AdminZonePage;
