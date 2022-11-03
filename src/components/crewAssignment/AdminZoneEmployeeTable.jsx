import React, {
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Spinner, Table } from "flowbite-react";
import { useInfiniteScroll } from "../../hooks";
import { useNavigate } from "react-router-dom";

const EMPLOYEE_SEARCH_URL = process.env.REACT_APP_EMPLOYEE_SEARCH_API_URL;
const EMPLOYEE_INFO_URL = "/admin/employees/employee";

function AdminZoneEmployeeTable({ zoneId, pgSize, setItemCount }) {
	const navigate = useNavigate();
	const [pgNum, setPgNum] = useState(1);
	const { dataList, hasMore, isLoading, totalElements } = useInfiniteScroll(
		EMPLOYEE_SEARCH_URL,
		{ zoneId },
		pgNum,
		setPgNum,
		pgSize,
		false
	);
	const observer = useRef();
	const rowRef = useCallback(
		(node) => {
			if (isLoading) {
				return;
			}
			if (observer.current) {
				observer.current.disconnect();
			}
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPgNum((prevPgNum) => prevPgNum + 1);
				}
			});
			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, hasMore]
	);

	useEffect(() => {
		setItemCount(totalElements);
	}, [totalElements]);

	return (
		<Fragment>
			<Table hoverable={true}>
				<Table.Head>
					<Table.HeadCell>Id</Table.HeadCell>
					<Table.HeadCell>Name</Table.HeadCell>
					<Table.HeadCell>Job Title</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y h-100 transition-all">
					{dataList?.map((employee, i) => (
						<Table.Row
							key={i}
							ref={dataList.length === i + 1 ? rowRef : null}
							onClick={() =>
								navigate(`${EMPLOYEE_INFO_URL}?id=${employee?.id || ""}`)
							}
							className="transition-all hover:outline hover:rounded hover:outline-blue-500 hover:text-blue-600 hover:cursor-pointer font-medium"
						>
							<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
								{employee?.id || "?"}
							</Table.Cell>
							<Table.Cell>
								{employee?.firstName || "?"} {employee?.lastName || "?"}
							</Table.Cell>
							<Table.Cell>{employee?.jobTitle || "?"}</Table.Cell>
						</Table.Row>
					))}
					{isLoading ? (
						<Table.Row>
							<Table.Cell
								className="font-medium text-gray-500 text-center bg-gray-50"
								colSpan={3}
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
								colSpan={3}
							>
								End of Content...
							</Table.Cell>
						</Table.Row>
					) : (
						""
					)}
				</Table.Body>
			</Table>
		</Fragment>
	);
}

export default AdminZoneEmployeeTable;
