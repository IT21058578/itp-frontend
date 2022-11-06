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
	PencilSquareIcon,
	CalendarIcon,
	BookmarkIcon,
	MapPinIcon,
	BuildingOfficeIcon,
} from "@heroicons/react/24/solid";
import LogoutModal from "../loginRegister/LogoutModal";
import { ReactSession } from "react-client-session";

const STOCK_JOBS_URL = "/admin/stock";
const SUPPLIER_JOBS_URL = "/admin/supplier";
const ADM_LAND_URL = "/admin";
const ADM_USERS_URL = "/admin/users";
const ADM_JOBS_URL = "/admin/jobs";
const ADM_CATEGORY_URL = "/admin/SCAdmin";
const ADM_SCHED_URL = "/admin/schedule";
const ADM_CALENDER_URL = "/admin/calender";
const ADM_EMP_URL = "/admin/employees";
const ADM_ZONE_URL = "/admin/zones";

function AdminSidebar() {
	const { setAuth } = useContext(AuthContext);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(true);
	const [isLogoutMdlActive, setIsLogoutMdlActive] = useState(false);

	useEffect(() => {
		setFirstName(ReactSession.get("firstName"));
		setLastName(ReactSession.get("lastName"));
		setEmail(ReactSession.get("email"));
		setAvatarUrl("");
	}, []);

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
						{!collapsed ? (
							<Sidebar.ItemGroup style={{ height: "3.25rem" }}>
								<div className="transition-all flex flex-row items-center hover:text-blue-600 active:text-blue-700 hover:bg-blue-50 active:bg-blue-200 hover:cursor-pointer rounded-md px-3">
									<div className="mr-1">
										<div className="text-sm">{firstName + " " + lastName}</div>
										<div className="text-xs">{email}</div>
									</div>
								</div>
							</Sidebar.ItemGroup>
						) : null}
						<Sidebar.ItemGroup>
							<Sidebar.Item
								href=""
								onClick={(e) => gotoPage(e, ADM_USERS_URL)}
								icon={UserGroupIcon}
								style={{ height: "2.5rem", zIndex: "50" }}
							>
								<div className="inline-block align-middle z-50">Users</div>
							</Sidebar.Item>
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
							<Sidebar.Item
								href=""
								onClick={(e) => gotoPage(e, ADM_CATEGORY_URL)}
								icon={PencilSquareIcon}
								style={{ height: "2.5rem" }}
							>
								<div className="inline-block align-middle">Services Panel</div>
							</Sidebar.Item>
							<Sidebar.Item
								href=""
								onClick={(e) => gotoPage(e, STOCK_JOBS_URL)}
								icon={BriefcaseIcon}
								style={{ height: "2.5rem" }}
							>
								<div className="inline-block align-middle">Stock</div>
							</Sidebar.Item>
							<Sidebar.Item
								href=""
								onClick={(e) => gotoPage(e, SUPPLIER_JOBS_URL)}
								icon={BriefcaseIcon}
								style={{ height: "2.5rem" }}
							>
								<div className="inline-block align-middle">Supplier</div>
							</Sidebar.Item>
							<Sidebar.Item
								href=""
								onClick={(e) => gotoPage(e, ADM_EMP_URL)}
								icon={BuildingOfficeIcon}
								style={{ height: "2.5rem" }}
							>
								<div className="inline-block align-middle">Employees</div>
							</Sidebar.Item>
							<Sidebar.Item
								href=""
								onClick={(e) => gotoPage(e, ADM_ZONE_URL)}
								icon={MapPinIcon}
								style={{ height: "2.5rem" }}
							>
								<div className="inline-block align-middle">Zones</div>
							</Sidebar.Item>
						</Sidebar.ItemGroup>
						
						<Sidebar.ItemGroup>
							<Sidebar.Item
								href=""
								onClick={(e) => {
									e.preventDefault();
									setIsLogoutMdlActive(true);
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
