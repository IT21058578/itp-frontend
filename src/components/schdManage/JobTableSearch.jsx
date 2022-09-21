import {
	Button,
	Checkbox,
	Label,
	Select,
	TextInput,
	ToggleSwitch,
} from "flowbite-react";
import React from "react";
import { useState } from "react";

class SearchParams {}

function JobTableSearch() {
	const [isTimeActive, setIsTimeActive] = useState(false);
	const [isDateActive, setIsDateActive] = useState(false);
	const [isRatingActive, setIsRatingActive] = useState(false);
	const [searchParams, setSearchParams] = useState({});

	return (
		<div className="flex flex-col justify-center" style={{ height: "70vh" }}>
			<div
				className="pr-4"
				style={{
					height: "90%",
					width: "100%",
				}}
			>
				<div className="flex gap-2 flex-col py-2  border-t">
					<div>
						<Select sizing="sm">
							<option>Job Id</option>
							<option>Client Id</option>
						</Select>
					</div>
					<div>
						<TextInput
							type="text"
							sizing="sm"
							placeholder="Search string here..."
						/>
					</div>
				</div>
				<div className="flex gap-2 flex-col py-2 border-t">
					<ToggleSwitch label="Date search" />
					<div className="flex items-center">
						<div className="flex-1 text-center">
							<Label value="Type" />
						</div>
						<div className="flex-1">
							<Select sizing="sm"></Select>
						</div>
					</div>
					<div className="flex flex-row px-4 gap-4 items-center">
						<div className="flex-1 flex flex-row items-center gap-2">
							<div>
								<TextInput type="date" sizing="sm" />
							</div>
						</div>
						<div>
							<Label value="To" />
						</div>
						<div className="flex-1 flex flex-row items-center gap-2">
							<div>
								<TextInput type="date" sizing="sm" />
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-2 flex-col py-2 border-t">
					<ToggleSwitch label="Time search" />
					<div className="flex items-center">
						<div className="flex-1 text-center">
							<Label value="Type" />
						</div>
						<div className="flex-1">
							<Select sizing="sm"></Select>
						</div>
					</div>
					<div className="flex flex-row px-4 gap-4">
						<div className="flex-1 flex flex-row items-center gap-2">
							<div>
								<Label value="Start" />
							</div>
							<div>
								<TextInput type="time" sizing="sm" />
							</div>
						</div>
						<div className="flex-1 flex flex-row items-center gap-2">
							<div>
								<Label value="End" />
							</div>
							<div>
								<TextInput type="time" sizing="sm" />
							</div>
						</div>
					</div>
				</div>
				<div className="flex gap-2 flex-col py-2 border-t">
					<ToggleSwitch label="Rating search" />
					<div className="flex items-center">
						<div className="flex-1 text-center">
							<Label value="Type" />
						</div>
						<div className="flex-1">
							<Select sizing="sm"></Select>
						</div>
					</div>
					<div className="flex flex-row px-4 gap-4">
						<div className="flex-1 flex flex-row items-center gap-2">
							<div>
								<Label value="Start" />
							</div>
							<div>
								<TextInput type="number" sizing="sm" />
							</div>
						</div>
						<div className="flex-1 flex flex-row items-center gap-2">
							<div>
								<Label value="End" />
							</div>
							<div>
								<TextInput type="numbr" sizing="sm" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex gap-2 flex-col py-2 border-t">
				<Button size="sm" style={{ width: "100%" }}>
					Search
				</Button>
			</div>
		</div>
	);
}

export default JobTableSearch;
