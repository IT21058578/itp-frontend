import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";

function AddScheduleInterface() {
	const [showModal, setShowModal] = useState(false);

	function handleSubmit() {}

	return (
		<div>
			<Button onClick={() => setShowModal(true)}>Add Schedule</Button>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<Modal.Header>Adding New Schedule</Modal.Header>
				<Modal.Body>
					<div className="space-y-6">
						<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
							Please enter the details for the new schedule.
						</p>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleSubmit}>Submit</Button>
					<Button color="gray" onClick={() => setShowModal(false)}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default AddScheduleInterface;
