import React from "react";
import { Table } from "flowbite-react";
import JobTableHeader from "./JobTableHeader";
import JobTableRow from "./JobTableRow";

function JobTable({ jobList, handleSortChange, sortDir, sortCol }) {
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
					{jobList?.map((job, i) => (
						<JobTableRow job={job} key={i} />
					))}
				</Table.Body>
			</Table>
		</div>
	);
}

export default JobTable;
