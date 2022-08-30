import { Button, Sidebar } from "flowbite-react";
import React, { Fragment } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { EmpJobPage, EmpLandPage, EmpStatPage } from "./page";

function EmpLayout() {
	const navigate = useNavigate();

	return (
		//TODO: Make Side-bar
		<Fragment>
			<div>
				<Button onClick={() => navigate("/employee")}>Landing</Button>
				<Button onClick={() => navigate("/employee/stat")}>Statistics</Button>
				<Button onClick={() => navigate("/employee/job")}>Job</Button>
			</div>

			<Routes>
				<Route path="/" element={<EmpLandPage />}></Route>
				<Route path="/stat" element={<EmpStatPage />}></Route>
				<Route path="/job" element={<EmpJobPage />}></Route>
			</Routes>
		</Fragment>
	);
}

export default EmpLayout;
