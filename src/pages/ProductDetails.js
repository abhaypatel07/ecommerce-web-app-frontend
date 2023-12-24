import axios from "axios";
import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  //get product if slug is present
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="row container mt-3 ">
          <div className="col-md-6">
            <img
              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
              className="card-img-top"
              alt={product?.name}
              height="500px"
            />
          </div>
          <div className="col-md-6">
            <h1 className="text-center">Product Details</h1>
            <h5 className="mt-3 mx-3">Name : {product.name}</h5>
            <h5 className="mt-3 mx-3">Description : {product.description}</h5>
            <h5 className="mt-3 mx-3">Category : {product.category?.name}</h5>
            <h5 className="mt-3 mx-3">Price : {product.price}</h5>
            <h5 className="mt-3 mx-3">Hurry, Only {product.quantity} left!</h5>
            <button class="btn btn-secondary mx-3 mt-3">Add To Cart</button>
          </div>
        </div>
        <hr />
        <div className="row container ">
          <h1 className="text-center">similar product</h1>
          {relatedProduct.length < 1 && (
            <p className="text-center">No similar product found</p>
          )}
          {relatedProduct?.map((pr) => (
            <div className="card m-3" style={{ width: "18rem" }}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${pr._id}`}
                className="card-img-top"
                alt={pr.name}
              />
              <div className="card-body">
                <h5 className="card-title">{pr.name}</h5>
                <p className="card-text">{pr.description.substring(0, 30)}</p>
                <p className="card-text">{pr.price}</p>
                <button
                  class="btn btn-primary btn-sm"
                  onClick={() => {
                    navigate(`/product/${pr.slug}`);
                  }}
                >
                  More Details
                </button>
                <button class="btn btn-secondary btn-sm mx-1">
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};
