import React from "react";
import { useState } from "react";
import { Button, Label, Select, TextInput } from "flowbite-react";
import ButtonGroup from "flowbite-react/lib/esm/components/Button/ButtonGroup";

function ScheduleSearch({ handleSearch }) {
	const [searchSelect, setSearchSelect] = useState("");
	const [searchString, setSearchString] = useState("");
	const [searchStringErr, setSearchStringErr] = useState(false);

	const [dateSelect, setDateSelect] = useState("");
	const [date, setDate] = useState("2022-12-05");
	const [dateErr, setDateErr] = useState(false);

	const [startTimeSelect, setStartTimeSelect] = useState("");
	const [startTime, setStartTime] = useState("00:00");
	const [startTimeErr, setStartTimeErr] = useState(false);

	const [endTimeSelect, setEndTimeSelect] = useState("");
	const [endTime, setEndTime] = useState("00:00");
	const [endTimeErr, setEndTimeErr] = useState(false);

	const [showSelect, setShowSelect] = useState("both");
	const [sortCol, setSortCol] = useState("date");
	const [sortDir, setSortDir] = useState("desc");

	function handleSubmit() {
		//TODO: Make validation.
		let hasAnyErr = false;

		if (!hasAnyErr) {
			handleSearch({
				searchSelect,
				searchString,
				dateSelect,
				date,
				startTimeSelect,
				startTime,
				endTimeSelect,
				endTime,
				showSelect,
				sortCol,
				sortDir,
			});
		}
	}

	return (
		<div className="flex flex-col justify-center" style={{ height: "70vh" }}>
			<div
				className="pr-4 flex flex-col gap-1"
				style={{
					height: "90%",
					width: "100%",
				}}
			>
				<div className="flex gap-2 flex-col py-2 border-t">
					<Select
						sizing="sm"
						value={showSelect}
						onChange={(e) => setShowSelect(e.target.value)}
					>
						<option value="">Show both Active and Inactive</option>
						<option value="active">Show only Active</option>
						<option value="inActive">Show only Inactive</option>
					</Select>
				</div>
				<div className="flex gap-2 flex-col py-2 border-t">
					<div className="text-xs mb-0.5">Sort by Field and Direction</div>
					<div className="flex flex-1 gap-2">
						<div className="flex items-center w-1/4 justify-center">
							<Label className="" value="Sort By" />
						</div>
						<div className="flex flex-1 gap-2">
							<div className="w-1/2 flex-1">
								<Select
									sizing="sm"
									value={sortCol}
									onChange={(e) => setSortCol(e.target.value)}
								>
									<option value="date">Date</option>
									<option value="startTime">Start Time</option>
									<option value="endTime">End Time</option>
									<option value="title">Title</option>
									<option value="description">Description</option>
								</Select>
							</div>
							<div className="w-1/2 flex-1">
								<Select
									sizing="sm"
									value={sortDir}
									onChange={(e) => setSortDir(e.target.value)}
								>
									<option value="desc">Descending</option>
									<option value="asc">Ascending</option>
								</Select>
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-2 flex-col py-2 border-t">
					<div className="text-xs mb-0.5">Search by Text</div>
					<div className="flex flex-1 gap-2">
						<div className="w-1/4 items-center">
							<Select
								sizing="sm"
								value={searchSelect}
								onChange={(e) => setSearchSelect(e.target.value)}
							>
								<option value="">Ignore</option>
								<option value="title">Title</option>
								<option value="desc">Description</option>
								<option value="both">Both</option>
							</Select>
						</div>
						<div className="w-3/4 flex-1">
							<TextInput
								type="text"
								sizing="sm"
								placeholder="Type search here..."
								value={searchString}
								onChange={(e) => setSearchString(e.target.value)}
								disabled={searchSelect === "" ? true : false}
								color={searchStringErr === true ? "failure" : "gray"}
							/>
						</div>
					</div>
				</div>
				<div className="flex gap-1 flex-col py-2 border-t">
					<div className="text-xs mb-0.5">Search by Date</div>
					<div className="flex flex-row gap-4 items-center">
						<div className="flex flex-row w-2/4">
							<div className="w-1/4 flex items-center">
								<Label className="" value="Type" />
							</div>
							<div className="w-3/4">
								<Select
									sizing="sm"
									value={dateSelect}
									onChange={(e) => setDateSelect(e.target.value)}
								>
									<option value="">Ignore</option>
									<option value="before">Before</option>
									<option value="after">After</option>
									<option value="on">On</option>
								</Select>
							</div>
						</div>
						<div className="w-2/4 flex flex-col gap-2 border-l pl-4">
							<div className="flex flex-row gap-2">
								<div className="w-2/6 flex items-center">
									<Label className="" value="Date" />
								</div>
								<div className="w-3/4">
									<TextInput
										type="date"
										sizing="sm"
										value={date}
										onChange={(e) => setDate(e.target.value)}
										disabled={dateSelect === "" ? true : false}
										color={dateErr === true ? "failure" : "gray"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-1 flex-col py-2 border-t">
					<div className="text-xs mb-0.5">Search by Start Time</div>
					<div className="flex flex-row gap-4 items-center">
						<div className="flex flex-row w-2/4">
							<div className="w-1/4 flex items-center">
								<Label className="" value="Type" />
							</div>
							<div className="w-3/4">
								<Select
									sizing="sm"
									value={startTimeSelect}
									onChange={(e) => setStartTimeSelect(e.target.value)}
								>
									<option value="">Ignore</option>
									<option value="before">Before</option>
									<option value="after">After</option>
									<option value="on">At</option>
								</Select>
							</div>
						</div>
						<div className="w-2/4 flex flex-col gap-2 border-l pl-4">
							<div className="flex flex-row gap-2">
								<div className="w-2/6 flex items-center">
									<Label className="" value="Start Time" />
								</div>
								<div className="w-3/4">
									<TextInput
										type="time"
										sizing="sm"
										value={startTime}
										onChange={(e) => setStartTime(e.target.value)}
										disabled={startTimeSelect === "" ? true : false}
										color={startTimeErr === true ? "failure" : "gray"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-1 flex-col py-2 border-t">
					<div className="text-xs mb-0.5">Search by End Time</div>
					<div className="flex flex-row gap-4 items-center">
						<div className="flex flex-row w-2/4">
							<div className="w-1/4 flex items-center">
								<Label className="" value="Type" />
							</div>
							<div className="w-3/4">
								<Select
									sizing="sm"
									value={endTimeSelect}
									onChange={(e) => setEndTimeSelect(e.target.value)}
								>
									<option value="">Ignore</option>
									<option value="before">Before</option>
									<option value="after">After</option>
									<option value="on">At</option>
								</Select>
							</div>
						</div>
						<div className="w-2/4 flex flex-col gap-2 border-l pl-4">
							<div className="flex flex-row gap-2">
								<div className="w-2/6 flex items-center">
									<Label className="" value="End Time" />
								</div>
								<div className="w-3/4">
									<TextInput
										type="time"
										sizing="sm"
										value={endTime}
										onChange={(e) => setEndTime(e.target.value)}
										disabled={endTimeSelect === "" ? true : false}
										color={endTimeErr === true ? "failure" : "gray"}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex gap-2 flex-col py-2 border-t">
				<Button size="sm" style={{ width: "100%" }} onClick={handleSubmit}>
					Search
				</Button>
			</div>
		</div>
	);
}

export default ScheduleSearch;
