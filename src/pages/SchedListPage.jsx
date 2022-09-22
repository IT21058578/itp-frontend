import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Container, JobTable, JobTableSearch } from "../components";

// This page will have a searchable and sortable list of all schedules. The
// entries of the table shown will link directly to a the main job page where
// further information can be seen in detail.

class SearchSortParams {
	constructor(
		jobId,
		lengthSelect,
		length,
		crewSelect,
		crew,
		revenueSelect,
		revenue,
		ratingSelect,
		rating,
		sortCol,
		sortDir
	) {
		this.jobId = jobId;
		this.lengthSelect = lengthSelect;
		this.length = length;
		this.crewSelect = crewSelect;
		this.crew = crew;
		this.revenueSelect = revenueSelect;
		this.revenue = revenue;
		this.ratingSelect = ratingSelect;
		this.rating = rating;
		this.sortCol = sortCol;
		this.sortDir = sortDir;
	}
}

function SchedListPage({ auth }) {
	const [jobList] = useState([]);
	const [searchSortParams, setSearchSortParams] = useState({});
	const [sortDir, setSortDir] = useState("");
	const [sortCol, setSortCol] = useState("");

	function handleSearch(s) {
		setSearchSortParams(
			new SearchSortParams(
				s.jobId,
				s.lengthSelect,
				s.length,
				s.crewSelect,
				s.crew,
				s.revenueSelect,
				s.revenue,
				s.ratingSelect,
				s.rating,
				s.sortCol,
				s.sortDir,
				sortCol,
				sortDir
			)
		);
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
			searchSortParams,
			sortCol,
			sortDir
		);
	}, [searchSortParams, sortCol, sortDir]);

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
						<div className="flex-grow flex border p-2 rounded-md w-3/4">
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
