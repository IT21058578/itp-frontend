import React, { useState } from "react";
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";

function AddScheduleInterface() {
	const [showModal, setShowModal] = useState(false);

	function handleSubmit() {}

	return (
		<div>
			<Button onClick={() => setShowModal(true)}>Add Schedule</Button>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				<Modal.Header>Create Schedule</Modal.Header>
				<Modal.Body>
					<div className="flex flex-col gap-4">
						<div>
							<div className="mb-2">
								<Label value="Title" />
							</div>
							<div>
								<TextInput type="text" placeholder="Title here..." />
							</div>
						</div>
						<div className="flex flex-row gap-4">
							<div className="flex-1">
								<div className="mb-2">
									<Label value="Date" />
								</div>
								<div>
									<TextInput type="date" placeholder="Title here..." />
								</div>
							</div>
							<div className="border-r" />
							<div className="flex-1 flex flex-row gap-4">
								<div>
									<div className="mb-2">
										<Label value="Start time" />
									</div>
									<div>
										<TextInput type="time" placeholder="Title here..." />
									</div>
								</div>
								<div>
									<div className="mb-2">
										<Label value="End time" />
									</div>
									<div>
										<TextInput type="time" placeholder="Title here..." />
									</div>
								</div>
							</div>
						</div>
						<div>
							<div className="mb-2">
								<Label value="Description" />
							</div>
							<div>
								<Textarea
									placeholder="Type your description here..."
									rows={5}
									style={{ resize: "none", fontSize: "0.90em" }}
								/>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="flex gap-2 justify-end w-full">
						<Button color="gray" onClick={() => setShowModal(false)}>
							Cancel
						</Button>
						
						<Button onClick={handleSubmit}>Submit</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default AddScheduleInterface;
