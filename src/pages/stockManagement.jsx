import React from "react";
import { useParams } from "react-router-dom";
import StockManagement from "./stock/stock";

// AdmEmpPage. The empId received is {empId}. This page will make a GET
// request using this id and present the details
function StockManagementPage({ auth }) {
	const { empId } = useParams();

	return (
		<div>
			<h2 style={{fontSize:"24px"}} > STOCK MANAGEMENT</h2>
			<StockManagement/>
		</div>
	);
}

export default StockManagementPage;
