import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { CustomerFooter, CustomerNavBar } from "../components";
import { RegisterPage } from "../pages";

function UserLayout() {
	return (
		<div className="min-h-screen border flex flex-col border-red-500">
			<CustomerNavBar />
			<div className="flex flex-row flex-grow justify-between">
				<div className="flex border-r bg-gray-100 w-1/12"></div>
				<Routes>
					{/*Place user routes here. Should appear in proper alloted space.*/}
					<Route path="" element={""} />
					<Route path="register" element={<RegisterPage />} />
				</Routes>
				<div className="bg-gray-100 w-1/12 border-l"></div>
			</div>
			<CustomerFooter />
		</div>
	);
}

export default UserLayout;
