import moment from "moment";
import React, { useEffect, useState } from "react";
import { API } from "../API";
import { Modal } from "react-bootstrap";
import { toast, Toaster } from "react-hot-toast";
import { HousesFill, PeopleFill } from "react-bootstrap-icons";
import Card from "./Cards/PageCard";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [amount, setAmount] = useState(0);
  const [transactionData, setTransactionData] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  const onRecharge = () => {};
  return (
    <>
      <div className="container mt-3 container-main ">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <div style={{ margin: "4px" }}>
                <HousesFill />
              </div>
            </span>
            <h3 className="page-title" style={{ marginLeft: "8px" }}>
              Dashboard
            </h3>
          </div>
          {/* <div>
            <button
              type="button"
              className="btn-gradient-primary nav-font p-2 border rounded"
              onClick={() => onRecharge()}
            >
              Recharge Your Wallet
            </button>
          </div> */}
        </div>
        <div className="row mt-3">
          <Card
            title={"Total Project"}
            value={0}
            secondTitle={"Total Project"}
            secondValue={0}
            color={"bg-gradient-danger"}
          />
          <Card
            title={"Success Project"}
            value={0}
            secondTitle={"Total Balance"}
            secondValue={0}
            color={"bg-gradient-info"}
          />
          <Card
            title={"Failed Project"}
            value={0}
            secondTitle={"Hold Balance"}
            secondValue={0}
            color={"bg-gradient-success"}
          />
          <Card
            title={"Total Credit Used"}
            value={0}
            secondTitle={"Pdf Sended "}
            secondValue={0}
            color={"bg-gradient-primary"}
          />
        </div>
        <div className="row mt-3">
          <div className="col-xl-9">
            <div className="bg-white rounded card-trans">
              <div className="md-p-5 p-4 card-body">
                <div className="fw-bold" style={{ fontSize: "23px" }}>
                  Transaction
                </div>
                <div>
                  {transactionData?.length > 0 ? (
                    <div
                      className="table-responsive text-wrap mt-4 table-Fixed"
                      style={{
                        height: "500px",
                        overflow: "auto",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      <table className="table table-fixed">
                        <thead className="table">
                          <tr>
                            <th scope="col" className="lable-fw-size">
                              Added By
                            </th>
                            <th scope="col" className="lable-fw-size">
                              Balance
                            </th>
                            <th scope="col" className="lable-fw-size">
                              Type
                            </th>
                            <th scope="col" className="lable-fw-size">
                              Description
                            </th>
                            <th scope="col" className="lable-fw-size">
                              Created Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="table-bordered">
                          {transactionData?.map((el, key) => {
                            return (
                              <React.Fragment key={key}>
                                <tr className="lable-fw-size">
                                  <td>{el?.addedBy?.fullName}</td>
                                  <td>{el.balance}</td>
                                  <td>
                                    {el.type === "Credit" ? (
                                      <div className="text-success">
                                        {el.type}
                                      </div>
                                    ) : el.type === "Debit" ? (
                                      <div className="text-danger">
                                        {el.type}
                                      </div>
                                    ) : el.type === "Hold" ? (
                                      <div className="text-info">{el.type}</div>
                                    ) : (
                                      <div className="text-warning">
                                        {el.type}
                                      </div>
                                    )}
                                  </td>
                                  <td>{el.description}</td>
                                  <td>
                                    {moment(el.createdAt).format(
                                      "DD-MM-YYYY HH:mm:ss"
                                    )}
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
                      className="mt-3 container m-auto text-center border rounded "
                      style={{ padding: "50px" }}
                    >
                      <div className="fw-bold">No Record Found</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="d-flex flex-column mt-md-0 mt-3 mb-md-0 mb-4">
              <div
                className="bg-white rounded card-trans"
                style={{ height: "134px" }}
              >
                <div className="d-flex flex-column static-card-padding ">
                  <h5>Total Project</h5>
                  <div className="mt-2">{0}</div>
                </div>
              </div>
              <div
                className="bg-white rounded card-trans mt-4"
                style={{ height: "134px" }}
              >
                <div className="d-flex flex-column static-card-padding">
                  <h5>Total Balance</h5>
                  <div className="mt-2">{0}</div>
                </div>
              </div>
              <div
                className="bg-white rounded card-trans mt-4"
                style={{ height: "134px" }}
              >
                <div className="d-flex flex-column static-card-padding">
                  <h5>Hold Balance</h5>
                  <div className="mt-2">{0}</div>
                </div>
              </div>
              <div
                className="bg-white rounded card-trans mt-4"
                style={{ height: "134px" }}
              >
                <div className="d-flex flex-column static-card-padding">
                  <h5>Total Pdf Send</h5>
                  <div className="mt-2">{0}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4"></div>
        </div>
      </div>
      {
        <Modal show={false} onHide={() => false} centered>
          <Modal.Header className="px-4" closeButton>
            <Modal.Title className="ms-auto page-title">
              Recharge Your wallet
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group md-4">
              <label className="lable-fw-size">
                Amount <span className="text-danger">*</span>{" "}
              </label>
              <input
                type="number"
                className="form-control form-fs form-label-border mt-1 "
                defaultValue={0}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn-light fw-bold p-2 border rounded"
              onClick={() => false}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-gradient-primary fw-bold p-2 border rounded"
              onClick={async () => {
                const { data } = await API.post(
                  `recharge-request/add-recharge-request`,
                  {
                    amount: 0,
                  }
                );
                if (data.success) {
                  toast.success(data.message);
                } else {
                  toast.error("Network Error");
                }
              }}
            >
              Submit
            </button>
          </Modal.Footer>
        </Modal>
      }
      <Toaster />
    </>
  );
};
export default Dashboard;
