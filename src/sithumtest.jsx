import React from 'react'
import { useNavigate } from 'react-router-dom'

function sithumtest() {
    const navigate = useNavigate(); //useNavigate() hook to navigate between pages.

    /*These are needed on the page navigate to*/
    const search = useLocation();
	const query = useMemo(() => new URLSearchParams(search), [search]);
    useEffect(() => {
		setJobId(query.get("id"));
	}, [])


  return (
    <div>
        <Button onClick={() => {useNavigate(`/base/url?id=${id}`)}}>
            A button
        </Button>
    </div>
  )
}

export default sithumtest