import { Dropdown, Select, Label, TextInput, Button } from "flowbite-react";
import React from "react";
import { Fragment, useState } from "react";
import { Container } from "../components";

// This page will have a searchable and sortable list of all schedules. The
// entries of the table shown will link directly to a the main job page where
// further information can be seen in detail.
function SchedListPage({ auth }) {
	const [startDay, setStartDay] = useState(0);
	const [endDay, setEndDay] = useState(0);
	const [searchStr, setSearchStr] = useState("");
	const [searchType, setSearchType] = useState("");

	return (
		<Fragment>
			<div className="flex flex-col gap-2">
				<Container>
					<div className="flex flex-row gap-2">
						<div className="flex-1 flex flex-row gap-4 border-r">
							<div className="flex-1 flex flex-row items-center gap-3">
								<div className="block text-center">
									<Label value="Start Day" />
								</div>
								<div className="basis-4/6">
									<Select>
										<option>Start Day</option>
									</Select>
								</div>
							</div>
							<div className="flex-1 flex flex-row items-center gap-3">
								<div className="block text-center">
									<Label value="End Day" />
								</div>
								<div className="basis-4/6">
									<Select>
										<option>End Day</option>
									</Select>
								</div>
							</div>
						</div>
						<div className="flex-1 flex flex-row gap-2">
							<div className="flex-1 flex flex-row items-center gap-3">
								<div className="basis-1/6">
									<Select>
										<option>Email</option>
										<option>Id</option>
										<option>Name</option>
										<option>Job Title</option>
									</Select>
								</div>
								<div className="flex-1">
									<TextInput placeholder="Type your search here..." />
								</div>
								<div>
									<Button>Search</Button>
								</div>
							</div>
						</div>
					</div>
				</Container>
				<Container className="grow">Table</Container>
			</div>
		</Fragment>
	);
}

export default SchedListPage;
