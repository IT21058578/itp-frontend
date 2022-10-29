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
} from "@heroicons/react/24/solid";
import LogoutModal from "../loginRegister/LogoutModal";

const ADM_LAND_URL = "/admin";
const ADM_EMPS_URL = "/admin/employees";
const ADM_JOBS_URL = "/admin/jobs";
const ADM_CATEGORY_URL ="/admin/SCAdmin";

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
								style={{ height: "2.5rem" }}
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
								onClick={(e) => gotoPage(e, ADM_LAND_URL)}
								icon={UserIcon}
								style={{ height: "2.5rem" }}
							>
								<div className="inline-block align-middle">Landing</div>
							</Sidebar.Item>
							<Sidebar.Item
								href=""
								onClick={(e) => gotoPage(e, ADM_EMPS_URL)}
								icon={UserGroupIcon}
								style={{ height: "2.5rem" }}
							>
								<div className="inline-block align-middle">Employees</div>
							</Sidebar.Item>
							<Sidebar.Item
								href=""
								onClick={(e) => gotoPage(e, ADM_JOBS_URL)}
								icon={BriefcaseIcon}
								style={{ height: "2.5rem" }}
							>
								<div className="inline-block align-middle">Jobs</div>
							</Sidebar.Item>
							<Sidebar.Item
								href=""
								onClick={(e) => gotoPage(e, ADM_CATEGORY_URL)}
								icon={PencilSquareIcon}
								style={{ height: "2.5rem" }}
							>
								<div className="inline-block align-middle">Category Panel</div>
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
