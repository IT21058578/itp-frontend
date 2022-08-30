import { Button, Sidebar } from "flowbite-react";
import React, { Fragment, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AdmEmpListPage, AdmEmpPage } from "./page";
import AuthContext from "../context/AuthProvider";

function AdmEmpLayout() {
	const navigate = useNavigate();
	const { auth, setAuth } = useContext(AuthContext); //Should get information from auth.

	return (
		//TODO: Make Side-bar
		//TODO: Make Individual Employee Navigation
		<Fragment>
			<div>
				<Button onClick={() => navigate("/admin/employee")}>Admin List</Button>
				<Button onClick={() => navigate("/admin/employee/" + auth.userId)}>
					Admin View of Employee
				</Button>
			</div>

			<Routes>
				<Route path="/" element={<AdmEmpListPage auth={auth} />}></Route>
				<Route path="/:empId" element={<AdmEmpPage auth={auth} />}></Route>
			</Routes>
		</Fragment>
	);
}

export default AdmEmpLayout;
