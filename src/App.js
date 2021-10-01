import "./index.css";
import Navbar from "./components/Navbar";
import People from "./components/People";
import Planets from "./components/Planets";
import React, { useState } from "react";
import { ReactQueryDevtools } from "react-query-devtools";

function App() {
  const [page, setPage] = useState("planets");

  return (
    <>
      <div className="App">
        <h1>Star Wars </h1>
        <Navbar setPage={setPage} />
        <div className="content">
          {page === "planets" ? <Planets /> : <People />}
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
