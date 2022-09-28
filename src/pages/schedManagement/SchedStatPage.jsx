import React from "react";
import { Fragment } from "react";
import { Container } from "../../components";

// SchedStatPage. This page will contain methods to get statistical
// information about certain days to help admins gain indepth data about jobs
// over some period of time.
function SchedStatPage({ auth }) {
	return (
		<Fragment>
			<div className="flex flex-col gap-2">
				<Container>Detailed Data Picker</Container>
				<Container className="grow">Stats</Container>
			</div>
		</Fragment>
	);
}

export default SchedStatPage;
