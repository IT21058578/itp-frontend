import { Button, Sidebar } from "flowbite-react";
import React, { Fragment } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { SchedCalenderPage, SchedStatPage, SchedListPage } from "./page";

function AdmSchedLayout() {
	const navigate = useNavigate();
	const { auth, setAuth } = useContext(AuthContext);

	return (
		//TODO: Make top-bar for scheduling navigation.
		//TODO: Make admin side-bar.
		<Fragment>
			<div>
				<Button onClick={() => navigate("/admin/schedule")}>Schedules</Button>
				<Button onClick={() => navigate("/admin/schedule/stat")}>
					Schedule Stat
				</Button>
				<Button onClick={() => navigate("/admin/schedule/list")}>
					Schedule List
				</Button>
			</div>

			<Routes>
				<Route path="/" element={<SchedCalenderPage auth={auth} />}></Route>
				<Route path="/stat" element={<SchedStatPage auth={auth} />}></Route>
				<Route path="/list" element={<SchedListPage auth={auth} />}></Route>
			</Routes>
		</Fragment>
	);
}

export default AdmSchedLayout;
