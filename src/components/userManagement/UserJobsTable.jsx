import React, { useCallback, useRef, useState } from "react";
import { Rating, Spinner, Table } from "flowbite-react";
import { useInfiniteScroll } from "../../hooks";
import { useNavigate } from "react-router-dom";
import JobTableHeader from "../schdManage/JobTableHeader";
import { useEffect } from "react";
import { RatingStar } from "flowbite-react/lib/esm/components/Rating/RatingStar";

const JOB_INFO_URL = "/profile/job";
const JOB_SEARCH_URL = process.env.REACT_APP_JOB_SEARCH_API_URL;
const pgSize = 10;

function UserJobsTable({ type, clientId }) {
	const [sortCol, setSortCol] = useState("");
	const [sortDir, setSortDir] = useState("");
	const navigate = useNavigate();
	const [pgNum, setPgNum] = useState(1);
	const { dataList, hasMore, isLoading } = useInfiniteScroll(
		JOB_SEARCH_URL,
		{ clientId, status: type, sortCol, sortDir },
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

	function handleSortChange(col) {
		if (sortCol === col) {
			if (sortDir === "") {
				setSortDir("asc");
			}
			if (sortDir === "asc") {
				setSortDir("desc");
			}
			if (sortDir === "desc") {
				setSortDir("");
			}
		} else {
			setSortCol(col);
			setSortDir("asc");
		}
	}

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
							dataName="startTime"
							title="Period"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							dataName="amount"
							title="Amount"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
					<Table.HeadCell>
						<JobTableHeader
							dataName="review.rating"
							title="Rating"
							sortCol={sortCol}
							sortDir={sortDir}
							handleSortChange={handleSortChange}
						/>
					</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y h-100">
					{dataList?.map((job, i) => (
						<Table.Row
							key={i}
							ref={dataList?.length === i + 1 ? rowRef : null}
							onClick={() => navigate(`${JOB_INFO_URL}?id=${job.id}`)}
							className="transition-all bg-white hover:outline hover:rounded hover:outline-blue-500 hover:text-blue-600 hover:cursor-pointer font-medium"
						>
							<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
								{job.id}
							</Table.Cell>
							<Table.Cell>{job?.date}</Table.Cell>
							<Table.Cell>
								{job?.startTime?.split("T")[1].slice(0, 5)} to{" "}
								{job?.endTime?.split("T")[1].slice(0, 5)}
							</Table.Cell>
							<Table.Cell>{job?.amount}</Table.Cell>
							<Table.Cell>
								<Rating>
									<div className="flex flex-row gap-2">
										<RatingStar filled={job?.review !== null} />
										{job?.review?.rating.toString().slice(0, 4) || "0.00"}
									</div>
								</Rating>
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

export default UserJobsTable;
