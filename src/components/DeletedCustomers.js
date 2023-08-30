import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../API";
import moment from "moment";

const DeletedCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const getProject = React.useCallback(async () => {
    const getAllProject = await API.get("v1/api/customer/getAllDeleted");
    const response = getAllProject.data;
    setCustomers(response.data);
  }, []);
  useEffect(() => {
    getProject();
  }, []);

  const deleteCustomer = async (id) => {
    // const deleteCustomer = await API.delete(`v1/api/customer/delete/${id}`);
    getProject();
  };

  const revertCustomer = async (id) => {
    const revertCustomer = await API.get(`v1/api/customer/restore/${id}`);
    getProject();
  };

  return (
    <>
      <div className="container mt-3 container-main">
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="page-title">Deleted Customers</h3>
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
                    <th></th>
                  </tr>
                </thead>
                <tbody className="table-bordered">
                  {customers?.map((el, key) => {
                    return (
                      <React.Fragment key={key}>
                        <tr className="lable-fw-size">
                          <td>
                            {el.name === "SUCCEED" ||
                            el.name === "CANCELLED" ? (
                              <div>{el.firmName}</div>
                            ) : (
                              <Link
                                to={"/customer/edit-customer"}
                                state={{ id: el._id }}
                                className="btn-link"
                              >
                                {el.firmName}
                              </Link>
                            )}
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
                              className="btn-gradient-primary nav-font p-2 border rounded"
                              onClick={() => {
                                revertCustomer(el._id);
                              }}
                            >
                              Restore
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn-gradient-danger nav-font p-2 border rounded"
                              onClick={() => {
                                deleteCustomer(el._id);
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
    </>
  );
};
export default DeletedCustomers;
