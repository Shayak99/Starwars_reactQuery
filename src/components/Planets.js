import React,{useState} from 'react';
import {usePaginatedQuery} from 'react-query';
import Planet from './Planet.js';

const fetchPlanets = async(key) => {

    console.log("greeting", key.queryKey[1]);
    console.log("key", key.queryKey[0]);

    const res = await fetch(`http://swapi.dev/api/planets/?page=${key.queryKey[1]}`);
    // const json = await res.json();
    return res.json();
}

const Planets = () => {
    const [page , setPage] = useState(1);

    const { resolvedData, latestData, status} = usePaginatedQuery(['planets',page], fetchPlanets, {
        // staleTime: 0,
        // cacheTime: 10, 
        onSuccess: () => console.log('no problemo')
    });
    console.log("data", resolvedData);

    return (
        <div>
            <h2>Planets</h2>
            {/* <p>{status}</p> */}
            

            {status === 'loading' && (
                <div>Loading Data...</div>
            )}

           
            {status === 'error' && (
                <div>Error Fetching Data</div>
            )}

            {status === 'success' && (
                <>
                <button
                onClick={() => setPage(old => Math.max(old-1, 1))}
                disabled={page === 1}
                >Previous Page</button>
                <span>{page}</span>
                <button
                onClick={() => setPage(old => (!latestData || !latestData.next ? old : old+1) )}
                latestData={!latestData || !latestData.next}
                >Next Page</button>
                <div>
                    {resolvedData.results && resolvedData.results.map((item , ind) => <Planet key={ind} planet={item}/>)}
                    </div>
                    </>
            )}

        </div>
    )
}

export default Planets
