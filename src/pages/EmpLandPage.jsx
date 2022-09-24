import React, { Fragment } from "react";
import { Container } from "../components";

/* Employee Landing Page. This page will show the stats and etc for an
   employee. Its the first page they see when they login. The employee
   details will be extracte from the context API then a get request will be
   made for further details which will be shown. */
function EmpLandPage({ auth }) {
	return (
		<Fragment>
			<div className="grid grid-rows-6 gap-2 mb-4 h-full mx-auto">
				<Container className="grid grid-flow-col auto-cols-max content-center ">
					<div className="ml-3 text-5xl font-extralight">Hey Tharindu!</div>
					<div className="italic ml-3 text-2xl font-extralight mt-auto">
						Good luck!
					</div>
				</Container>
				<div className="row-span-6 grid grid-cols-2 gap-2 ">
					<Container title="Current Job"></Container>
					<div className="grid grid-rows-2 gap-2 ">
						<Container title="Recent Jobs"></Container>
						<Container title="Assignment Details"></Container>
					</div>
				</div>
			</div>
			{/* <div className="border p-2 h-full border-gray-300 bg-white"></div> */}
		</Fragment>
	);
}

export default EmpLandPage;
