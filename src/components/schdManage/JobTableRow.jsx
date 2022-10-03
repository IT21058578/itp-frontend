import { Button, Table } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JOB_INFO_URL = "#";

function JobTableRow({ job, rowRef, isParamsChanged }) {
	const navigate = useNavigate();
	const [rowClasses, setRowClasses] = useState();

	useEffect(() => {
		if (isParamsChanged) {
			setRowClasses("bg-gray-100 dark:border-gray-700 dark:bg-gray-800");
		} else {
			setRowClasses("bg-white dark:border-gray-700 dark:bg-gray-800");
		}
	}, [isParamsChanged]);

	return (
		<Table.Row className={rowClasses}>
			<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
				{job.id.slice(0, 10) + "..."}
				<div ref={rowRef}></div>
			</Table.Cell>
			<Table.Cell>{job.date}</Table.Cell>
			<Table.Cell>{job.hoursWorked}</Table.Cell>
			<Table.Cell>{job.crewDeployed}</Table.Cell>
			<Table.Cell>{job.earnings}</Table.Cell>
			<Table.Cell>{job.rating.toString().slice(0, 4)}</Table.Cell>
			<Table.Cell>
				<Button size="xs" onClick={() => navigate(JOB_INFO_URL + job.jobId)}>
					Info
				</Button>
			</Table.Cell>
		</Table.Row>
	);
}

export default JobTableRow;
