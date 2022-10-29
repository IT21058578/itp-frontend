import { Table } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const JOB_INFO_URL = "/admin/jobs/job";

function JobTableRow({ job, rowRef }) {
	const navigate = useNavigate();

	return (
		<Table.Row 
			className="bg-white transition-all hover:outline hover:rounded hover:outline-blue-500 hover:text-blue-600 hover:cursor-pointer" 
			onClick={() => navigate(`${JOB_INFO_URL}?id=${job.id}`)}>
				<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
					{job.id}
					<div ref={rowRef}></div>
				</Table.Cell>
				<Table.Cell className="font-medium">{job.date}</Table.Cell>
				<Table.Cell className="font-medium">{job.hoursWorked}</Table.Cell>
				<Table.Cell className="font-medium">{job.crewDeployed}</Table.Cell>
				<Table.Cell className="font-medium">{job.earnings}</Table.Cell>
				<Table.Cell className="font-medium">{job.rating.toString().slice(0, 4)}</Table.Cell>
		</Table.Row>
	);
}

export default JobTableRow;
