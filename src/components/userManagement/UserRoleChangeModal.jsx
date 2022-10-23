import { CheckCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { Alert, Button, Modal, Spinner } from 'flowbite-react'
import React, { Fragment, useState } from 'react'

const USER_ROLE_CHANGE_API_URL = process.env.REACT_APP_USER_ROLE_CHANGE_API_URL;

function UserRoleChangeModal({isActive, setIsActive, userEmail, userType}) {
	const [isLoading, setIsLoading] = useState(false);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
	const [successAlertClasses, setSuccessAlertClasses] = useState(
		"absolute border-2 border-green-600 rounded-lg z-50 transition-all invisible"
	);

	function validateSubmission() {
		sendUserRoleChangeRequest();
	}

	function sendUserRoleChangeRequest() {
		let cancelToken;
		setIsLoading(true);
		axios
			.delete(USER_ROLE_CHANGE_API_URL, {
				params: { email: userEmail },
				cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
			})
			.then(() => {
				togglealert();
				resetModal();
                window.location.reload();
			})
			.catch((err) => {
				if (axios.isCancel(err)) {
					return;
				}
				setResponseHasErr(true);
				if (err.response.status === 404) {
					setResponseErrMsg("Schedule was not found. It no longer exists.");
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

	function resetModal() {
		setIsActive((prev) => !prev);
		setIsLoading(false);
		setResponseHasErr(false);
	}

	function togglealert() {
		setSuccessAlertClasses(
			"absolute border-2 border-green-600 rounded-lg z-50 transition-all visible opacity-100"
		);
		setTimeout(() => {
			setSuccessAlertClasses(
				"absolute border-2 border-green-600 rounded-lg z-50 transition-all visible opacity-0"
			);
		}, 2000);
		setTimeout(() => {
			setSuccessAlertClasses(
				"absolute border-2 border-green-600 rounded-lg z-50 transition-all invisible opacity-0"
			);
		}, 2200);
	}

    return (
    <Fragment>
        <div
				className={successAlertClasses}
				style={{ top: "88vh", left: "78.3vw" }}
			>
				<Alert icon={CheckCircleIcon} color="success" className="p-0 m-0">
					<span>
						<span className="font-medium">Updated user! </span>
						{userEmail} is not an {userType === "ADMIN" ? "client" : "admin"}
					</span>
				</Alert>
			</div>
        <Modal show={isActive} onClose={() => setIsActive(false)}>
            <Modal.Header>Are you sure?</Modal.Header>
            <Modal.Body>
                {userType === "USER" ? 
                    <div>
                        Are you sure you want to change the user with email {userEmail} into an Admin?
                        This will make it impossible for them to access the client dashboard.
                    </div> 
                    : <div>
                        Are you sure you want to change the user with email {userEmail} into a Client?
                        This will make it impossible for them to access the admin dashboard.
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <div className="flex gap-2 justify-end w-full items-center">
                    {responseHasErr ? (
                        <div className="text-red-600 text-sm flex-1 text-center">
                            {responseErrMsg}
                        </div>
                    ) : (
                        ""
                    )}
                    <Button
                        color="gray"
                        onClick={() => setIsActive(false)}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={validateSubmission}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Fragment>
                                <div className="flex flex-row">
                                    <div className="mr-2">Saving...</div>
                                    <Spinner size="sm" />
                                </div>
                            </Fragment>
                        ) : (
                            "Yes"
                        )}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    </Fragment>
    )
}

export default UserRoleChangeModal