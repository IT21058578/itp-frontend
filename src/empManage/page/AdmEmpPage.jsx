import React from "react";
import { useParams } from "react-router-dom";

// AdmEmpPage. The empId received is {empId}. This page will make a GET
// request using this id and present the details
function AdmEmpPage() {
	const { empId } = useParams();

	return (
		<div>
			AdmEmpPage. The empId received is {empId}. This page will make a GET
			request using this id and present the details
		</div>
	);
}

export default AdmEmpPage;
