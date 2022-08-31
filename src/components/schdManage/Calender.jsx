import React, { Fragment } from "react";

function Calender() {
	return (
		<div className="border flex flex-row p-4 h-full">
			<div className="border basis-1/12 p-2 h-full align-middle flex flex-row items-center">
				<div className="flex-1 text-center">Text</div>
			</div>
			<div className="border grow p-2 h-full">
				<div className="border flex flex-col h-full">
					<div className="flex-1 border flex flex-row">
						<div className="flex-1 border flex p-2 items-center">
							<div className="flex-1 border text-center h-fit text-3xl font-light">
								Sun
							</div>
						</div>
						<div className="flex-1 border"></div>
						<div className="flex-1 border"></div>
						<div className="flex-1 border"></div>
						<div className="flex-1 border"></div>
						<div className="flex-1 border"></div>
						<div className="flex-1 border"></div>
					</div>
					<div className="flex-1 border flex flex-row">
						<div className="flex-1 border flex p-2 items-center">
							<div className="flex-1 border text-center text-3xl font-extralight">
								12
							</div>
							<div className="basis-2/6 border flex flex-col">
								<div className="border text-xs text-center">0</div>
								<div className="border text-xs text-center">0</div>
								<div className="border text-xs text-center">0</div>
							</div>
						</div>
						<div className="flex-1 border"></div>
						<div className="flex-1 border"></div>
						<div className="flex-1 border"></div>
						<div className="flex-1 border"></div>
						<div className="flex-1 border"></div>
						<div className="flex-1 border"></div>
					</div>
					<div className="flex-1 border"></div>
					<div className="flex-1 border"></div>
					<div className="flex-1 border"></div>
					<div className="flex-1 border"></div>
					<div className="flex-1 border"></div>
				</div>
			</div>
			<div className="border basis-1/12 p-2 h-full align-middle flex flex-row items-center">
				<div className="flex-1 text-center">Text</div>
			</div>
		</div>
	);
}

export default Calender;
