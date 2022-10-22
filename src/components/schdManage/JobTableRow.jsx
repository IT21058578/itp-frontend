import { Button, Table } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JOB_INFO_URL = "/admin/jobs/job";

function JobTableRow({ job, rowRef }) {
	const navigate = useNavigate();
	const [rowClasses, setRowClasses] = useState(
		"bg-white dark:border-gray-700 dark:bg-gray-800 transition-all"
	);

	return (
		<Table.Row className={rowClasses}>
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{job.id.slice(0, 10) + "..."}
				<div ref={rowRef}></div>
			</Table.Cell>
			<Table.Cell className="font-medium">{job.date}</Table.Cell>
			<Table.Cell className="font-medium">{job.hoursWorked}</Table.Cell>
			<Table.Cell className="font-medium">{job.crewDeployed}</Table.Cell>
			<Table.Cell className="font-medium">{job.earnings}</Table.Cell>
			<Table.Cell className="font-medium">{job.rating.toString().slice(0, 4)}</Table.Cell>
			<Table.Cell className="font-medium">
				<Button size="xs" onClick={() => navigate(`${JOB_INFO_URL}?id=${job.id}`)}>
					Info
				</Button>
			</Table.Cell>
		</Table.Row>
	);
}

export default JobTableRow;
