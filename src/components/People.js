import React from 'react';
import {useQuery} from 'react-query';
import Person from './Person.js';

const fetchPeople = async() => {
    const res = await fetch('http://swapi.dev/api/people/');
    // const json = await res.json();
    return res.json();
}

const People = () => {

    const {data, status} = useQuery('people', fetchPeople);
    console.log("data", data);

    return (
        <div>
            <h2>People</h2>
            {/* <p>{status}</p> */}

            {status === 'loading' && (
                <div>Loading Data...</div>
            )}

           
            {status === 'error' && (
                <div>Error Fetching Data</div>
            )}

            {status === 'success' && (
                <div>{data.results && data.results.map((item , ind) => <Person key={ind} people={item}/>)}</div>
            )}

        </div>
    )
}

export default People
