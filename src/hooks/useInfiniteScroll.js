import axios from 'axios';
import { useEffect, useState } from 'react'

//dataParams should hold; pgSize, pgNum, all other params.
function useInfiniteScroll(dataUrl, dataParams, pgNum, setPgNum, pgSize, forceUpdate, setForceUpdate) {
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
    const [isError, setIsError] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    //Runs for any param change except pgNum.
    useEffect(() => {
        setDataList([]);
    }, [JSON.stringify(dataParams)]);

    //Only runs if searchParams, pgNum changes and not force updating.
    useEffect(() => {
        if (forceUpdate === false) {
            console.log("Normal update infinite scroll!");
            let cancelToken;
            setIsLoading(true);
            setIsError(false);

            axios
                .post(dataUrl, { ...dataParams, pgNum, pgSize }, {
                    cancelToken: new axios.CancelToken(c => (cancelToken = c))
                }).then(response => {
                    setDataList(prevData => prevData.concat(response.data.content));
                    setHasMore(response.data.content.length !== 0);
                    setTotalElements(response.data.totalElements);
                }).catch(err => {
                    if (axios.isCancel(err)) { return; }
                    else {
                        console.log(err);
                        setIsError(true);
                    }
                }).then(() => {
                    setIsLoading(false);
                });
        }

    }, [pgNum, JSON.stringify(dataParams)])

    //Only runs if force update is true.
    useEffect(() => {
        if (forceUpdate === true) {
            setDataList([]);
            setForceUpdate(false);
            setPgNum(1);

            let cancelToken;
            setIsLoading(true);
            setIsError(false);

            axios
                .post(dataUrl, { ...dataParams, pgNum, pgSize }, {
                    cancelToken: new axios.CancelToken(c => (cancelToken = c))
                }).then(response => {
                    setDataList(prevData => prevData.concat(response.data.content));
                    setHasMore(response.data.content.length !== 0);
                    setTotalElements(response.data.totalElements);
                }).catch(err => {
                    if (axios.isCancel(err)) { return; }
                    else { setIsError(true); }
                }).then(() => {
                    setIsLoading(false);
                });
        }
    }, [forceUpdate])

    return { dataList, hasMore, isLoading, isError, totalElements };
}

export default useInfiniteScroll