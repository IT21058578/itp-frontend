import React, { Fragment } from "react";
import { Spinner, Table } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import JobTableHeader from "../schdManage/JobTableHeader";

const ZONE_PAGE_URL = "/admin/employees/employee";

function EmployeeTable({
	dataList,
	handleSortChange,
	sortDir,
	sortCol,
	lastTableRowRef,
	hasMore,
	isLoading,
}) {
	const navigate = useNavigate();

	return (
		<div className="w-full h-full">
			<Table hoverable={true}>
				<Table.Head>
					<Table.HeadCell>
						<JobTableHeader
							dataName="id"
							title="Employee Id"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							dataName="firstName"
							title="Name"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							dataName="mobile"
							title="Mobile"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							dataName="zoneAssignmentsList"
							title="Zones"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y h-100">
					{dataList?.map((item, i) => (
						<Table.Row
							className={`transition-all font-medium hover:outline hover:rounded hover:outline-blue-500 hover:text-blue-600 hover:cursor-pointer ${
								item.disabled
									? "text-gray-400 hover:outline-gray-600 hover:text-gray-600"
									: ""
							}`}
							ref={dataList?.length === i + 1 ? lastTableRowRef : null}
							onClick={() => navigate(`${ZONE_PAGE_URL}?id=${item?.id || "?"}`)}
						>
							<Table.Cell
								className={`whitespace-nowrap dark:text-white ${
									item.disabled ? "text-gray-400" : "text-gray-900"
								}`}
							>
								{item?.id || "?"}
							</Table.Cell>
							<Table.Cell>
								{item?.firstName || "?"} {item?.lastName || "?"}
							</Table.Cell>
							<Table.Cell>{item?.mobile || "?"}</Table.Cell>
							<Table.Cell>
								<div className="flex flex-row gap-2 items-center">
									{item?.zoneAssignmentsList?.map((zoneItem, i) => (
										<div
											className={`text-xs ${
												item.disabled ? "bg-gray-400" : "bg-blue-400"
											} text-white px-2 rounded`}
										>
											{zoneItem?.sign || "?"}
										</div>
									))}
									{item?.zoneAssignmentsList?.length === 0 ? (
										<div className="text-xs bg-gray-400 text-white px-2 rounded">
											Unassigned
										</div>
									) : null}
								</div>
							</Table.Cell>
						</Table.Row>
					))}
					{isLoading ? (
						<Table.Row>
							<Table.Cell
								className="font-medium text-gray-500 text-center bg-gray-50"
								colSpan={4}
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
								colSpan={4}
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

export default EmployeeTable;
