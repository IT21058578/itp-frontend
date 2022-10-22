import axios from "axios";
import React from "react";
import { useCallback } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { Fragment, useState, useEffect } from "react";
import { Container, JobTable, JobTableSearch } from "../../components";
import { useInfiniteScroll } from "../../hooks";

// This page will have a searchable and sortable list of all schedules. The
// entries of the table shown will link directly to a the main job page where
// further information can be seen in detail.

const JOB_URL = process.env.REACT_APP_JOB_API_URL;
const JOB_SEARCH_URL = process.env.REACT_APP_JOB_SEARCH_API_URL;

function SchedJobListPage() {
	const [searchParams, setSearchParams] = useState({});
	const [searchSortParams, setSearchSortParams] = useState({}); //The params passed into the infinite scroll must be a sate variable.
	const [sortDir, setSortDir] = useState("");
	const [sortCol, setSortCol] = useState("");
	const [pgNum, setPgNum] = useState(1);
	const pgSize = 20;

	useEffect(() => {
		setSearchSortParams({ ...searchParams, sortDir, sortCol });
		setPgNum(1);
	}, [JSON.stringify(searchParams), sortDir, sortCol]);

	const { dataList, hasMore, isLoading, isError } = useInfiniteScroll(
		JOB_SEARCH_URL,
		searchSortParams,
		pgNum,
		setPgNum,
		pgSize,
		false
	);

	const observer = useRef();
	const lastTableRowRef = useCallback(
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
		setSearchParams(s);
	}

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
		<Fragment>
			<div className="flex flex-col gap-2 h-full w-full">
				<div className="flex w-full h-full gap-2">
					<Container
						title="Search Options"
						className="flex-grow rounded-md justify-center p-3 w-2/6"
					>
						<JobTableSearch handleSearch={handleSearch} />
					</Container>
					<Container className="w-4/6">
						<div
							className="flex-grow flex border rounded-md overflow-y-scroll h-full"
							style={{height: "93.25vh"}}
						>
							<JobTable
								handleSortChange={handleSortChange}
								sortCol={sortCol}
								sortDir={sortDir}
								jobList={dataList}
								lastTableRowRef={lastTableRowRef}
								isLoading={isLoading}
								hasMore={hasMore}
							/>
						</div>
					</Container>
				</div>
			</div>
		</Fragment>
	);
}

export default SchedJobListPage;
