import { Button, Label, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'

function UserTableSearch({handleSearch}) {
	const [showSelect, setShowSelect] = useState("");
	const [searchSelect, setSearchSelect] = useState("");
	const [searchString ,setSearchString] = useState("");
	const [searchStringHasErr, setSearchStringHasErr] = useState("");

	function handleSubmit() {
		let hasAnyErr = false;
		if (!hasAnyErr) {
			handleSearch({showSelect, searchSelect, searchString});
		}
	}

  	return (
    <div className="flex flex-col justify-center h-full px-4" >
			<div
				className="pr-4 flex flex-col gap-1"
				style={{
					height: "90%",
					width: "100%",
				}}
			>
				<div className="flex gap-2 flex-col py-4 border-t">
					<div className="flex items-center">
						<Label value="User Type" />
					</div>
					<Select
						value={showSelect}
						onChange={(e) => setShowSelect(e.target.value)}
					> 
						<option value="">All</option>
						<option value="client">Clients only</option>
						<option value="admin">Admins only</option>
					</Select>
				</div>
				<div className="flex gap-2 flex-col py-4 border-t">
					<div className="flex items-center">
						<Label value="Search" />
					</div>
					<div className="flex flex-row gap-2">
						<div className="w-1/4">
							<Select
							value={searchSelect}
							onChange={(e) => setSearchSelect(e.target.value)}
							> 
								<option value="">Ignore</option>
								<option value="email">Email</option>
								<option value="id">Id</option>
							</Select>
						</div>
						<div className="flex-1">
							<TextInput 
								placeholder="Type search here..."
								value={searchString}
								onChange={(e) => setSearchString(e.target.value)}
								disabled={searchSelect === "" ? true : false}
								color={searchStringHasErr === true ? "failure" : "gray"}
							/>
						</div>
					</div>		
					{searchStringHasErr ? 
						<div className="text-red-600 text-sm">
							Search string cannot be empty if it is not ignored.
						</div> :
						"" }
				</div>
			</div>
			<div className="flex gap-2 flex-col py-2 border-t">
				<Button style={{ width: "100%" }} onClick={handleSubmit}>
					Search
				</Button>
			</div>
		</div>
  )
}

export default UserTableSearch