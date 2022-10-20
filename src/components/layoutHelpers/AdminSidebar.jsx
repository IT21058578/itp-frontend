import { Avatar, Sidebar } from "flowbite-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context";
import {
	ChevronDoubleRightIcon,
	ChevronDoubleLeftIcon,
	UserIcon,
	BriefcaseIcon,
	ArrowRightOnRectangleIcon,
	UserGroupIcon,
	CalendarIcon,
	BookmarkIcon,
} from "@heroicons/react/24/solid";
import LogoutModal from "../loginRegister/LogoutModal";

const ADM_LAND_URL = "/admin";
const ADM_EMPS_URL = "/admin/employees";
const ADM_JOBS_URL = "/admin/jobs";
const ADM_SCHED_URL = "/admin/schedule";
const ADM_CALENDER_URL = "/admin/calender";

function AdminSidebar({ auth }) {
	const { setAuth } = useContext(AuthContext);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(true);
	const [isLogoutMdlActive, setIsLogoutMdlActive] = useState(false);

	useEffect(() => {
		setFirstName(auth?.firstName);
		setLastName(auth?.lastName);
		setEmail(auth?.email);
		setAvatarUrl(auth?.avatarUrl);
	}, [auth]);

	function gotoPage(e, url) {
		e.preventDefault();
		navigate(url);
	}

	function handleCollapse(e) {
		e.preventDefault();
		setCollapsed(!collapsed);
		console.log("collapsed: " + !collapsed);
	}

	function userLogout(e) {
		e.preventDefault();
		setAuth({}); //Revoke authorization.
		navigate("/login"); //Redirect to login.
	}
	

	return (
		<Fragment>
			<div className="border-r w-fit h-full border-gray-300">
				<Sidebar style={{ height: "100vh" }} collapsed={collapsed}>
					<Sidebar.Items>
						<Sidebar.ItemGroup>
							<Sidebar.Item
								href=""
								onClick={(e) => handleCollapse(e)}
								icon={
									!collapsed ? ChevronDoubleLeftIcon : ChevronDoubleRightIcon
								}
								style={{ height: "2.5rem", zIndex: "50" }}
							>
								<div className="inline-block align-middle">Collapse</div>
							</Sidebar.Item>
						</Sidebar.ItemGroup>
						<Sidebar.ItemGroup style={{ height: "3.25rem" }}>
							<Avatar size="md" img={avatarUrl}>
								{!collapsed ? (
									<div>
										<div className="text-sm">{firstName + " " + lastName}</div>
										<div className="text-xs">{email}</div>
									</div>
								) : null}
							</Avatar>
						</Sidebar.ItemGroup>
						<Sidebar.ItemGroup>
							<Sidebar.Item
								href=""
								onClick={(e) => gotoPage(e, ADM_CALENDER_URL)}
								icon={CalendarIcon}
								style={{ height: "2.5rem", zIndex: "50" }}
							>
								<div className="inline-block align-middle z-50">Calender</div>
							</Sidebar.Item>
							<Sidebar.Item
								href=""
								onClick={(e) => gotoPage(e, ADM_JOBS_URL)}
								icon={BriefcaseIcon}
								style={{ height: "2.5rem", zIndex: "50" }}
							>
								<div className="inline-block align-middle z-50">Jobs</div>
							</Sidebar.Item>
							<Sidebar.Item
								href=""
								onClick={(e) => gotoPage(e, ADM_SCHED_URL)}
								icon={BookmarkIcon}
								style={{ height: "2.5rem", zIndex: "50" }}
							>
								<div className="inline-block align-middle">Schedules</div>
							</Sidebar.Item>
						</Sidebar.ItemGroup>
						<Sidebar.ItemGroup>
							<Sidebar.Item
								href=""
								onClick={(e) => {
									gotoPage(e, "auth/login");
								}}
								icon={ArrowRightOnRectangleIcon}
								style={{ height: "2.5rem" }}
							>
								<div className="inline-block align-middle">Logout</div>
							</Sidebar.Item>
						</Sidebar.ItemGroup>
					</Sidebar.Items>
				</Sidebar>
			</div>
			<LogoutModal
				isLogoutMdlActive={isLogoutMdlActive}
				setIsLogoutMdlActive={setIsLogoutMdlActive}
			/>
		</Fragment>
	);
}

export default AdminSidebar;
