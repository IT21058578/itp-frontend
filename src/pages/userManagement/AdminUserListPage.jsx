import { Container } from '../../components';
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { UserTable, UserTableSearch } from "../../components";
import { useInfiniteScroll } from '../../hooks';

const USER_SEARCH_URL = process.env.REACT_APP_USER_SEARCH_API_URL;

function AdminUserRolesPage() {
	const [pgNum, setPgNum] = useState(1);
	const [searchParams, setSearchParams] = useState({});
	const [searchSortParams, setSearchSortParams] = useState({});
	const [sortDir, setSortDir] = useState("");
	const [sortCol, setSortCol] = useState("");
	const pgSize = 20;

	useEffect(() => {
		setSearchSortParams({ ...searchParams, sortDir, sortCol });
		setPgNum(1);
	}, [JSON.stringify(searchParams), sortDir, sortCol]);

 	function handleSearch(s) {
		setSearchParams(s);
  	}

	const { dataList, hasMore, isLoading, isError } = useInfiniteScroll(
		USER_SEARCH_URL,
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
		<Container>
			<div className="flex flex-row text-2xl pb-2 border-b items-center justify-between">
				<span className="flex flex-row items-center gap-4">
					<span className="py-1 px-4">
						Users
					</span>
				</span>
			</div>
		</Container>
		<div className="flex w-full h-full gap-2">
			<Container
				title="Search Options"
				className="flex-grow rounded-md justify-center p-3 w-2/6"
			>
				<UserTableSearch handleSearch={handleSearch}/>
			</Container>
			<Container className="w-4/6">
				<div
					className="flex-grow flex border rounded-md overflow-y-scroll h-full"
					style={{height: "70vh"}}
				>
					{/* <JobTable
						handleSortChange={handleSortChange}
						sortCol={sortCol}
						sortDir={sortDir}
						jobList={dataList}
						lastTableRowRef={lastTableRowRef}
						isLoading={isLoading}
						hasMore={hasMore}
					/> */}
					<UserTable 
					handleSortChange={handleSortChange}
					dataList={dataList}
					sortDir={sortDir}
					sortCol={sortCol}
					lastTableRowRef={lastTableRowRef}
					hasMore={hasMore}
					isLoading={isLoading}
					/>
				</div>
			</Container>
		</div>
	</div>
    </Fragment>
  )
}

export default AdminUserRolesPage