import React, { useContext } from "react";
import { AdminSidebar } from "./empManage/components";
import { Route, Routes } from "react-router-dom";
import { SchedCalenderPage } from "./schedManage/page";
import { Fragment } from "react";
import AuthContext from "./context/AuthProvider";
import { AdmEmpPage } from "./empManage/page";

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
							path="jobs"
							element={<SchedCalenderPage auth={auth} />}
						></Route>
						<Route
							path="employees"
							element={<AdmEmpPage auth={auth} />}
						></Route>
					</Routes>
				</div>
			</div>
		</Fragment>
	);
}

export default AdminLayout;
