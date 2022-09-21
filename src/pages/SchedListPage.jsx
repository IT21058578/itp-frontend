import axios from "axios";
import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Container, JobTable, JobTableSearch } from "../components";
import { useNavigate } from "react-router-dom";

const GET_JOB_LIST_URL = "#"; //process.env.REACT_APP_BACKEND_URL + "jobs";

// This page will have a searchable and sortable list of all schedules. The
// entries of the table shown will link directly to a the main job page where
// further information can be seen in detail.
function SchedListPage({ auth }) {
	const navigate = useNavigate();
	const [startDay, setStartDay] = useState(0);
	const [endDay, setEndDay] = useState(0);
	const [searchStr, setSearchStr] = useState("");
	const [searchType, setSearchType] = useState("");
	const [jobList, setJobList] = useState([]);
	const [sortBy, setSortBy] = useState({ sortCol: "jobId", isUp: true }); // {sortCol, dir}

	useEffect(() => {
		axios
			.get(GET_JOB_LIST_URL, {
				params: {},
				headers: {},
			})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
		console.log(jobList);
	}, []);

	return (
		<Fragment>
			<div className="flex flex-col gap-2">
				<Container className="grow flex h-full w-full">
					<div className="flex w-full h-full gap-2">
						<Container
							title="Search Options"
							className="flex-grow rounded-md justify-center p-3 w-1/6"
						>
							<JobTableSearch />
						</Container>
						<div className="flex-grow flex border p-2 rounded-md">
							<JobTable />
						</div>
					</div>
				</Container>
			</div>
		</Fragment>
	);
}

export default SchedListPage;
