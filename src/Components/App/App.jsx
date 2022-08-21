import React from "react";
import Loading from "../Loading/Loading";
import { FaSearch } from "react-icons/fa";
import Photos from "../Photos/Photos";
import { useGlobalContext } from "../Context/Context";
const App = () => {
const {loading,handleSubmit,handleQuery,query}=useGlobalContext();
  return (
    <>
      {loading && <Loading />} 
      <main className="container py-5">
      <form  className="form-search d-flex ">
        <input value={query} onChange={handleQuery} type="text" className="form-control" placeholder="Search" />
        <button onClick={handleSubmit} type="submit" className="btn btn-form">
          <FaSearch />
        </button>
      </form>
      <section className="row py-5">
      <Photos />

      </section>
      {!loading && <h2 className="text-center">Loading...</h2>}
    </main>
      
    </>
  );
};

export default App;
