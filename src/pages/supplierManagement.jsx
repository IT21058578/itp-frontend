import React from "react";
import { useParams } from "react-router-dom";
import SupplierManagement from "./supplier/stock";

// AdmEmpPage. The empId received is {empId}. This page will make a GET
// request using this id and present the details
function SupplierManagementPage({ auth }) {
	const { empId } = useParams();

	return (
		<div>
			<SupplierManagement/>
		</div>
	);
}

export default SupplierManagementPage;
