import { Avatar, Sidebar } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import {
	ChevronDoubleRightIcon,
	ChevronDoubleLeftIcon,
	UserIcon,
	ChartBarIcon,
	BriefcaseIcon,
	IdentificationIcon,
	ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

const EMP_LAND_URL = "/employee";
const EMP_STAT_URL = "/employee/stat";
const EMP_JOBS_URL = "/employee/jobs";
const EMP_PERS_URL = "/employee/personal";

function EmpSidebar({ auth }) {
	const { setAuth } = useContext(AuthContext);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(true);

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
		<div className="border-r w-fit h-full border-gray-300">
			<Sidebar style={{ height: "100vh" }} collapsed={collapsed}>
				<Sidebar.Items>
					<Sidebar.ItemGroup>
						<Sidebar.Item
							href=""
							onClick={(e) => handleCollapse(e)}
							icon={!collapsed ? ChevronDoubleLeftIcon : ChevronDoubleRightIcon}
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
							onClick={(e) => gotoPage(e, EMP_LAND_URL)}
							icon={UserIcon}
							style={{ height: "2.5rem" }}
						>
							<div className="inline-block align-middle">Landing</div>
						</Sidebar.Item>
						<Sidebar.Item
							href=""
							onClick={(e) => gotoPage(e, EMP_PERS_URL)}
							icon={IdentificationIcon}
							style={{ height: "2.5rem" }}
						>
							<div className="inline-block align-middle">Personal</div>
						</Sidebar.Item>
						<Sidebar.Item
							href=""
							onClick={(e) => gotoPage(e, EMP_STAT_URL)}
							icon={ChartBarIcon}
							style={{ height: "2.5rem" }}
						>
							<div className="inline-block align-middle">Statistics</div>
						</Sidebar.Item>
						<Sidebar.Item
							href=""
							onClick={(e) => gotoPage(e, EMP_JOBS_URL)}
							icon={BriefcaseIcon}
							style={{ height: "2.5rem" }}
						>
							<div className="inline-block align-middle">Jobs</div>
						</Sidebar.Item>
					</Sidebar.ItemGroup>
					<Sidebar.ItemGroup>
						<Sidebar.Item
							href=""
							onClick={(e) => userLogout(e)}
							icon={ArrowRightOnRectangleIcon}
							style={{ height: "2.5rem" }}
						>
							<div className="inline-block align-middle">Logout</div>
						</Sidebar.Item>
					</Sidebar.ItemGroup>
				</Sidebar.Items>
			</Sidebar>
		</div>
	);
}

export default EmpSidebar;
