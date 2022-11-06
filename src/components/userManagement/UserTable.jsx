import { Button, Spinner, Table } from "flowbite-react";
import React, { Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JobTableHeader from "../schdManage/JobTableHeader";

const ADMIN_USER_PAGE_URL = "user";

function UserTable({
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
							dataName="tempId"
							title="User Id"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							dataName="email"
							title="email"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							dataName="name"
							title="name"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							dataName="type"
							title="type"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell></Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y h-100">
					{dataList?.map((item, i) => (
						<Table.Row
							key={i}
							className="transition-all font-medium hover:outline hover:rounded hover:outline-blue-500 hover:text-blue-600 hover:cursor-pointer"
							onClick={() =>
								navigate(`${ADMIN_USER_PAGE_URL}?email=${item.email}`)
							}
						>
							<Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white">
								<div ref={dataList.length === i + 1 ? lastTableRowRef : null} />
								{item.id}
							</Table.Cell>
							<Table.Cell>{item.email}</Table.Cell>
							<Table.Cell>{item.name}</Table.Cell>
							<Table.Cell>
								{item.type === "USER" ? "CLIENT" : item.type}
							</Table.Cell>
						</Table.Row>
					))}
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

export default UserTable;
