import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Modal, Rating, Spinner, Table } from "flowbite-react";
import { ArrowRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { UserReviewModal } from "../../components";

const JOB_DATA_URL = `${process.env.REACT_APP_BACKEND_URL}/job`;
//HOW TO GO BACK?

function UserJobPage() {
	const navigate = useNavigate();
	const [jobId, setJobId] = useState("12342er5t4445");
	const [job, setJob] = useState({});
	const [isReviewMdlActive, setIsReviewMdlActive] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams();

	const [isLoading, setIsLoading] = useState(false);
	const [isRequestSuccess, setIsRequestSuccess] = useState(false);
	const [requestHasErr, setRequestHasErr] = useState(false);
	const [requestErrMsg, setRequestErrMsg] = useState("");
	
	useEffect(() => {
		setJobId(searchParams.get("id"));
	}, [])

	useEffect(() => {
		sendJobDataRequest();
	}, [jobId])

	function sendJobDataRequest() {
		setIsLoading(true);
		setRequestHasErr(false);
		let cancelToken;
		axios
			.put(
				JOB_DATA_URL,
				{
					params: { jobId },
					cancelToken: axios.CancelToken((c) => (cancelToken = c)),
				}
			)
			.then((job) => {
				setIsRequestSuccess(true);
				setJob(job);
			})
			.catch((err) => {
				setRequestHasErr(true);
				if (axios.isCancel(err)) {
					return;
				}
				if (err.response !== undefined) {
					setRequestErrMsg("An error curred. Could not get job data. Please try again later.")
				}
			})
			.then(() => setIsLoading(false));
	}

	return (
		<Fragment>
		<div className="flex flex-col mr-16 h-full relative">
			{isLoading ?(<div className="h-full w-full flex z-50 bg-black  bg-opacity-10 rounded items-center justify-center absolute">
				<Spinner size="xl" />
			</div>) : ""}
			<Fragment >
			<div className="flex flex-row text-2xl pb-2 border-b items-center justify-between">
				<span className="flex flex-row items-center gap-4">
				<span onClick={() => navigate(-1)}>
						<ChevronLeftIcon className="h-10 w-10 p-2 rounded transition-all hover:cursor-pointer hover:text-blue-600 active:text-blue-700 hover:bg-blue-50 active:bg-blue-200" />
					</span>
					<span className="bg-slate-100 text-slate-600 py-1 px-4 rounded ">
						#{jobId}
					</span>
				</span>
				<span className="py-1 px-4 rounded text-sm border-l text-gray-500 font-medium">
					<div className="text-black">Date</div>
					2022-10-20
				</span>
				<span className="py-1 px-4 rounded text-sm border-l text-gray-500 font-medium">
					<div className="text-black">Period</div>
					10:20 to 13:20
				</span>
			</div>
			<div className="flex-grow flex flex-col h-full pt-4">
				<div className="flex-1 flex gap-2">
					<div className="flex-1 flex flex-col gap-2 rounded">
						<div className="h-4/6 border rounded bg-gray-50 overflow-y-scroll">
							<Table>
								<Table.Head>
									<Table.HeadCell>Service Name</Table.HeadCell>
									<Table.HeadCell>Qty</Table.HeadCell>
									<Table.HeadCell>Total Price</Table.HeadCell>
								</Table.Head>
								<Table.Body>
								{job?.cart?.map((item) => <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
										<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
											Room Cleaning
										</Table.Cell>
										<Table.Cell>4</Table.Cell>
										<Table.Cell>400</Table.Cell>
									</Table.Row>)}
								</Table.Body>
							</Table>
						</div>
						<div className="h-2/6 border rounded flex flex-col px-6 pt-4 pb-2 text-sm font-medium">
							<div className="h-2/4 flex flex-col gap-1">
								<div className="flex flex-row">
									<div className="flex-1">Address</div>
									<div className="flex flex-row gap-2 items-center">
										<div>Area</div>
										<div className="text-xs bg-blue-400 text-white px-2 rounded">
											A
										</div>
									</div>
								</div>
								<div className="flex-1 font-normal text-gray-500">
									59/3b, Saranankara Road, Dehiwala
								</div>
							</div>
							<div className="h-2/4 flex flex-row items-center">
								<div className="flex-1 border-r text-center flex flex-col gap-1">
									<div>Created At</div>
									<div className="font-normal text-gray-500">2001-12-05</div>
								</div>
								<div className="flex-1 text-center flex flex-col gap-1">
									<div>Amount</div>
									<div className=" bg-green-100 text-green-500 mx-8 rounded">
										500.0
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex-1 flex flex-col gap-2">
						<div className="h-2/4 border rounded overflow-y-scroll bg-gray-50">
							<Table>
								<Table.Head>
									<Table.HeadCell>Id</Table.HeadCell>
									<Table.HeadCell>Name</Table.HeadCell>
								</Table.Head>
								<Table.Body>
								{job?.crew?.map((emp) => <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
										<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
											34314efdsf8df89342
										</Table.Cell>
										<Table.Cell>John Doe</Table.Cell>
									</Table.Row>)}
								</Table.Body>
							</Table>
						</div>
						<div className="h-2/4 border rounded flex flex-col pb-2 text-sm font-medium relative">
							{ job.review === undefined ? <div className="h-full w-full flex bg-black  bg-opacity-10 items-center justify-center absolute">
								<Button onClick={() => setIsReviewMdlActive(true)}>Make a Review</Button>
							</div> : "" }
							<div className="h-2/4 flex flex-col gap-1 flex-1 px-6 pt-4">
								<div className="flex flex-row">
									<div className="flex-1">Title</div>
									<div className="flex flex-row gap-2 items-center">
										<div className="text-xs  px-2 rounded">
											<Rating>
												<Rating.Star filled={!job?.review === null}/>
												<p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
													0.0
												</p>
											</Rating>
										</div>
									</div>
								</div>
								<div className="font-normal text-gray-500">Title</div>
								<div className="flex flex-row mt-2">
									<div className="flex-1">Description</div>
								</div>
								<div className="flex-1 font-normal text-gray-500">
									Description
								</div>
								<div className="flex flex-row justify-end">
									<Button onClick={() => setIsReviewMdlActive(true)} size="sm" style={{ width: "25%", height: "85%" }}>
										Edit
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			</Fragment>
		</div>
		<UserReviewModal review={job?.review} isActive={isReviewMdlActive} setIsActive={setIsReviewMdlActive}/>
		</Fragment>
	);
}

export default UserJobPage;
