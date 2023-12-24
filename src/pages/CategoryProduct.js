import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug]);

  return (
    <>
      <Layout title="Ecommerce app - category">
        <div className="container">
          <h3 className="text-center mt-3"> category - {category[0]?.name}</h3>
          <h6 className="text-center mt-2">{products?.length} Results Found</h6>
          <div className="row mt-3">
            <div className="d-flex flex-wrap">
              {products?.map((pr) => (
                <div className="card m-3" style={{ width: "18rem" }}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${pr._id}`}
                    className="card-img-top"
                    height={"300px"}
                    alt={pr.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{pr.name}</h5>
                    <p className="card-text">
                      {pr.description.substring(0, 30)}
                    </p>
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
          </div>
        </div>
      </Layout>
    </>
  );
};
