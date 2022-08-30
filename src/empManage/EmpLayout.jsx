import { Button, Sidebar } from "flowbite-react";
import React, { Fragment, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { EmpJobPage, EmpLandPage, EmpStatPage } from "./page";

function EmpLayout() {
	const navigate = useNavigate();
	const { auth, setAuth } = useContext(AuthContext);

	return (
		//TODO: Make Side-bar
		<Fragment>
			<div>
				<Button onClick={() => navigate("/employee")}>Landing</Button>
				<Button onClick={() => navigate("/employee/stat")}>Statistics</Button>
				<Button onClick={() => navigate("/employee/job")}>Job</Button>
			</div>

			<Routes>
				<Route path="/" element={<EmpLandPage auth={auth} />}></Route>
				<Route path="/stat" element={<EmpStatPage auth={auth} />}></Route>
				<Route path="/job" element={<EmpJobPage auth={auth} />}></Route>
			</Routes>
		</Fragment>
	);
}

export default EmpLayout;
