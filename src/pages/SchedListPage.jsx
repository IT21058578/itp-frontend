import axios from "axios";
import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Container, JobTable, JobTableSearch } from "../components";

// This page will have a searchable and sortable list of all schedules. The
// entries of the table shown will link directly to a the main job page where
// further information can be seen in detail.

const JOB_URL = process.env.REACT_APP_JOB_API_URL;

function SchedListPage({ auth }) {
	const [jobList, setJobList] = useState([]);
	const [searchParams, setSearchParams] = useState({});
	const [sortDir, setSortDir] = useState("");
	const [sortCol, setSortCol] = useState("");

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

	useEffect(() => {
		console.log(
			"Making axios get request for job list!",
			searchParams,
			sortCol,
			sortDir
		);
		axios
			.get(JOB_URL, {
				params: {
					pgNum: 0,
					pgSize: 400,
					jobId: searchParams.jobId,
					lengthSelect: searchParams.lengthSelect,
					length: Number(searchParams.length),
					crewSelect: searchParams.crewSelect,
					crew: Number(searchParams.crew),
					revenueSelect: searchParams.revenueSelect,
					revenue: Number(searchParams.revenue),
					ratingSelect: searchParams.ratingSelect,
					rating: Number(searchParams.rating),
					sortCol: sortCol,
					sortDir: sortDir,
				},
			})
			.then((response) => {
				setJobList(response.data.content);
				console.log(response.data.content);
			})
			.catch((err) => console.log(err));
	}, [searchParams, sortCol, sortDir]);

	return (
		<Fragment>
			<div className="flex flex-col gap-2">
				<Container className="grow flex h-full w-full">
					<div className="flex w-full h-full gap-2">
						<Container
							title="Search Options"
							className="flex-grow rounded-md justify-center p-3 w-2/6"
						>
							<JobTableSearch handleSearch={handleSearch} />
						</Container>
						<div
							className="flex-grow flex border p-2 rounded-md w-3/4 overflow-y-scroll"
							style={{ height: "78vh" }}
						>
							<JobTable
								handleSortChange={handleSortChange}
								sortCol={sortCol}
								sortDir={sortDir}
								jobList={jobList}
							/>
						</div>
					</div>
				</Container>
			</div>
		</Fragment>
	);
}

export default SchedListPage;
