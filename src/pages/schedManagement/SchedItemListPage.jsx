import axios from "axios";
import { Spinner } from "flowbite-react";
import React from "react";
import { useContext } from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Fragment } from "react";
import {
	Container,
	ScheduleCompleteModal,
	ScheduleDeleteModal,
	ScheduleEditModal,
	ScheduleItem,
	ScheduleRenewModal,
	ScheduleSearch,
} from "../../components";
import { ScheduleUpdateContext } from "../../context";
import { useInfiniteScroll } from "../../hooks";

const SCHEDULE_SEARCH_URL = process.env.REACT_APP_SCHEDULE_SEARCH_API_URL;

function SchedItemListPage() {
	const [pgNum, setPgNum] = useState(1);
	const [searchSortParams, setSearchSortParams] = useState({});
	const { isUpdated, setIsUpdated } = useContext(ScheduleUpdateContext);
	const [isDataUpdated, setIsDataUpdated] = useState(false);

	//For modal toggling.
	const [isEditMdlActive, setIsEditMdlActive] = useState(false);
	const [isDeleteMdlActive, setIsDeleteMdlActive] = useState(false);
	const [isRenewMdlActive, setIsRenewMdlActive] = useState(false);
	const [isCompleteMdlActive, setIsCompleteMdlActive] = useState(false);
	const [focusScheduleDetails, setFocusScheduleDetails] = useState({});

	const pgSize = 10;

	const { dataList, hasMore, isLoading, isError } = useInfiniteScroll(
		SCHEDULE_SEARCH_URL,
		searchSortParams,
		pgNum,
		setPgNum,
		pgSize,
		isUpdated,
		setIsUpdated
	);
	const observer = useRef();
	const lastScheduleRef = useCallback(
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

	function handleSearch(s) {
		setSearchSortParams({ ...s, isUpdated });
	}

	return (
		<Fragment>
			<div className="flex flex-col gap-2 h-full w-full">
				<Container className="grow flex h-full w-full">
					<div className="flex w-full h-full gap-2 flex-row">
						<Container
							title="Search Options"
							className="flex-grow rounded-md justify-center p-3 w-2/6"
						>
							<ScheduleSearch handleSearch={handleSearch} />
						</Container>
						<div
							className="flex-grow h-full flex flex-col border p-2 gap-2 rounded-md overflow-y-scroll w-3/4"
						>
							{dataList.map((s, i) =>
								dataList.length - 1 === i ? (
									<ScheduleItem
										key={i}
										scheduleDetails={s}
										setFocus={setFocusScheduleDetails}
										setIsCompleteMdlActive={setIsCompleteMdlActive}
										setIsDeleteMdlActive={setIsDeleteMdlActive}
										setIsRenewMdlActive={setIsRenewMdlActive}
										setIsEditMdlActive={setIsEditMdlActive}
										itemRef={lastScheduleRef}
									/>
								) : (
									<ScheduleItem
										key={i}
										scheduleDetails={s}
										setFocus={setFocusScheduleDetails}
										setIsCompleteMdlActive={setIsCompleteMdlActive}
										setIsDeleteMdlActive={setIsDeleteMdlActive}
										setIsRenewMdlActive={setIsRenewMdlActive}
										setIsEditMdlActive={setIsEditMdlActive}
									/>
								)
							)}
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
						</div>
					</div>
				</Container>
			</div>
			<ScheduleCompleteModal
				isActive={isCompleteMdlActive}
				setIsActive={setIsCompleteMdlActive}
				scheduleDetails={focusScheduleDetails}
			/>
			<ScheduleDeleteModal
				isActive={isDeleteMdlActive}
				setIsActive={setIsDeleteMdlActive}
				scheduleDetails={focusScheduleDetails}
			/>
			<ScheduleEditModal
				isActive={isEditMdlActive}
				setIsActive={setIsEditMdlActive}
				scheduleDetails={focusScheduleDetails}
			/>
			<ScheduleRenewModal
				isActive={isRenewMdlActive}
				setIsActive={setIsRenewMdlActive}
				scheduleDetails={focusScheduleDetails}
			/>
		</Fragment>
	);
}

export default SchedItemListPage;
