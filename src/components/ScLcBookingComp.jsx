import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ScLcBooking({ price }) {
	const navigate = useNavigate();

	const navigateToAdminPanel = () => {
		navigate("/service");
	};

	const temp = Number(price.loundaryAdvance);

	function createBoooking() {
		axios
			.post("http://localhost:8080/LC", {
				name: "Lundry Service",
				total: temp,
			})
			.then((response) => response.data)
			.then(alert("The service created Successfully!"));
	}

	//axios.post("http://localhost:8080/BP")
	//.then(response => response.data)

	return (
		<div className="text-center top-56 align-center w-full h-auto">
			<div className=" bg-white transition-all ">
				<div className="align-center ">
					<h1 className="text-3xl">Selected item</h1>
					<p>
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum
					</p>
				</div>

				<div className=" mx-48 my-10">
					<form className=" text-center border-2 border-gray-200 rounded bg-gray-100">
						<p className="text-3xl ">Booking </p>
						<br />
						<div className="">
							<br />

							<p>Advance : {price.loundaryAdvance}</p>

							<br />
							<button
								disabled={!temp}
								className="m-2 inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={() => createBoooking()}
							>
								Purchase
							</button>
						</div>
					</form>
				</div>
				<button
					className="absolute top-4 right-4 box-border"
					onClick={() => {
						navigateToAdminPanel();
					}}
				>
					X
				</button>
			</div>

			<p>{}</p>
		</div>
	);
}

export default ScLcBooking;
