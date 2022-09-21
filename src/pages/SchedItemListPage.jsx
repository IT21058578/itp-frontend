import React from "react";
import { Fragment } from "react";
import { Container, ScheduleItem } from "../components";

function SchedItemListPage() {
	return (
		<Fragment>
			<div className="flex flex-col gap-2">
				<Container className="grow flex h-full w-full">
					<div className="flex w-full h-full gap-2 flex-row">
						<Container
							title="Search Options"
							className="flex-grow rounded-md justify-center p-3 w-1/6"
						></Container>
						<div className="flex-grow flex border p-2 rounded-md">
							<ScheduleItem />
						</div>
					</div>
				</Container>
			</div>
		</Fragment>
	);
}

export default SchedItemListPage;
