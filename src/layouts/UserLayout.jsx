import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { CustomerFooter, CustomerNavbar } from "../components";
import {
	ErrorPage,
	ForgotPasswordPage,
	LoginPage,
	RegisterAuthenticationPage,
	RegisterPage,
	RegisterSuccessPage,
} from "../pages";
import ResetPasswordPage from "../pages/loginRegister/ResetPasswordPage";

function UserLayout() {
	return (
		<div className="min-h-screen flex flex-col">
			<CustomerNavbar />
			<div className="flex flex-row flex-grow justify-between">
				<div className="flex border-r bg-gray-100 w-1/12"></div>
				<Routes>
					{/*Place user routes here. Should appear in proper alloted space. ERROR ROUTE MUST BE AT END*/}
					<Route path="" element={""} />
					<Route
						path="auth/register/success"
						element={<RegisterSuccessPage />}
					/>
					<Route
						path="auth/register/authorize"
						element={<RegisterAuthenticationPage />}
					/>
					<Route path="auth/login" element={<LoginPage />} />
					<Route path="auth/forgotpassword" element={<ForgotPasswordPage />} />
					<Route path="auth/resetpassword" element={<ResetPasswordPage />} />
					<Route path="auth/register" element={<RegisterPage />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
				<div className="bg-gray-100 w-1/12 border-l"></div>
			</div>
			<CustomerFooter />
		</div>
	);
}

export default UserLayout;
