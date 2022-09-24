import React from "react";

//Generic container class that I made.
function Container({ children, title, className }) {
	const classes =
		className !== undefined
			? "rounded-md p-4 border border-gray-300 bg-white flex flex-col " +
			  className
			: "rounded-md p-4 border border-gray-300 bg-white flex flex-col ";
	return (
		<div className={classes}>
			<div className="text-xl font-light w-full text-center">{title}</div>
			{children}
		</div>
	);
}

export default Container;
