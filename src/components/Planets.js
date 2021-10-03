import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet.js";

const fetchPlanets = async (key) => {
//   console.log("greeting", key.queryKey[1]);
//   console.log("key", key.queryKey[0]);

  const res = await fetch(
    `http://swapi.dev/api/planets/?page=${key.queryKey[1]}`
  );
  // const json = await res.json();
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);

  const { data, status } = useQuery(["planets", page], fetchPlanets, {
    // staleTime: 0,
    // cacheTime: 10,
    onSuccess: () => console.log("no problemo"),
  });
  console.log("data", data);

  return (
    <div>
      <h2>Planets</h2>
      {/* <p>{status}</p> */}

      {status === "loading" && <div>Loading Data...</div>}

      {status === "error" && <div>Error Fetching Data</div>}

      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((old) => ( !data || !data.next ? old : old + 1))
            }
            disabled={!data || !data.next}
          >
            Next Page
          </button>
          <div>
            {data.results &&
              data.results.map((item, ind) => (
                <Planet key={ind} planet={item} />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
