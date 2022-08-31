import React, { Fragment, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { EmpSidebar } from "./components";
import { EmpJobPage, EmpLandPage, EmpStatPage } from "./page";

function EmpLayout() {
	const { auth } = useContext(AuthContext);

	return (
		<Fragment>
			<div className="flex">
				<div>
					<EmpSidebar />
				</div>
				<div className="bg-gray-100 p-2 w-full">
					<Routes>
						<Route path="/" element={<EmpLandPage auth={auth} />}></Route>
						<Route path="/stat" element={<EmpStatPage auth={auth} />}></Route>
						<Route path="/jobs" element={<EmpJobPage auth={auth} />}></Route>
					</Routes>
				</div>
			</div>
		</Fragment>
	);
}

export default EmpLayout;
