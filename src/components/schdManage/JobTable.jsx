import React from "react";
import { Table } from "flowbite-react";
import JobTableHeader from "./JobTableHeader";
import JobTableRow from "./JobTableRow";

function JobTable({
	jobList,
	handleSortChange,
	sortDir,
	sortCol,
	lastTableRowRef,
}) {
	return (
		<div className="w-full h-full">
			<Table hoverable={true}>
				<Table.Head>
					<Table.HeadCell>
						<JobTableHeader
							dataName="id"
							title="Job Id"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							dataName="date"
							title="Date"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							dataName="hoursWorked"
							title="Length"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							dataName="crewDeployed"
							title="Crew"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							dataName="earnings"
							title="Revenue"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							dataName="rating"
							title="Rating"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell></Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y h-100">
					{jobList?.map((job, i) =>
						jobList.length === i + 1 ? (
							<JobTableRow rowRef={lastTableRowRef} job={job} key={i} />
						) : (
							<JobTableRow job={job} key={i} />
						)
					)}
				</Table.Body>
			</Table>
		</div>
	);
}

export default JobTable;
