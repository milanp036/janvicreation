import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../API";
import moment from "moment";
import { Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const [deleteCustomerPopUp, setDeleteCustomerPopUp] = useState(false);
  const [deleteCust, setDeleteCust] = useState({});
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    firmName: "",
    customerName: "",
    gstNo: "",
    mobileNo: "",
    address: "",
    _id: "",
  });

  const getCustomers = React.useCallback(async () => {
    const getAllProject = await API.get("v1/api/customer/getall");
    const response = getAllProject.data;
    setCustomers(response.data);
  }, []);
  useEffect(() => {
    getCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    const deleteCustomer = await API.delete(`v1/api/customer/delete/${id}`);
    const response = deleteCustomer.data;
    getCustomers();
  };

  const onDelete = async (id) => {
    const { data } = await API.get(`v1/api/customer/get/${id}`);
    setDeleteCust(data.data);
    setDeleteCustomerPopUp(true);
  };

  const getCustomer = async (id) => {
    const { data } = await API.get(`v1/api/customer/get/${id}`);
    setFormData(data.data);
    setData(data.data);
    setEditModal(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onEditButtonClick = async () => {
    try {
      const customer = await (
        await API.put(`v1/api/customer/update/${formData._id}`, formData)
      ).data;

      if (customer.success) {
        toast.success(customer.message);
        getCustomers();
        setEditModal(false);
      }
    } catch (error) {
      // console.log("error", error);
    }
  };

  return (
    <>
      <div className="container mt-3 container-main">
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="page-title">Customers</h3>
          <div>
            <button
              type="button"
              className="btn-gradient-primary nav-font p-2 border rounded"
              onClick={() => navigate("/customer/create-customer")}
            >
              Create New
            </button>
          </div>
        </div>
        <div className="mt-3 bg-white rounded card-trans p-md-4 p-3 ">
          {customers.length > 0 ? (
            <div className="table-responsive text-wrap mt-4 table-Fixed">
              <table className="table table-fixed">
                <thead className="table">
                  <tr>
                    <th scope="col " className="lable-fw-size">
                      Name
                    </th>
                    <th scope="col " className="lable-fw-size">
                      Customer Name
                    </th>
                    {/* <th scope="col " className="lable-fw-size">
                      Status
                    </th> */}
                    <th scope="col " className="lable-fw-size">
                      GST No
                    </th>
                    <th scope="col " className="lable-fw-size">
                      Mobile No
                    </th>
                    <th scope="col " className="lable-fw-size">
                      Address
                    </th>
                    <th scope="col " className="lable-fw-size">
                      CreatedOn
                    </th>
                    <th scope="col " className="lable-fw-size">
                      LastUpdatedOn
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="table-bordered">
                  {customers?.map((el, key) => {
                    return (
                      <React.Fragment key={key}>
                        <tr className="lable-fw-size">
                          <td
                            className="fw-bold"
                            style={{ cursor: "pointer", color: "#6610f2" }}
                            onClick={() => getCustomer(el._id)}
                          >
                            {el.firmName}
                          </td>
                          <td>{el.customerName}</td>
                          <td>{el.gstNo}</td>
                          <td>{el.mobileNo}</td>
                          <td>{el.address}</td>
                          <td>
                            {moment(el.createdAt).format("DD-MM-YYYY hh:mm:ss")}
                          </td>
                          <td>
                            {moment(el.updatedAt).format("DD-MM-YYYY hh:mm:ss")}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn-gradient-danger nav-font p-2 border rounded"
                              onClick={() => {
                                onDelete(el._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              className="mt-3 container m-auto text-center"
              style={{ padding: "50px", color: "#9c9fa6" }}
            >
              <div className="fw-bold">No Record Found</div>
            </div>
          )}
        </div>
      </div>
      {
        <Modal
          show={deleteCustomerPopUp}
          onHide={() => setDeleteCustomerPopUp(false)}
          centered
        >
          <Modal.Header className="px-4" closeButton>
            <Modal.Title className="ms-auto page-title">
              Confirm Delete
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group md-4">
              <label className="lable-fw-size">{deleteCust.firmName}</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn-light fw-bold p-2 border rounded"
              onClick={() => setDeleteCustomerPopUp(false)}
            >
              No
            </button>
            <button
              type="button"
              className="btn-gradient-primary fw-bold p-2 border rounded"
              onClick={async () => {
                deleteCustomer(deleteCust._id);
                toast.success("successfully deleted");
                setDeleteCustomerPopUp(false);
              }}
            >
              Yes
            </button>
          </Modal.Footer>
        </Modal>
      }

      {editModal && (
        <Modal show={editModal} onHide={() => setEditModal(false)} centered>
          <Modal.Header className="px-4 " closeButton>
            <Modal.Title className="ms-auto page-title">
              Edit Customer
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group ">
                <label className="lable-fw-size">
                  Firm Name <span className="text-danger">*</span>
                </label>
                <input
                  id="firmName"
                  name="firmName"
                  type="text"
                  className="form-control mt-1 form-fs form-label-border p-2"
                  placeholder="Enter Firm Name"
                  value={formData.firmName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mt-3">
                <label className="lable-fw-size">
                  Customer Name <span className="text-danger">*</span>
                </label>
                <input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control mt-1 form-fs form-label-border p-2"
                  placeholder="Enter Customer Name"
                />
              </div>
              <div className="form-group mt-3">
                <label className="lable-fw-size">
                  Gst No <span className="text-danger">*</span>
                </label>
                <input
                  id="gstNo"
                  name="gstNo"
                  value={formData.gstNo}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control mt-1 form-fs form-label-border p-2"
                  placeholder="Enter Gst No"
                />
              </div>
              <div className="form-group mt-3">
                <label className="lable-fw-size">
                  Mobile No <span className="text-danger">*</span>
                </label>
                <input
                  id="mobileNo"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control mt-1 form-fs form-label-border p-2"
                  placeholder="Enter Mobile No"
                />
              </div>
              <div className="form-group mt-3">
                <label className="lable-fw-size">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  type="text"
                  className="form-control mt-1 form-fs form-label-border p-2"
                  placeholder="Enter Address"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn-light fw-bold p-2 border rounded"
              onClick={() => setEditModal(false)}
            >
              Cancel
            </button>
            <button
              className="btn-gradient-primary fw-bold p-2 border rounded"
              onClick={() => onEditButtonClick()}
            >
              Confirm
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
export default Customer;
