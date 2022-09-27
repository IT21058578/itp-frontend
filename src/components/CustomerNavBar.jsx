import React, { Fragment } from "react";
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
import { useState } from "react";
import LoginModal from "./loginRegister/LoginModal";

function CustomerNavBar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoginMdlActive, setIsLoginMdlActive] = useState(false);
	return (
		<Fragment>
			<div className="border-b">
				<Navbar fluid={true} rounded={true}>
					<Navbar.Brand href="https://flowbite.com/">
						<img
							src={require("../images/new_logo.jpg")}
							className="mr-3 h-6 sm:h-9"
							alt="Flowbite Logo"
						/>
						<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
							Quick Clean
						</span>
					</Navbar.Brand>
					<Navbar.Toggle />
					{isLoggedIn ? (
						<div className="flex md:order-2">
							<Dropdown
								arrowIcon={false}
								inline={true}
								label={
									<Avatar
										alt="User settings"
										img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
										rounded={true}
									/>
								}
							>
								<Dropdown.Header>
									<span className="block text-sm">Bonnie Green</span>
									<span className="block truncate text-sm font-medium">
										name@flowbite.com
									</span>
								</Dropdown.Header>
								<Dropdown.Item>Dashboard</Dropdown.Item>
								<Dropdown.Item>Settings</Dropdown.Item>
								<Dropdown.Item>Earnings</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item>Sign out</Dropdown.Item>
							</Dropdown>
						</div>
					) : (
						<div>
							<Button onClick={() => setIsLoginMdlActive(true)}>Login</Button>
							<LoginModal
								isLoginMdlActive={isLoginMdlActive}
								setIsLoginMdlActive={setIsLoginMdlActive}
							/>
						</div>
					)}

					<Navbar.Collapse>
						<Navbar.Link href="/navbars">Home</Navbar.Link>
						<Navbar.Link href="/navbars">About</Navbar.Link>
						<Navbar.Link href="/navbars">Services</Navbar.Link>
						<Navbar.Link href="/navbars">Pricing</Navbar.Link>
						<Navbar.Link href="/navbars">Contact</Navbar.Link>
					</Navbar.Collapse>
				</Navbar>
			</div>
		</Fragment>
	);
}

export default CustomerNavBar;
