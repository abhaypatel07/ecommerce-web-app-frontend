import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { CategoryForm } from "../../components/Forms/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);

  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        alert(`${name} are created..`);
        setName("");
        getAllCategory();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("somthing went wrong in adding category");
    }
  };

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const categoryId = selected._id;
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${categoryId}`,
        { name: updateName }
      );

      if (data.success) {
        alert(data.message);
        setUpdateName("");
        setSelected(null);
        setVisible(false);
        getAllCategory();
      } else {
        alert("category should not update..");
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong in update category");
    }
  };

  //delete category
  const deleteCategory = async () => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${selected._id}`
      );
      if (data.success) {
        alert(data.message);
        setSelected(null);
        getAllCategory();
      } else {
        alert("category should not deleted..");
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong in delete category");
    }
  };

  return (
    <Layout title="Create Category - Ecommerce app">
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
            <div>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((elem) => {
                    return (
                      <tr key={elem._id}>
                        <td>{elem.name}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setVisible(true);
                              setUpdateName(elem.name);
                              setSelected(elem);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger mx-3"
                            onClick={() => {
                              setSelected(elem);
                              deleteCategory();
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              open={visible}
              footer={null}
              onOk={() => setVisible(false)}
            >
              <CategoryForm
                value={updateName}
                setValue={setUpdateName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
