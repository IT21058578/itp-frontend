import { Button, Avatar, Dropdown } from "flowbite-react";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./loginRegister/LoginModal";
import { ReactSession } from "react-client-session";

//THIS MUST BE UPDATED WITH LINKS.
const navbarLinks = [
	{ displayText: "Home", link: "/" },
	{ displayText: "Services", link: "/services" },
	{ displayText: "About Us", link: "/aboutus" },
	{ displayText: "Contact", link: "/contact" },
];

function TestNavbar() {
	const navigate = useNavigate();
	const [isLoginMdlActive, setIsLoginMdlActive] = useState(false);

	const firstName = ReactSession.get("firstName");
	const lastName = ReactSession.get("lastName");
	const email = ReactSession.get("email");
	const avatarUrl = "";

	return (
		<Fragment>
			<div className="border-b">
				<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 flex min-w-screen">
					<div
						className="flex hover:cursor-pointer"
						onClick={() => navigate("/")}
					>
						<img
							src={require("../images/new_logo.jpg")}
							className="mr-3 h-6 sm:h-9"
							alt="Flowbite Logo"
						/>
						<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
							Quick Clean
						</span>
					</div>
					<div className="flex-grow" />
					<div className="flex items-center gap-2">
						<div className="px-8 flex flex-col lg:flex-row md:flex-row items-center gap-8">
							{navbarLinks.map((item, i) => (
								<div
									onClick={() => navigate(item.link)}
									key={i}
									style={{ fontSize: "0.9em" }}
									className="font-medium hover:cursor-pointer hover:text-blue-700"
								>
									{item.displayText}
								</div>
							))}
						</div>
						<div className="border-l px-4">
							{email.length > 0 ? (
								<Avatar size="md" img={avatarUrl}>
									<div className="flex flex-row items-center">
										<div className="mr-1">
											<div className="text-sm">
												{firstName + " " + lastName}
											</div>
											<div className="text-xs">{email}</div>
										</div>
									</div>
								</Avatar>
							) : (
								<Button size="sm" onClick={() => setIsLoginMdlActive(true)}>
									Login
								</Button>
							)}
						</div>
					</div>
					<div></div>
				</nav>
			</div>
			<LoginModal
				isLoginMdlActive={isLoginMdlActive}
				setIsLoginMdlActive={setIsLoginMdlActive}
			/>
		</Fragment>
	);
}

export default TestNavbar;
