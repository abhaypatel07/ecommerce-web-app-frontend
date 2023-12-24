import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

export const SearchPage = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title="Search Result">
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} Products`}
          </h6>
          <div className="d-flex flex-wrap">
            {values?.results.map((pr) => (
              <div className="card m-3" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${pr._id}`}
                  className="card-img-top"
                  height={"300px"}
                  alt={pr.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{pr.name}</h5>
                  <p className="card-text">{pr.description.substring(0, 30)}</p>
                  <p className="card-text">{pr.price}</p>
                  <button class="btn btn-primary btn-sm">More Details</button>
                  <button class="btn btn-secondary btn-sm mx-1">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
