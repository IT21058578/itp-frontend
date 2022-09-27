import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ScHcBooking({ price }) {
	const navigate = useNavigate();

	const navigateToAdminPanel = () => {
		navigate("/service");
	};

	const [floorCount, setFloorCount] = useState(0);
	const [bedroomCount, setBedroomCount] = useState(0);
	const [kitchenCount, setKitchenCount] = useState(0);
	const [bathroomCount, setBathroomCount] = useState(0);
	const [guestroomCount, setGuestroomCount] = useState(0);
	const [livingoomCount, setLivingoomCount] = useState(0);
	const [chimneyCount, setChimneyCount] = useState(0);
	const [wdCount, setWdCount] = useState(0);
	const [isClickedRoof, setIsClickedRoof] = useState(0);
	const [isClickedCarpet, setIsClickedCarpet] = useState(0);
	const [isClickedCelling, setIsClickedCelling] = useState(0);
	const [isClickedWall, setIsClickedWall] = useState(0);
	const [additional, setAdditional] = useState(0);

	const handleCarpet = (event) => {
		if (event.target.checked) {
			setIsClickedCarpet(price.carpet);
		} else {
			setIsClickedCarpet(0);
		}
	};
	const handleCellingt = (event) => {
		if (event.target.checked) {
			setIsClickedCelling(price.celling);
		} else {
			setIsClickedCelling(0);
		}
	};
	const handleRoof = (event) => {
		if (event.target.checked) {
			setIsClickedRoof(price.roof);
		} else {
			setIsClickedRoof(0);
		}
	};
	const handleWall = (event) => {
		if (event.target.checked) {
			setIsClickedWall(price.wallPainting);
		} else {
			setIsClickedWall(0);
		}
	};

	const calcAdditinoal = () => {
		if (
			Number(bedroomCount) +
				Number(kitchenCount) +
				Number(bathroomCount) +
				Number(guestroomCount) +
				Number(livingoomCount) >
			6
		) {
			setAdditional(1000);
		} else {
			setAdditional(0);
		}
	};

	const temp =
		Number(floorCount * price.floor) +
		Number(bedroomCount * price.bedroom) +
		Number(kitchenCount * price.kitchen) +
		Number(bathroomCount * price.bathroom) +
		Number(guestroomCount * price.guestroom) +
		Number(livingoomCount * price.livingroom) +
		Number(chimneyCount * price.chimney) +
		Number(isClickedCarpet) +
		Number(isClickedCelling) +
		Number(isClickedRoof) +
		Number(isClickedWall) +
		Number(wdCount * price.wd) +
		Number(additional);

	function createBoooking() {
		axios
			.post("http://localhost:8080/HC", {
				name: "Home Cleaning",
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
					<h1 className="text-3xl">Home Cleaning service</h1>
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

							<div className="inline-table">
								<div className="m-2">
									<label
										class="block text-sm font-medium text-gray-500 dark:text-gray-400"
										for="inline-full-name"
									>
										No of Floors
									</label>
									<select
										className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm w-28"
										onChange={(e) => {
											setFloorCount(e.target.value);
											calcAdditinoal();
										}}
									>
										<option selected value={0}>
											None
										</option>
										<option value={1}>One</option>
										<option value={2}>Two</option>
										<option value={3}>Three</option>
									</select>
								</div>
								<div className="m-2">
									<label
										class="block text-sm font-medium text-gray-500 dark:text-gray-400"
										for="inline-full-name"
									>
										No of Bedrooms
									</label>
									<select
										className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500  text-sm w-28"
										onChange={(e) => {
											setBedroomCount(e.target.value);
											calcAdditinoal();
										}}
									>
										<option selected value={0}>
											None{" "}
										</option>
										<option value={1}>One</option>
										<option value={2}>Two</option>
										<option value={3}>Three</option>
										<option value={4}>Four</option>
										<option value={5}>Five</option>
									</select>
								</div>
								<div className="m-2">
									<label
										class="block text-sm font-medium text-gray-500 dark:text-gray-400"
										for="inline-full-name"
									>
										No of Livingrooms
									</label>
									<select
										className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500  text-sm w-32"
										onClick={(e) => {
											setLivingoomCount(e.target.value);
											calcAdditinoal();
										}}
									>
										<option selected value={0}>
											None
										</option>
										<option value={1}>One</option>
										<option value={2}>Two</option>
										<option value={3}>Three</option>
										<option value={4}>Four</option>
										<option value={5}>Five</option>
									</select>
								</div>
								<div className="m-2">
									<label
										class="block text-sm font-medium text-gray-500 dark:text-gray-400"
										for="inline-full-name"
									>
										No of Bathrooms
									</label>
									<select
										className=" bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm w-28"
										onClick={(e) => {
											setBathroomCount(e.target.value);
											calcAdditinoal();
										}}
									>
										<option selected value={0}>
											None
										</option>
										<option value={1}>One</option>
										<option value={2}>Two</option>
										<option value={3}>Three</option>
										<option value={4}>Four</option>
									</select>
								</div>
							</div>
							<div className="inline-table">
								<div className="m-2">
									<label
										class="block text-sm font-medium text-gray-500 dark:text-gray-400"
										for="inline-full-name"
									>
										No of Kitchens
									</label>
									<select
										className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm w-28"
										onClick={(e) => {
											setKitchenCount(e.target.value);
											calcAdditinoal();
										}}
									>
										<option selected value={0}>
											None
										</option>
										<option value={1}>One</option>
										<option value={2}>Two</option>
										<option value={3}>Three</option>
										<option value={4}>Four</option>
									</select>
								</div>
								<div className="m-2">
									<label
										class="block text-sm font-medium text-gray-500 dark:text-gray-400"
										for="inline-full-name"
									>
										No of Guestrooms
									</label>
									<select
										className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm w-28"
										onClick={(e) => {
											setGuestroomCount(e.target.value);
											calcAdditinoal();
										}}
									>
										<option selected value={0}>
											None
										</option>
										<option value={1}>One</option>
										<option value={2}>Two</option>
										<option value={3}>Three</option>
										<option value={4}>Four</option>
									</select>
								</div>
								<div className="m-2">
									<label
										class="block text-sm font-medium text-gray-500 dark:text-gray-400"
										for="inline-full-name"
									>
										No of Chimneies
									</label>
									<select
										className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm w-28"
										onClick={(e) => setChimneyCount(e.target.value)}
									>
										<option selected value={0}>
											None
										</option>
										<option value={1}>One</option>
										<option value={2}>Two</option>
									</select>
								</div>
								<div className="m-2">
									<label
										class="block text-sm font-medium text-gray-500 dark:text-gray-400"
										for="inline-full-name"
									>
										No of Windows and Doors
									</label>
									<select
										className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 text-sm w-28"
										onClick={(e) => setWdCount(e.target.value)}
									>
										<option selected value={0}>
											None
										</option>
										<option value={1}>One</option>
										<option value={2}>Two</option>
										<option value={3}>Three</option>
										<option value={4}>Four</option>
									</select>
								</div>
							</div>

							<div className="inline-table transition-all">
								<div className=" ">
									<label
										class="block text-sm font-medium text-gray-500 dark:text-gray-400"
										for="inline-full-name"
									>
										Roof clean
									</label>
									<input
										type="checkbox"
										className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
										value={isClickedRoof}
										onChange={handleRoof}
										name="c"
									/>
								</div>

								<div className=" ">
									<label
										class="block text-sm font-medium text-gray-500 dark:text-gray-400"
										for="inline-full-name"
									>
										Celling clean
									</label>
									<input
										type="checkbox"
										className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
										value={isClickedCelling}
										onChange={handleCellingt}
										name="c"
									/>
								</div>

								<div className="">
									<label
										class="block text-sm font-medium text-gray-500 dark:text-gray-400"
										for="inline-full-name"
									>
										Wall Paint
									</label>
									<input
										type="checkbox"
										className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
										value={isClickedWall}
										onChange={handleWall}
										name="c"
									/>
								</div>

								<div className=" ">
									<label
										class="block text-sm font-medium text-gray-500 dark:text-gray-400"
										for="inline-full-name"
									>
										Carpet Clean
									</label>
									<input
										type="checkbox"
										className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none  focus:border-purple-500"
										value={isClickedCarpet}
										onChange={handleCarpet}
										name="c"
									/>
								</div>
							</div>

							<br />
							<button
								disabled={!temp}
								className="m-2 inline-flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								onClick={() => {
									createBoooking();
								}}
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

export default ScHcBooking;
