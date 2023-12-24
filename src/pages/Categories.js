import React from "react";
import Layout from "../components/Layout/Layout";
import { useCategory } from "../hooks/useCategory";
import { Link } from "react-router-dom";

export const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories - Ecommerce App">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {categories?.map((cat) => {
              return (
                <button>
                  <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};
