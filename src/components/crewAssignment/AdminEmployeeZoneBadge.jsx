import { Button } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Popover } from "react-tiny-popover";

const ZONE_PAGE_URL = "/admin/zones/zone";

function AdminEmployeeZoneBadge({
	zone,
	setUnassignZoneId,
	setIsEmployeeUnassignMdlActive,
}) {
	const navigate = useNavigate();
	const [isZonePopoverVisible, setIsZonePopoverVisible] = useState(false);

	return (
		<Popover
			isOpen={isZonePopoverVisible}
			onClickOutside={() => setIsZonePopoverVisible(false)}
			positions={["bottom", "top", "left", "right"]}
			content={
				<div className="transition-all border bg-white rounded p-2 flex flex-row gap-4 m-2 items-center">
					<span className="flex-1">
						<Button
							size="sm"
							onClick={() => {
								setUnassignZoneId(zone?.id);
								setIsEmployeeUnassignMdlActive(true);
							}}
							color="failure"
						>
							Unasssign
						</Button>
					</span>
					<span
						onClick={() => navigate(`${ZONE_PAGE_URL}?id=${zone?.id}`)}
						className="text-blue-500 font-medium text-sm hover:underline hover:cursor-pointer flex-1"
					>
						To Zone Page
					</span>
				</div>
			}
		>
			<span
				onClick={() => setIsZonePopoverVisible(true)}
				className="transition-all w-fit bg-blue-500 text-white px-4 py-1 rounded hover:cursor-pointer hover:bg-blue-600 active:bg-blue-700 hover:px-8"
			>
				{zone?.sign || "?"}
			</span>
		</Popover>
	);
}

export default AdminEmployeeZoneBadge;
