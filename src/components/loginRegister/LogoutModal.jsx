import { Modal, Button } from "flowbite-react";
import React from "react";
import { ReactSession } from "react-client-session";
import { Navigate, useNavigate } from "react-router-dom";

function LogoutModal({ isLogoutMdlActive, setIsLogoutMdlActive }) {
	const navigate = useNavigate();
	function validateLogout() {
		ReactSession.remove("email");
		ReactSession.remove("firstName");
		ReactSession.remove("lastName");
		ReactSession.remove("permissions");
		ReactSession.remove("userKind");
		ReactSession.remove("id");
		ReactSession.remove("authorizationToken");
		ReactSession.remove("resetToken");
		ReactSession.remove("password");
		window.location.reload();
		navigate("/");
	}

	return (
		<Modal
			show={isLogoutMdlActive}
			onClose={() => {
				setIsLogoutMdlActive(false);
			}}
		>
			<Modal.Header>Logout of your account?</Modal.Header>
			<Modal.Body>Are you sure you want to logout?</Modal.Body>
			<Modal.Footer>
				<div className="flex gap-2 justify-end w-full items-center">
					<Button
						color="gray"
						onClick={() => {
							setIsLogoutMdlActive(false);
						}}
					>
						Cancel
					</Button>
					<Button onClick={validateLogout}>Logout</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default LogoutModal;
