import React from "react";
import { useParams } from "react-router-dom";
import SupplierManagement from "./supplier/stock";

// AdmEmpPage. The empId received is {empId}. This page will make a GET
// request using this id and present the details
function SupplierManagementPage({ auth }) {
	const { empId } = useParams();

	return (
		<div>
			<h2 style={{ fontSize: "24px" }} > SUPPLIER MANAGEMENT</h2>

			<SupplierManagement />
		</div>
	);
}

export default SupplierManagementPage;
