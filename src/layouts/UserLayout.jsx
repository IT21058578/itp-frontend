import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { CustomerFooter, CustomerNavBar } from "../components";
import TestNavbar from "../components/TestNavbar";
import { ErrorPage, RegisterPage, RegisterSuccessPage } from "../pages";
import Categories from "../pages/ServiceCreation/Categories";
import CatogrizedServicesHook from "../hooks/ServiceCreation/CategorizedServices";
import ServiceDeatails from "../pages/ServiceCreation/ServiceDeatials";
import ServiceRequest from "../pages/ServiceCreation/ServiceRequest";

function UserLayout() {
	return (
		<div className="min-h-screen flex flex-col">
			<TestNavbar />
			<div className="flex flex-row flex-grow justify-between">
				<div className="flex border-r bg-gray-100 w-1/12"></div>
				<Routes>
					{/*Place user routes here. Should appear in proper alloted space. ERROR ROUTE MUST BE AT END*/}
					<Route path="" element={""} />
					<Route path="register" element={<RegisterPage />} />
					<Route path="register/success" element={<RegisterSuccessPage />} />
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
