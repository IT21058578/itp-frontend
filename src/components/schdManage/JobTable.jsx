import React from "react";
import { Button, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import JobTableHeader from "./JobTableHeader";
import { useEffect } from "react";
const JOB_INFO_URL = "#"; //admin/job/;

function JobTable({ jobList, handleSortChange, sortDir, sortCol }) {
	const navigate = useNavigate();

	return (
		<div className="w-full h-full">
			<Table hoverable={true}>
				<Table.Head>
					<Table.HeadCell>
						<JobTableHeader
							colName="Job Id"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							colName="Date"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							colName="Length"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							colName="Crew"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							colName="Revenue"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							colName="Rating"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell></Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{jobList?.map((job, i) => {
						<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
							<Table.Cell lassName="whitespace-nowrap font-medium text-gray-900 dark:text-white">
								{job.jobId}
							</Table.Cell>
							<Table.Cell>{job.date}</Table.Cell>
							<Table.Cell>{job.length}</Table.Cell>
							<Table.Cell>{job.crewNum}</Table.Cell>
							<Table.Cell>{job.revenue}</Table.Cell>
							<Table.Cell>{job.rating}</Table.Cell>
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
