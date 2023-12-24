import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      if (data?.success) {
        setProducts(data.products);
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error in getting product");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Product List</h1>
            <div className="d-flex flex-wrap">
              {products?.map((pr) => (
                <Link
                  to={`/dashboard/admin/product/${pr.slug}`}
                  key={pr._id}
                  className="product-link"
                >
                  <div className="card m-3" style={{ width: "18rem" }}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${pr._id}`}
                      className="card-img-top"
                      alt={pr.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{pr.name}</h5>
                      <p className="card-text">{pr.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
