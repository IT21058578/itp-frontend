import React, { Fragment, useState } from "react";
import { Calender, Container } from "../../components";

// SchedCalenderPage. This page will hold the main calender that will display
// minimal information for each day. on its interface and when a admin
// decides to hover over the specific day
function SchedCalenderPage() {



	return (
		<Fragment>
			<Container>
				<div className="flex flex-col mr-16 h-full w-full">
					<div className="flex flex-row text-2xl pb-2 border-b items-center justify-between">
						<span className="flex flex-row items-center gap-4">
							<span className="py-1 px-4">
								Calender
							</span>
						</span>
					</div>
					<Calender/>
				</div>
			</Container>
		</Fragment>
	);
}

export default SchedCalenderPage;
