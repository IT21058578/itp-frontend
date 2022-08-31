import React, { useContext } from "react";
import { AdminSidebar } from "../components";
import { Route, Routes } from "react-router-dom";
import { SchedCalenderPage, AdmEmpPage } from "../pages";
import { Fragment } from "react";
import { AuthContext } from "../context";
import AdminSchedLayout from "./AdminSchedLayout";

function AdminLayout() {
	const { auth } = useContext(AuthContext);

	return (
		<Fragment>
			<div className="flex">
				<div>
					<AdminSidebar />
				</div>
				<div className="bg-gray-100 p-2 w-full">
					<Routes>
						<Route
							path="jobs/*"
							element={<AdminSchedLayout auth={auth} />}
						></Route>
						<Route
							path="employees/*"
							element={<AdmEmpPage auth={auth} />}
						></Route>
					</Routes>
				</div>
			</div>
		</Fragment>
	);
}

export default AdminLayout;
