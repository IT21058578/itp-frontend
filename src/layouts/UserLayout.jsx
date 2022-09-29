import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { CustomerFooter, CustomerNavBar } from "../components";
import TestNavbar from "../components/TestNavbar";
import {
	ErrorPage,
	ForgotPasswordPage,
	RegisterAuthenticationPage,
	RegisterPage,
	RegisterSuccessPage,
} from "../pages";

function UserLayout() {
	return (
		<div className="min-h-screen flex flex-col">
			<TestNavbar />
			<div className="flex flex-row flex-grow justify-between">
				<div className="flex border-r bg-gray-100 w-1/12"></div>
				<Routes>
					{/*Place user routes here. Should appear in proper alloted space. ERROR ROUTE MUST BE AT END*/}
					<Route path="" element={""} />
					<Route path="register/forgot" element={<ForgotPasswordPage />} />
					<Route path="register/success" element={<RegisterSuccessPage />} />
					<Route
						path="register/auth"
						element={<RegisterAuthenticationPage />}
					/>
					<Route path="register/" element={<RegisterPage />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
				<div className="bg-gray-100 w-1/12 border-l"></div>
			</div>
			<CustomerFooter />
		</div>
	);
}

export default UserLayout;
