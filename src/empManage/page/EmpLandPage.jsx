import axios from "axios";
import React, { useContext, useState, useEffect, Fragment } from "react";

const EMP_DATA_URL = "https://localhost:8080/api/employee";
//TODO: Set URLs using environment variable.

// Employee Landing Page. This page will show the stats and etc for an
// employee. Its the first page they see when they login. The employee
// details will be extracte from the context API then a get request will be
// made for further details which will be shown.
function EmpLandPage() {
	const { employee, setEmployee } = useState({});
	const userId = "1234";
	//const { userId } = useContext();
	//TODO: Get userId from context

	useEffect(() => {
		//TODO: Ensure axios request works. Should I store this in the layout?
		axios
			.get(EMP_DATA_URL, {
				params: {
					id: userId,
				},
			})
			.then((response) => {
				console.log(response);
				setEmployee(response.data.employee);
			});
	}, []);

	return (
		<Fragment>
			<div>
				Employee Landing Page. This page will show the stats and etc for an
				employee. Its the first page they see when they login. The employee
				details will be extracte from the context API then a get request will be
				made for further details which will be shown.
			</div>
		</Fragment>
	);
}

export default EmpLandPage;
