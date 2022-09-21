import React from "react";
import { Button, Table } from "flowbite-react";
import { ChevronUpIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
const JOB_INFO_URL = "#"; //admin/job/;

function JobTable({ jobList }) {
	const navigate = useNavigate();
	return (
		<div className="w-full h-full">
			<Table hoverable={true}>
				<Table.Head>
					<Table.HeadCell>
						<div className="flex flex-row items-center">
							<div className="pr-2 h-fit">Job Id</div>
							<div className="hover:cursor-pointer active:text-blue-500 w-fit">
								<ChevronUpIcon className="h-5 w-5" />
							</div>
						</div>
					</Table.HeadCell>
					<Table.HeadCell>Start Time</Table.HeadCell>
					<Table.HeadCell>End Time</Table.HeadCell>
					<Table.HeadCell>Client Id</Table.HeadCell>
					<Table.HeadCell>Crew</Table.HeadCell>
					<Table.HeadCell>Revenue</Table.HeadCell>
					<Table.HeadCell>Rating</Table.HeadCell>
					<Table.HeadCell>Recurring</Table.HeadCell>
					<Table.HeadCell></Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{jobList?.map((job, i) => {
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell lassName="whitespace-nowrap font-medium text-gray-900 dark:text-white">
								{job.jobId}
							</Table.Cell>
							<Table.Cell>{job.startTime}</Table.Cell>
							<Table.Cell>{job.endTime}</Table.Cell>
							<Table.Cell>{job.clientId}</Table.Cell>
							<Table.Cell>{job.crewNum}</Table.Cell>
							<Table.Cell>{job.revenue}</Table.Cell>
							<Table.Cell>{job.rating}</Table.Cell>
							<Table.Cell>{job.isRecurring}</Table.Cell>
							<Table.Cell>
								<Button
									size="xs"
									onClick={() => navigate(JOB_INFO_URL + job.jobId)}
								>
									Info
								</Button>
							</Table.Cell>
						</Table.Row>;
					})}
				</Table.Body>
			</Table>
		</div>
	);
}

export default JobTable;
