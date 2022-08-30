import { Button, Sidebar } from "flowbite-react";
import React, { Fragment } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AdmEmpListPage, AdmEmpPage } from "./page";

function AdmEmpLayout() {
	const navigate = useNavigate();
	const empId = 12345678; //Placeholder empId

	return (
		//TODO: Make Side-bar
		//TODO: Make Individual Employee Navigation
		<Fragment>
			<div>
				<Button onClick={() => navigate("/admin/employee")}>Admin List</Button>
				<Button onClick={() => navigate("/admin/employee/" + empId)}>
					Admin View of Employee
				</Button>
			</div>

			<Routes>
				<Route path="/" element={<AdmEmpListPage />}></Route>
				<Route path="/:empId" element={<AdmEmpPage />}></Route>
			</Routes>
		</Fragment>
	);
}

export default AdmEmpLayout;
