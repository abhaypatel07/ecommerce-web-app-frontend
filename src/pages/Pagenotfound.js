import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <Layout title="GoBack - Page not Found">
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops! Page Not Found</h2>
        <Link to="/">
          <button className="btn btn-primary">GoBack</button>
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
