import { Button, Rating } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const FRONTEND_JOB_PAGE_URL = "/profile/job";

function UserJobItem({ itemRef }) {
	const navigate = useNavigate();
	const jobDetails = {
		jobId: "ab341czv345asd4f34532",
		services: [],
		createdAt: "2022-12-05",
		lastUpdatedAt: "65:09",
		date: "2022-10-20",
		crewList: ["", ""],
		invoice: { amount: "12345" },
		startTime: "12:04",
		endTime: "14:30",
	};
	return (
		<Fragment>
			<div
				className="border shadow-lg rounded-md py-2 px-4 flex w-full flex-col gap-2 h-fit transition-all bg-white border-gray-50 hover:bg-blue-50 hover:border-blue-100"
				ref={itemRef}
			>
				<div className="items-center flex flex-row justify-between">
					<div className="w-4/12 font-medium text-gray-800 text-sm">
						#{jobDetails.jobId}
					</div>
					<div className="w-2/12 font-medium text-gray-500 text-sm text-center">
						{jobDetails.date}
					</div>
					<div className="w-4/12 font-medium text-gray-500 text-sm justify-center flex flex-row gap-2">
						<span>{jobDetails.startTime?.toString().slice(0, 5)}</span>
						<span>to</span>
						<span>{jobDetails.endTime?.toString().slice(0, 5)}</span>
					</div>
					<div className="w-2/12 font-medium text-gray-500 text-sm">
						<Rating>
							<Rating.Star filled={jobDetails.review != undefined} />
							<p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
								{jobDetails.review != undefined ? jobDetails.review.rating : 0}
							</p>
						</Rating>
					</div>
					<div
						onClick={() =>
							navigate(FRONTEND_JOB_PAGE_URL + "?id=" + jobDetails.jobId)
						}
						className="w-2/12 transition-all text-center font-medium text-sm underline hover:cursor-pointer hover:text-blue-600 active:text-blue-700 hover:bg-blue-100 active:bg-blue-200 rounded"
					>
						Info
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default UserJobItem;
