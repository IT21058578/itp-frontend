import { Button, Table } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const JOB_INFO_URL = "#";

function JobTableRow({ job }) {
	const navigate = useNavigate();

	return (
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
				<Button size="xs" onClick={() => navigate(JOB_INFO_URL + job.jobId)}>
					Info
				</Button>
			</Table.Cell>
		</Table.Row>
	);
}

export default JobTableRow;
