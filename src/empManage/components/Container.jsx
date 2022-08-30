import React from "react";

//Generic container class that I made.
function Container({ children, title, className }) {
	const classes =
		className !== undefined
			? "p-4 border border-gray-300 bg-white h-full" + className
			: "p-4 border border-gray-300 bg-white h-full";
	return (
		<div className={classes}>
			<div className="text-xl font-light mt-auto w-full text-center">
				{title}
			</div>
			{children}
		</div>
	);
}

export default Container;
