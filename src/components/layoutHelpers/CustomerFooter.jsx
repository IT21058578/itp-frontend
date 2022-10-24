import React from "react";
import { Footer } from "flowbite-react";

function CustomerFooter() {
	return (
		<div className="border-t">
			<Footer container={true}>
				<Footer.Copyright href="#" by="ITP_WE_007™" year={2022} />
				<Footer.LinkGroup>
					<Footer.Link href="#"></Footer.Link>
					<Footer.Link href="#">Privacy Policy</Footer.Link>
					<Footer.Link href="#">Licensing</Footer.Link>
					<Footer.Link href="#">Contact</Footer.Link>
				</Footer.LinkGroup>
			</Footer>
		</div>
	);
}

export default CustomerFooter;
