import { Container, UserRoleChangeModal } from '../../components'
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, Rating, Spinner, Table } from 'flowbite-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useInfiniteScroll } from '../../hooks';
import axios from 'axios';

const JOB_INFO_URL = "/admin/jobs/job";
const USER_DATA_URL = process.env.REACT_APP_USER_DETAILS_API_URL;
const USER_COMPLETED_JOBS_URL = process.env.REACT_APP_USER_COMPLETED_JOBS_API_URL;
const USER_PENDING_JOBS_URL = process.env.REACT_APP_USER_FUTURE_JOBS_API_URL; 
const pgSize = 10;

function AdminUserPage() {
	const navigate = useNavigate();
	const [isRoleChangeMdlActive, setIsRoleChangeMdlActive] = useState(false);

	const [searchSortParams, setSearchSortParams] = useState({});
	const [userEmail, setUserEmail] = useState("");
	const [userType, setUserType] = useState("");
	const [toRole, setToRole] = useState("");
	const [user, setUser] = useState({});

	const [searchParams, setSearchParams] = useSearchParams();

	const [isLoading, setIsLoading] = useState(true);
	const [isRequestSuccess, setIsRequestSuccess] = useState(false);
	const [requestHasErr, setRequestHasErr] = useState(false);
	const [requestErrMsg, setRequestErrMsg] = useState("");
	
	//For Completed Job Table
	const [completedJobsPgNum, setCompletedJobsPgNum] = useState(1);
	const { completedJobsList, completedJobsHasMore, completedJobsIsLoading } = useInfiniteScroll(
		USER_COMPLETED_JOBS_URL,
		{...searchSortParams, type: "completed"},
		completedJobsPgNum,
		setCompletedJobsPgNum,
		pgSize,
		false
	);
	const completedJobsObserver = useRef();
	const completedJobsRowRef = useCallback(
		(node) => {
			if (completedJobsIsLoading) {
				return;
			}
			if (completedJobsObserver.current) {
				completedJobsObserver.current.disconnect();
			}
			completedJobsObserver.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && completedJobsHasMore) {
					setCompletedJobsPgNum((prevPgNum) => prevPgNum + 1);
				}
			});
			if (node) {
				completedJobsObserver.current.observe(node);
			}
		},
		[completedJobsIsLoading, completedJobsHasMore]
	);

	//For Completed Job Table
	const [pendingJobsPgNum, setPendingJobsPgNum] = useState(1);
	const { pendingJobsList, pendingJobsHasMore, pendingJobsIsLoading } = useInfiniteScroll(
		USER_PENDING_JOBS_URL,
		{...searchSortParams, type: "pending"},
		pendingJobsPgNum,
		setPendingJobsPgNum,
		pgSize,
		false
	);
	const pendingJobsObserver = useRef();
	const pendingJobsRowRef = useCallback(
		(node) => {
			if (pendingJobsIsLoading) {
				return;
			}
			if (pendingJobsObserver.current) {
				pendingJobsObserver.current.disconnect();
			}
			pendingJobsObserver.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && pendingJobsHasMore) {
					setPendingJobsPgNum((prevPgNum) => prevPgNum + 1);
				}
			});
			if (node) {
				pendingJobsObserver.current.observe(node);
			}
		},
		[pendingJobsIsLoading, pendingJobsHasMore]
	);
		
	useEffect(() => {
		setUserEmail(searchParams.get("email"));
		setSearchSortParams(searchParams.get("email"));
	}, []);

	useEffect(() => {
	  sendUserDataRequest();
	}, [userEmail])
	

	function sendUserDataRequest() {
		setIsLoading(true);
		setRequestHasErr(false);
		let cancelToken;
		axios
			.get(
				USER_DATA_URL,
				{
					params: { email: searchParams.get("email") },
					cancelToken: axios.CancelToken((c) => (cancelToken = c)),
				}
			)
			.then((response) => {
				setIsRequestSuccess(true);
				setUser(response.data);
				setUserType(response.data.permissions[0]);
				setToRole(response.data.permissions[0] === 'ADMIN' ? 'USER' : 'ADMIN');
			})
			.catch((err) => {
				setRequestHasErr(true);
				if (axios.isCancel(err)) {
					return;
				}
				if (err.response !== undefined) {
					setRequestErrMsg("An error curred. Could not get user data. Please try again later.")
				}
			})
			.then(() => setIsLoading(false));
	}

	return (
    <Fragment>
		<Container className="w-full h-full -z-50">
		<div className="flex flex-col mr-16 h-full relative">
			{isLoading ?(<div className="h-full w-full flex z-50 bg-black  bg-opacity-10 rounded items-center justify-center absolute">
				<Spinner size="xl" />
			</div>) : <Fragment >
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
					On {user?.lastLoggedAt?.split('T')[0]  || 'Unknown'} At {user?.lastLoggedAt?.split('T')[1].slice(0,5)  || 'Unknown'}
				</span>
				<span className="py-1 px-4 rounded text-sm border-l text-gray-500 font-medium">
					<div className="text-black">Created At</div>
					On {user?.createdAt?.split('T')[0] || 'Unknown'} At {user.createdAt?.split('T')[1].slice(0,5) || 'Unknown'}
				</span>
			</div>
			<div className="flex-grow flex flex-col h-full pt-4 gap-4">
				<div className=" flex flex-col gap-2 border-b p-2">
					<div className="flex-1 flex-col gap-1">
						<div className="flex flex-row justify-between items-center">
							<div className="text-2xl mb-2">{user.firstName} {user.lastName}</div>	
							<span className="bg-slate-100 text-slate-600 py-1 px-4 rounded font-medium h-full">
								{userType === 'USER' ? 'CLIENT' : userType}
							</span>
						</div>
						<div className="text-black">Email</div>
						<div className="font-medium text-sm text-gray-500 mb-2">
							{user.email}
						</div>
						<div className="text-black">Address</div>
						<div className="font-medium text-sm text-gray-500 mb-2">
							{user.address || "User has not specified an address"}
						</div>
					</div>
					<div className="flex flex-row justify-end">
						<Button onClick={() => setIsRoleChangeMdlActive(true)}>Change Role</Button>
					</div>
				</div>
				<div className="flex flex-1 gap-2">
					<div className="flex-1 border-r flex flex-col gap-3 px-4">
						<div className="flex flex-row gap-3 items-center">
							<div className="font-medium text-lg">Completed Jobs</div>
							<div className="text-sm bg-blue-500 text-white px-2 rounded">
								
							</div>
						</div>
						<div className="flex-1 border rounded bg-gray-50 overflow-y-scroll">
							<Table hoverable={true}>
								<Table.Head>
									<Table.HeadCell>Id</Table.HeadCell>
									<Table.HeadCell>Date</Table.HeadCell>
									<Table.HeadCell></Table.HeadCell>
								</Table.Head>
								<Table.Body className="divide-y h-100 transition-all">
									{completedJobsList?.map((job, i) => {
										completedJobsList.length === i + 1 ? (
											<Table.Row key={i} ref={completedJobsRowRef}>
											<Table.Cell>{job.id}</Table.Cell>
											<Table.Cell>{job.data}</Table.Cell>
											<Table.Cell>
												<Button size="xs" onClick={() => navigate(`${JOB_INFO_URL}?id=${job.id}`)}>
													Info
												</Button>
											</Table.Cell>
										</Table.Row>
										) : (
											<Table.Row key={i}>
											<Table.Cell>{job.id}</Table.Cell>
											<Table.Cell>{job.data}</Table.Cell>
											<Table.Cell>
												<Button size="xs" onClick={() => navigate(`${JOB_INFO_URL}?id=${job.id}`)}>
													Info
												</Button>
											</Table.Cell>
										</Table.Row>
										)
									})}
									{completedJobsIsLoading ? (
										<Table.Row>
											<Table.Cell
												className="font-medium text-gray-500 text-center bg-gray-50"
												colSpan={3}
											>
												<Spinner />
											</Table.Cell>
										</Table.Row>
									) : (
										""
									)}
									{!completedJobsHasMore && !completedJobsIsLoading ? (
										<Table.Row>
											<Table.Cell
												className="font-medium text-gray-500 text-center bg-gray-50"
												colSpan={3}
											>
												End of Content...
											</Table.Cell>
										</Table.Row>
									) : (
										""
									)}
								</Table.Body>
							</Table>
						</div>
					</div>
					<div className="flex-1 flex flex-col gap-3 px-4">
						<div className="flex flex-row gap-3 items-center">
							<div className="font-medium text-lg">Pending Jobs</div>
							<div className="text-sm bg-blue-500 text-white px-2 rounded">
								
							</div>
						</div>
						<div className="flex-1 border rounded bg-gray-50 overflow-y-scroll">
							<Table hoverable={true}>
								<Table.Head>
									<Table.HeadCell>Id</Table.HeadCell>
									<Table.HeadCell>Date</Table.HeadCell>
									<Table.HeadCell></Table.HeadCell>
								</Table.Head>
								<Table.Body className="divide-y h-100 transition-all">
									{pendingJobsList?.map((job, i) => {
										pendingJobsList.length === i + 1 ? (
											<Table.Row key={i} ref={pendingJobsRowRef}>
											<Table.Cell>{job.id}</Table.Cell>
											<Table.Cell>{job.data}</Table.Cell>
											<Table.Cell>
												<Button size="xs" onClick={() => navigate(`${JOB_INFO_URL}?id=${job.id}`)}>
													Info
												</Button>
											</Table.Cell>
										</Table.Row>
										) : (
											<Table.Row key={i}>
											<Table.Cell>{job.id}</Table.Cell>
											<Table.Cell>{job.data}</Table.Cell>
											<Table.Cell>
												<Button size="xs" onClick={() => navigate(`${JOB_INFO_URL}?id=${job.id}`)}>
													Info
												</Button>
											</Table.Cell>
										</Table.Row>
										)
									})}
									{pendingJobsIsLoading ? (
										<Table.Row>
											<Table.Cell
												className="font-medium text-gray-500 text-center bg-gray-50"
												colSpan={3}
											>
												<Spinner />
											</Table.Cell>
										</Table.Row>
									) : (
										""
									)}
									{!pendingJobsHasMore && !pendingJobsIsLoading ? (
										<Table.Row>
											<Table.Cell
												className="font-medium text-gray-500 text-center bg-gray-50"
												colSpan={3}
											>
												End of Content...
											</Table.Cell>
										</Table.Row>
									) : (
										""
									)}
								</Table.Body>
							</Table>
						</div>
					</div>
				</div>
			</div>
			</Fragment> }
		</div>
		</Container>
		<UserRoleChangeModal 
			isActive={isRoleChangeMdlActive} 
			setIsActive={setIsRoleChangeMdlActive}
			userEmail={userEmail}
			userType={userType}
			toRole={toRole}
		/>
	</Fragment>);
}

export default AdminUserPage