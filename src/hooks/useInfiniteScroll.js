import axios from 'axios';
import { useEffect, useState } from 'react'

//dataParams should hold; pgSize, pgNum, all other params.
function useInfiniteScroll(dataUrl, dataParams, pgNum, pgSize) {
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    //Runs for any param change except pgNum.
    useEffect(() => {
        setDataList([]);
    }, [JSON.stringify(dataParams)]);

    //Only runs if pgNum changes.
    useEffect(() => {
        let cancelToken;
        setIsLoading(true);
        setIsError(false);

        axios
            .get(dataUrl, {
                params: { ...dataParams, pgSize, pgNum },
                cancelToken: new axios.CancelToken(c => (cancelToken = c))
            }).then(response => {
                setDataList(prevData => prevData.concat(response.data.content));
                setHasMore(response.data.content.length !== 0);
                setIsLoading(false);
            }).catch(err => {
                if (axios.isCancel(err)) { return; }
                else { setIsError(true); }
            });
    }, [pgNum, JSON.stringify(dataParams)])

    return { dataList, hasMore, isLoading, isError };
}

export default useInfiniteScroll