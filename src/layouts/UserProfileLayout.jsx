import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
	UserChangePasswordPage,
	UserDashboardPage,
	UserJobPage,
	UserJobsCompletedPage,
	UserJobsFuturePage,
} from "../pages";
import { ReactSession } from "react-client-session";

import SavedPaymentInstruments from '../pages/invoice/SavedPaymentInstruments';

const profileNavBarItems = [
	{ name: "Dashboard", link: "/profile" },
	{ name: "Completed Jobs", link: "/profile/jobs/completed" },
	{ name: "Future Jobs", link: "/profile/jobs/future" },
	{ name: "Payment Instruments", link: "profile/paymentinstruments" },
];

function UserProfileLayout() {
	const navigate = useNavigate();
	const location = useLocation();

	//Redirect unlogged in if they try to access.
	useEffect(() => {
		async function validatePermissions() {
			let permissions;
			permissions = await ReactSession.get("permissions");
			if (!permissions) {
				navigate("/auth/login");
			}
		}
		validatePermissions();
	}, [])


	return (
		<div className="flex flex-grow flex-row my-8 h-auto w-auto">
			<div className="flex flex-grow flex-col gap-2 w-1/4 mx-8 h-full border-r pr-8">
				{profileNavBarItems.map((item, i) =>
					location.pathname === item.link ? (
						<div
							onClick={() => navigate(item.link)}
							key={i}
							className="transition-all font-medium text-lg hover:cursor-pointer bg-slate-100 text-slate-600 hover:text-blue-600 active:text-blue-700 p-2 rounded"
						>
							{item.name}
						</div>
					) : (
						<div
							onClick={() => navigate(item.link)}
							key={i}
							className="transition-all font-medium text-lg hover:cursor-pointer hover:text-blue-600 active:text-blue-700 hover:bg-blue-50 active:bg-blue-200 p-2 rounded"
						>
							{item.name}
						</div>
					)
				)}
			</div>
			<div className="flex flex-col w-3/4 h-full">
				<Routes>
					<Route path="" element={<UserDashboardPage />} />
					<Route path="job" element={<UserJobPage />} />
					<Route path="jobs/completed" element={<UserJobsCompletedPage />} />
					<Route path="jobs/future" element={<UserJobsFuturePage />} />
					<Route path="password" element={<UserChangePasswordPage />} />
					<Route path="profile/paymentinstruments" element={<SavedPaymentInstruments />} />
				</Routes>
			</div>
		</div>
	);
}

export default UserProfileLayout;
