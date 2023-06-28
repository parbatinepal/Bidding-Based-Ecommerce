import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCatagory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState();
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
        console.log(data.message, "message");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form ");
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/category/get-category"
      );
      console.log(data);

      if (data.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went to wrong in getting Category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/category/update-category`,
        { name: updatedName, id: selected._id }
      );
      if (data.success) {
        toast.success(`${updatedName} is required`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
      // console.log(e);
    } catch (error) {
      toast.error("Something wnt wrong");
    }
  };

  //delete category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/category/delete-category/${pid}`,
        // { pid: selected._pid }
      );
      if (data.success) {
        toast.success(`${name} is required`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
      // console.log(e);
    } catch (error) {
      toast.error("Something wnt wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Catagory"}>
      <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
        <CategoryForm
          value={updatedName}
          setvalue={setUpdatedName}
          handlesubmit={handleUpdate}
        />
      </Modal>

      <div class="container-fluid m-3 p-4 ">
        <div class="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Catagory</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handlesubmit={handleSubmit}
                value={name}
                setvalue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary m-2"
                            onClick={() => {
                              setVisible(true);
                              setOpen(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger m-2"
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCatagory;
