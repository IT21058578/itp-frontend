import React from "react";
import { Spinner, Table } from "flowbite-react";
import JobTableHeader from "./JobTableHeader";
import JobTableRow from "./JobTableRow";

function JobTable({
	jobList,
	handleSortChange,
	sortDir,
	sortCol,
	lastTableRowRef,
	hasMore,
	isLoading,
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
					{isLoading ? (
						<Table.Row>
							<Table.Cell
								className="font-medium text-gray-500 text-center bg-gray-50"
								colSpan={7}
							>
								<Spinner />
							</Table.Cell>
						</Table.Row>
					) : (
						""
					)}
					{!hasMore && !isLoading ? (
						<Table.Row>
							<Table.Cell
								className="font-medium text-gray-500 text-center bg-gray-50"
								colSpan={7}
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
	);
}

export default JobTable;
