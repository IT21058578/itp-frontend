import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import {
	Button,
	Label,
	Modal,
	Spinner,
	Textarea,
	TextInput,
} from "flowbite-react";
import React, { Fragment, useEffect, useState } from "react";

const ZONE_API_URL = process.env.REACT_APP_ZONE_API_URL;

function ZoneEditModal({ isActive, setIsActive, zone }) {
	const nameMaxLength = 20;
	const [name, setName] = useState();
	const [nameHasErr, setNameHasErr] = useState(false);

	const descriptionMaxLength = 200;
	const [description, setDescription] = useState();
	const [descriptionHasErr, setDescriptionHasErr] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

	useEffect(() => {
		setName(zone?.name);
		setDescription(zone?.description);
		setIsLoading(false);
	}, [zone]);

	function validateSubmission() {
		let hasAnyErr = false;

		setNameHasErr(false);
		if (name.length > nameMaxLength || name.length < 1) {
			hasAnyErr = true;
			setNameHasErr(true);
		}

		setDescriptionHasErr(false);
		if (description.length > descriptionMaxLength || description.length < 1) {
			hasAnyErr = true;
			setDescriptionHasErr(true);
		}

		if (!hasAnyErr) {
			sendZonePutRequest();
		}
	}

	function sendZonePutRequest() {
		let cancelToken;
		setIsLoading(true);
		axios({
			method: "put",
			url: ZONE_API_URL,
			params: { id: zone?.id },
			data: { sign: zone?.sign, name, description },
			cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
		})
			.then(() => {
				setIsActive(false);
				window.location.reload();
			})
			.catch((err) => {
				if (axios.isCancel(err)) {
					return;
				}
				setResponseHasErr(true);
				if (err.response.status === 409) {
					setResponseErrMsg(
						"A zone with the specified sign already exists. Please try again."
					);
				} else if (err.response.status >= 500) {
					setResponseErrMsg(
						"A miscellaneous server error occured. Please try again."
					);
				}
			})
			.then(() => {
				setIsLoading(false);
			});
	}

	return (
		<>
			<Modal show={isActive} onClose={() => setIsActive(false)}>
				<Modal.Header>Edit existing zone</Modal.Header>
				<Modal.Body>
					<div className="flex flex-col">
						<div>
							<div className="h-full">
								<div className="mb-2">
									<Label>Name</Label>
								</div>
								<TextInput
									type="text"
									placeholder="Name here..."
									maxLength={nameMaxLength}
									value={name}
									onChange={(e) => setName(e.target.value)}
									color={nameHasErr ? "failure" : "gray"}
									disabled={isLoading}
								/>
								<div className="text-gray-500 text-sm mt-1 flex flex-row items-start justify-end">
									{nameHasErr ? (
										<div className="text-red-600 w-5/6">
											Name must not be empty and less than {nameMaxLength + 1}{" "}
											characters long!
										</div>
									) : (
										""
									)}
									<div className="w-1/6 text-end">
										{name?.length} / {nameMaxLength}
									</div>
								</div>
							</div>
						</div>
						<div>
							<div className="h-full">
								<div className="mb-2">
									<Label>Description</Label>
								</div>
								<Textarea
									type="text"
									placeholder="Description here..."
									rows={3}
									style={{ resize: "none", fontSize: "0.90em" }}
									maxLength={descriptionMaxLength}
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									color={descriptionHasErr ? "failure" : "gray"}
									disabled={isLoading}
								/>
								<div className="text-gray-500 text-sm mt-1 flex flex-row items-start justify-end">
									{descriptionHasErr ? (
										<div className="text-red-600 w-5/6">
											Description must not be empty and less than{" "}
											{descriptionMaxLength + 1} characters long!
										</div>
									) : (
										""
									)}
									<div className="w-1/6 text-end">
										{description?.length} / {descriptionMaxLength}
									</div>
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<div className="flex flex-row justify-end gap-4 w-full items-center">
						{responseHasErr ? (
							<div className="text-red-600 flex-1 text-sm text-center">
								{responseErrMsg}
							</div>
						) : (
							""
						)}
						<div className="">
							<Button onClick={validateSubmission} disabled={isLoading}>
								<PaperAirplaneIcon className="h-5 w-5 mr-2" />
								{isLoading ? (
									<Fragment>
										<div className="flex flex-row">
											<div className="mr-2">Submitting...</div>
											<Spinner size="sm" />
										</div>
									</Fragment>
								) : (
									"Submit"
								)}
							</Button>
						</div>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ZoneEditModal;
