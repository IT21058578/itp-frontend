import React from "react";

// This page will show a list of all employees and ways to sort and search
// through them. Then these table entries can be clicked to gain further
// details about a specific employee
function AdmEmpListPage({ auth }) {
	return (
		<div>
			This page will show a list of all employees and ways to sort and search
			through them. Then these table entries can be clicked to gain further
			details about a specific employee
		</div>
	);
}

export default AdmEmpListPage;


import React, { Component } from 'react'

export class AdmEmpListPage extends Component {
  render() {
	return (
	  <div>AdmEmpListPage</div>
	)
  }
}

export default AdmEmpListPage