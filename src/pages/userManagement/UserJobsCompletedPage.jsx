import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import { UserJobItem } from "../../components";
import { useInfiniteScroll } from "../../hooks";

const USER_COMPLETED_JOBS_URL = "";

function UserJobsCompletedPage() {
	const [completedJobNum, setCompletedJobNum] = useState(0);
	const [reviewJobNum, setReviewJobNum] = useState(0);
	const [pgNum, setPgNum] = useState(0);
	const [searchSortParams, setSearchSortParams] = useState({});

	const pgSize = 10;

	const { dataList, hasMore, isLoading, isError } = useInfiniteScroll(
		USER_COMPLETED_JOBS_URL,
		searchSortParams,
		pgNum,
		setPgNum,
		pgSize
	);

	return (
		<div className="flex flex-col mr-16 h-full">
			<div className="flex text-4xl font-light pb-4 border-b">
				Completed Jobs
			</div>
			<div className="flex-grow flex flex-col h-full">
				<div className=" mt-4">
					There are a total of {completedJobNum} completed jobs. You have left
					reviews for {reviewJobNum} them.
				</div>
				<div className="flex relative gap-1 flex-col flex-1 mt-4 border rounded h-full w-full bg-gray-100 overflow-y-scroll p-4">
					{dataList.map((j, i) =>
						dataList.length - 1 === i ? "Test" : "Test 2"
					)}
					<UserJobItem />
					<UserJobItem />
					<UserJobItem />
					{isLoading || hasMore ? (
						<div className="border shadow-lg rounded-md p-4 py-10 flex w-full flex-col gap-2 h-fit items-center bg-gray-50">
							<Spinner size="xl" />
						</div>
					) : (
						""
					)}
					{!hasMore && !isLoading ? (
						<div className="border shadow-lg rounded-md p-4 py-10 flex w-full flex-col gap-2 h-fit items-center bg-gray-50 font-medium text-gray-500">
							End of content...
						</div>
					) : (
						""
					)}
					{!isLoading && dataList?.length === 0 ? (
					<div className="font-medium text-gray-500 h-full w-full border border-red-500 flex items-center">
						<div className="text-center flex-1">Nothing here for now. When a job you bought is completed, it will show up here.</div>
					</div>
					):""}
				</div>
			</div>
		</div>
	);
}

export default UserJobsCompletedPage;
