import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]); // for all categories getting

  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      console.log(data.product);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setCategory(data.product.category);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setId(data.product._id);
    } catch (error) {
      console.log(error);
      alert("Error in getting single product");
    }
  };

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
      alert("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  //handle update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);
      photo && productData.append("photo", photo);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        alert("product updated successfully.");
        navigate("/dashboard/admin/products");
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error in create product");
    }
  };

  //delete product function
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure Want To Delete This Product ?");
      if (!answer) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      alert("Error in deleting product");
    }
  };

  return (
    <Layout title="Update Product - Ecommerce app">
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              {/* niche select 6 te antdesign nu 6 etle ema event ma value j pass thai direct */}
              <Select
                border={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                value={category.name}
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((cate) => {
                  return (
                    <Option value={cate._id} key={cate._id}>
                      {cate.name}
                    </Option>
                  );
                })}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product look"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="Product look"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Enter a Product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  placeholder="Enter a Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Enter a Price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-control"
                  placeholder="Enter a Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  border={false}
                  placeholder="Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  value={shipping ? "Yes" : "No"}
                  onChange={(value) => setShipping(value)}
                >
                  <Option value="true">Yes</Option>
                  <Option value="false">No</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger mx-3" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
