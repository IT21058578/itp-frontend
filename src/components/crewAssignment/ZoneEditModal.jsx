import { Modal } from "flowbite-react";
import React from "react";

function ZoneEditModal({ isActive, setIsActive }) {
	return (
		<>
			<Modal show={isActive} onClose={() => setIsActive(false)}>
				<Modal.Header></Modal.Header>
				<Modal.Body>
					<div className="flex flex-col"></div>
				</Modal.Body>
				<Modal.Footer></Modal.Footer>
			</Modal>
		</>
	);
}

export default ZoneEditModal;
