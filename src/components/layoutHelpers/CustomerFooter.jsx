import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';

const footerLinks = [
    {displayText: "Contact", link: "/contact"},
    {displayText: "Github", link: "/github"},
    {displayText: "Privacy Policy", link: "/privacy"},
];

const copyright = "© 2022 ITP_WE_007";
const message = "This web application was made as a submission for the ITP Module on 10/25/2022"

function CustomerFooter() {
    const navigate = useNavigate();
    return (
    <Fragment>
			<div className="border-t">
				<footer className="bg-white border-gray-200 px-2 sm:px-4 py-4 rounded dark:bg-gray-900 min-w-screen text-gray-500 text-xs font-medium flex flex-row items-center">
                    <div className="flex-grow flex flex-col justify-end">
                        <div>{copyright}</div>
                        <div className="text-gray-400 text-xs font-normal">{message}</div>
                    </div>
					<div className="flex-grow" />
					<div className="flex items-center gap-2">
						<div className="px-8 flex flex-col lg:flex-row md:flex-row items-center gap-8">
							{footerLinks.map((item, i) => (
								<div
									onClick={() => navigate(item.link)}
									key={i}
									className="transition-all hover:cursor-pointer hover:text-gray-600 active:text-gray-700 hover:underline x-3 py-1 rounded-full"
								>
									{item.displayText}
								</div>
							))}
						</div>
					</div>
				</footer>
			</div>
		</Fragment>
  )
}

export default CustomerFooter