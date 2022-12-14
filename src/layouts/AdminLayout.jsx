import React, { useContext, useEffect } from "react";
import { AdminSidebar } from "../components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SchedCalenderPage, SchedItemListPage, SchedJobListPage, AdminJobPage, AdminUserListPage, AdminUserPage } from "../pages";
import { Fragment } from "react";
import { AuthContext } from "../context";
//import AdminSchedLayout from "./AdminSchedLayout";
import AdminCatogrizedServicesHook from "../components/ServiceCreation/AdminCategorizedServices";
import AdminPanel from "../pages/ServiceCreation/Admin/AdminPanel";
import ServiceUpdate from "../pages/ServiceCreation/Admin/ServiceUpdate";
import ServiceCreate from "../pages/ServiceCreation/Admin/ServiceCreate";
import RequestedServices from '../pages/ServiceCreation/Admin/RequestedServices';
import StockManagementPage from "../pages/stockManagement";
import SupplierManagementPage from "../pages/supplierManagement";

import DialogsAdd from "../pages/supplier/addStock";
import DialogsAddStock from "../pages/stock/addStock";

import { ReactSession } from "react-client-session";

function AdminLayout() {
	const navigate = useNavigate();
	const { auth } = useContext(AuthContext);

	//Redirect clients if they try to access.
	useEffect(() => {
		async function validatePermissions() {
			let permissions;
			permissions = await ReactSession.get("permissions");
			if (permissions) {
				if (permissions.includes('USER')) {
					navigate("/error");
				}
			} else {
				navigate("/error");
			}
		}
		// validatePermissions();
	}, [])

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
							element={<SchedJobListPage />}
						></Route>
						<Route
							path="jobs/job"
							element={<AdminJobPage />}
						></Route>
						<Route
							path="calender/*"
							element={<SchedCalenderPage />}
						></Route>
						<Route
							path="schedule/*"
							element={<SchedItemListPage />}
						></Route>
						<Route 
							path="users/*"
							element={<AdminUserListPage />}
						></Route>
						<Route 
							path="users/user"
							element={<AdminUserPage />}
						></Route>
						
						{/*Fix these routes*/}
						<Route
							path="/SCAdmin"
							element={<AdminPanel/>}
						></Route>
						<Route
							path="add-supplier"
							element={<DialogsAdd auth={auth} />}
						></Route>
						<Route
							path="add-stock"
							element={<DialogsAddStock auth={auth} />}
						></Route>
						<Route
							path="stock/*"
							element={<StockManagementPage auth={auth} />}
						></Route>
						<Route
							path="supplier/*"
							element={<SupplierManagementPage auth={auth} />}
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
