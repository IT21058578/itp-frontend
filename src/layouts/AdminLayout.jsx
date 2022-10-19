import React, { useContext } from "react";
import { AdminSidebar } from "../components";
import { Route, Routes } from "react-router-dom";
import { AdmEmpPage } from "../pages";
import { Fragment } from "react";
import { AuthContext } from "../context";
import AdminSchedLayout from "./AdminSchedLayout";
import AdminCatogrizedServicesHook from "../hooks/ServiceCreation/AdminCategorizedServices";
import AdminPanel from "../pages/ServiceCreation/Admin/AdminPanel";
import ServiceUpdate from "../pages/ServiceCreation/Admin/ServiceUpdate";
import ServiceCreate from "../pages/ServiceCreation/Admin/ServiceCreate";
import RequestedServices from '../pages/ServiceCreation/Admin/RequestedServices';

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
						<Route
							path="/SCAdmin"
							element={<AdminPanel/>}
						></Route>
        				<Route
							path="/AdminCatogrizedServices/*"
							element={<AdminCatogrizedServicesHook/>}
						></Route>
        				<Route
							path="/serviceUpdate/*"
							element={<ServiceUpdate/>}
						></Route>
        				<Route
							path="/serviceCreate/*"
							element={<ServiceCreate/>}
						></Route>
						<Route
							path="/controlServiceRequest/*"
							element={<RequestedServices/>}
						></Route>
					</Routes>
				</div>
			</div>
		</Fragment>
	);
}

export default AdminLayout;
