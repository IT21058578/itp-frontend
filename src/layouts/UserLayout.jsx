import React from "react";
import { Route, Routes } from "react-router-dom";
import Categories from "../pages/ServiceCreation/Categories";
import CatogrizedServicesHook from "../hooks/ServiceCreation/CategorizedServices";
import ServiceDeatails from "../pages/ServiceCreation/ServiceDeatials";
import ServiceRequest from "../pages/ServiceCreation/ServiceRequest";
import { CustomerFooter, CustomerNavbar } from "../components";
import {
	ErrorPage,
	ForgotPasswordPage,
	LoginPage,
	RegisterAuthenticationPage,
	RegisterPage,
	RegisterSuccessPage,
	ResetPasswordPage,
} from "../pages";
import UserProfileLayout from "./UserProfileLayout";

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

					{/*Layout for user profile when logged. Conditionally rendered based on auth state. */}
					<Route path="profile/*" element={<UserProfileLayout />} />

					<Route path="auth/login" element={<LoginPage />} />
					<Route path="auth/forgotpassword" element={<ForgotPasswordPage />} />
					<Route path="auth/resetpassword" element={<ResetPasswordPage />} />
					<Route path="auth/register" element={<RegisterPage />} />
					<Route path="*" element={<ErrorPage />} />
					<Route path="/categories/*" element={<Categories/>}></Route>
        			<Route path="/CatogrizedServices/*" element={<CatogrizedServicesHook/>}></Route>
        			<Route path="/serviceDeatials/*" element={<ServiceDeatails/>}></Route>
					<Route path="/ServiceRequest/*" element={<ServiceRequest/>}></Route>

				</Routes>
				<div className="bg-gray-100 w-1/12 border-l"></div>
			</div>
			<CustomerFooter />
		</div>
	);
}

export default UserLayout;
