import {
	Container,
	EmployeeCreationModal,
	EmployeeSearchOptions,
	EmployeeTable,
} from "../../components";
import React, {
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { useInfiniteScroll } from "../../hooks";
import { Button } from "flowbite-react";
import { PlusIcon } from "@heroicons/react/24/solid";

const EMP_LIST_URL = process.env.REACT_APP_EMPLOYEE_SEARCH_API_URL;

function EmployeeManagementPage() {
	const [isEmployeeCreationMdlActive, setIsEmployeeCreationMdlActive] =
		useState(false);

	const [pgNum, setPgNum] = useState(1);
	const [searchParams, setSearchParams] = useState({});
	const [searchSortParams, setSearchSortParams] = useState({});
	const [sortDir, setSortDir] = useState("");
	const [sortCol, setSortCol] = useState("");
	const pgSize = 20;

	useEffect(() => {
		setSearchSortParams({ ...searchParams, sortDir, sortCol });
		setPgNum(1);
	}, [JSON.stringify(searchParams), sortDir, sortCol]);

	function handleSearch(s) {
		setSearchParams(s);
	}

	const { dataList, hasMore, isLoading, isError } = useInfiniteScroll(
		EMP_LIST_URL,
		searchSortParams,
		pgNum,
		setPgNum,
		pgSize,
		false
	);

	const observer = useRef();
	const rowRef = useCallback(
		(node) => {
			if (isLoading) {
				return;
			}
			if (observer.current) {
				observer.current.disconnect();
			}
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPgNum((prevPgNum) => prevPgNum + 1);
				}
			});
			if (node) {
				observer.current.observe(node);
			}
		},
		[isLoading, hasMore]
	);

	function handleSortChange(col) {
		if (sortCol === col) {
			if (sortDir === "") {
				setSortDir("asc");
			}
			if (sortDir === "asc") {
				setSortDir("desc");
			}
			if (sortDir === "desc") {
				setSortDir("");
			}
		} else {
			setSortCol(col);
			setSortDir("asc");
		}
	}

	return (
		<Fragment>
			<div className="flex flex-col gap-2 h-full w-full">
				<Container>
					<div className="flex flex-row text-2xl pb-2 border-b items-center justify-between">
						<span className="flex flex-row items-center gap-4">
							<span className="py-1 px-4">Employees</span>
						</span>
					</div>
				</Container>
				<div className="flex flex-1 w-full h-full gap-2">
					<Container className="flex-grow rounded-md justify-center p-3 w-2/6">
						<EmployeeSearchOptions />
					</Container>
					<Container className="w-4/6">
						<div className="flex flex-row justify-end pb-2 mb-2 border-b">
							<Button
								onClick={() => setIsEmployeeCreationMdlActive(true)}
								style={{ width: "25%" }}
							>
								<div className="flex flex-row items-center gap-2">
									<PlusIcon className="w-5 h-5 flex-1" />
									Create New Employee
								</div>
							</Button>
						</div>
						<div
							className="flex-grow flex border rounded-md overflow-y-scroll h-full bg-gray-50"
							style={{ height: "70vh" }}
						>
							<EmployeeTable
								handleSortChange={handleSortChange}
								dataList={dataList}
								sortDir={sortDir}
								sortCol={sortCol}
								rowRef={rowRef}
								hasMore={hasMore}
								isLoading={isLoading}
							/>
						</div>
					</Container>
				</div>
			</div>
			<EmployeeCreationModal
				isActive={isEmployeeCreationMdlActive}
				setIsActive={setIsEmployeeCreationMdlActive}
			/>
		</Fragment>
	);
}

export default EmployeeManagementPage;
