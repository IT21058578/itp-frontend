import React, {
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Button, Spinner, Table } from "flowbite-react";
import { useInfiniteScroll } from "../../hooks";
import { useNavigate } from "react-router-dom";

const JOB_INFO_URL = "/admin/jobs/job";
const JOB_SEARCH_URL = process.env.REACT_APP_JOB_SEARCH_API_URL;

function AdminEmployeeJobTable({ type, id, pgSize, setItemCount }) {
	const navigate = useNavigate();
	const [pgNum, setPgNum] = useState(1);
	const { dataList, hasMore, isLoading, totalElements } = useInfiniteScroll(
		JOB_SEARCH_URL,
		{ employeeId: id, status: type },
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
	}, [dataList]);

	return (
		<Fragment>
			<Table hoverable={true}>
				<Table.Head>
					<Table.HeadCell>Id</Table.HeadCell>
					<Table.HeadCell>Date</Table.HeadCell>
					<Table.HeadCell>Period</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y h-100 transition-all">
					{dataList?.map((job, i) => (
						<Table.Row
							key={i}
							onClick={() => navigate(`${JOB_INFO_URL}?id=${job.id}`)}
							className="transition-all hover:outline hover:rounded hover:outline-blue-500 hover:text-blue-600 hover:cursor-pointer font-medium"
						>
							<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
								<div ref={dataList.length === i + 1 ? rowRef : null} />
								{job.id}
							</Table.Cell>
							<Table.Cell>{job.date}</Table.Cell>
							<Table.Cell>
								{job?.startTime?.split("T")[1].slice(0, 5)} to{" "}
								{job?.endTime?.split("T")[1].slice(0, 5)}
							</Table.Cell>
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

export default AdminEmployeeJobTable;
