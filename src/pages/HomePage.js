import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const HomePage = () => {
  const [cart, setCart] = useCart();

  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();

  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState("");

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data?.total);
      console.log(total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    // eslint-disable-next-line
  }, []);

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log("Error in getting products..");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line
  }, [page]);

  //loadmore
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
    // eslint-disable-next-line
  }, [checked, radio]);

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];

    // here value is true or false because e.target.checked return true or false value
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
    // eslint-disable-next-line
  }, [checked, radio]);

  return (
    <Layout title="All Products - Best Offers">
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter by Category</h4>
          <div className="d-flex flex-column justify-content-center p-3">
            {categories?.map((cat) => {
              return (
                <Checkbox
                  key={cat._id}
                  onChange={(e) => {
                    handleFilter(e.target.checked, cat._id);
                  }}
                >
                  {cat.name}
                </Checkbox>
              );
            })}
          </div>
          <h4 className="text-center mt-3">Filter by Price</h4>
          <div className="d-flex flex-column justify-content-center p-3">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {prices?.map((pr) => {
                return (
                  <div key={pr._id}>
                    <Radio value={pr.array}>{pr.name}</Radio>
                  </div>
                );
              })}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column justify-content-center p-3">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTER
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
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
                  <button
                    class="btn btn-secondary btn-sm mx-1"
                    onClick={() => {
                      setCart([...cart, pr]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, pr])
                      );
                      alert("Item added to cart");
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            <button
              className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading ..." : "Loadmore"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
