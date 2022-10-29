import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { Button, Label, Modal, Spinner, Textarea, TextInput } from 'flowbite-react'
import React, { Fragment, useEffect, useState } from 'react'
import JobTable from '../schdManage/JobTable';

const REVIEW_API_URL = process.env.REACT_APP_REVIEW_API_URL;

function ReviewEditModal({job, setIsActive, isActive}) {
    const titleMaxLength = 40;
    const descriptionMaxLength = 80;

    const [reviewExists, setReviewExists] = useState(false);

    const [title, setTitle] = useState("");
    const [titleHasErr, setTitleHasErr] = useState(false);

    const [description, setDescription] = useState("");
    const [descriptionHasErr, setDescriptionHasErr] = useState(false);

    const [rating, setRating] = useState(0);
    const [ratingHasErr, setRatingHasErr] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
	const [responseHasErr, setResponseHasErr] = useState(false);
	const [responseErrMsg, setResponseErrMsg] = useState(false);

    //Check if a review exists when opened. If it does, set values.
    useEffect(() => {
        if (job?.review !== null) {
            setReviewExists(true);
            setTitle(job?.review?.title || "");
            setDescription(job?.review?.description || "");
            setRating(job?.review?.rating || "");
        }
    }, [isActive])
    

    function validateSubmission() {
        let hasAnyErr = false;

        setTitleHasErr(false);
        if (title.length <= titleMaxLength && title.length < 1) {
            hasAnyErr = true;
            setTitleHasErr(true);
        }

        setDescriptionHasErr(false);
        if (description.length <= descriptionMaxLength && description.length < 1) {
            hasAnyErr = true;
            setDescriptionHasErr(true);
        }

        setRatingHasErr(false);
        let ratingNum = Number(rating);
        if (ratingNum < 0 || ratingNum > 5) {
            hasAnyErr = true;
            setRatingHasErr(true);
        }

        if (!hasAnyErr) {
            sendRatingPostRequest();
        }
    }

    function sendRatingPostRequest() {
        let cancelToken;
		setIsLoading(true);
		axios({
                method: reviewExists ? 'put' : 'post',
				url: REVIEW_API_URL,
				data: { title, description, rating },
                params: { jobId: job?.id },
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
				if (err.response.status === 404) {
					setResponseErrMsg("Job or Review was not found. It no longer exists.");
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

    //Take details from job and store them into fields.
    return (
    <Fragment>
        <Modal show={isActive} onClose={() => setIsActive(false)}>
            <Modal.Header>
                {reviewExists? "Edit Existing" : "Create New"} Review
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                        <div className="flex-1 pr-16 flex flex-col border-r">
                            <div className="mb-2">
                                <Label>Title</Label>
                            </div>      
                            <TextInput 
                                type="text"
								placeholder="Title here..."
                                maxLength={titleMaxLength}
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								color={titleHasErr ? "failure" : "gray"}
								disabled={isLoading}
                            />
                            <div className="text-gray-500 text-sm mt-1 flex flex-row items-start justify-end">
                                {titleHasErr ? 
                                <div className="text-red-600 w-5/6">
									Title cannot be empty and must be less than{" "}
									{titleMaxLength + 1} characters!
								</div> : ""}
                                <div className="w-1/6 text-end">{title?.length} / {titleMaxLength}</div>
                            </div>
                        </div>
                        <div className="w-1/4 pl-4 flex flex-col">
                            <div className="mb-2">
                                <Label>Rating</Label>
                            </div>      
                            <TextInput 
                                type="number"
                                min="0"
                                max="5"
                                step={0.01}
								placeholder="0.00"
								value={rating}
								onChange={(e) => setRating(e.target.value)}
								color={ratingHasErr ? "failure" : "gray"}
								disabled={isLoading}
								helperText={
									<Fragment>
										{ratingHasErr ? (
											<span className="text-red-600">
												Rating cannot be empty and must be in range 0-5
											</span>
										) : (
											""
										)}
									</Fragment>
							    } 
                            />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="mb-2">
                            <Label>Description</Label>
                        </div>      
                        <Textarea 
                            rows="3" 
                            maxLength={descriptionMaxLength}
                            style={{ resize: "none", fontSize: "0.90em" }}
                            placeholder="Description here..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            color={descriptionHasErr ? "failure" : "gray"}
                            disabled={isLoading}
                            />
                        <div className="text-gray-500 text-sm mt-1 flex flex-row items-start justify-end">
                            {descriptionHasErr ? 
                            <div className="text-red-600 w-5/6">
                                Description cannot be empty and must be less than{" "}
                                {descriptionMaxLength + 1} characters!
                            </div> : ""}
                            <div className="w-1/6 text-end">{description?.length} / {descriptionMaxLength}</div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex flex-row justify-end gap-4 w-full items-center">
                    {responseHasErr ? 
                            <div className="text-red-600 flex-1 text-sm text-center">
                                {responseErrMsg}
                            </div> : ""}    
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
    </Fragment>
  )
}

export default ReviewEditModal