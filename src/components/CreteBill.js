import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API } from "../API";
import { ArrowLeft } from "react-bootstrap-icons";
import { toast } from "react-hot-toast";
import moment from "moment";

const CreateBill = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  const getProject = React.useCallback(async () => {
    const getAllProject = await API.get("v1/api/customer/getall");
    const response = getAllProject.data;
    setCustomers(response.data);
  }, []);
  useEffect(() => {
    getProject();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await API.post("v1/api/pdf/generateBill", data, {
        responseType: "arraybuffer", // Ensure the response is treated as an array buffer
      });
      let firmName = "";
      customers.map((el) => {
        if (el._id === data.firmName) {
          firmName = el.firmName;
        }
      });
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const date = moment(data.date).format("DD-MM- YYYY");
      link.setAttribute("download", `${firmName}-${date}.pdf`);
      document.body.appendChild(link);
      link.click();

      toast.success(response.data.message);
      navigate("/customer");
    } catch (error) {
      // console.log("error", error);
    }
  };

  return (
    <>
      <div className="container mt-3 container-main">
        <h3 className="page-title">Create Bill</h3>
        <div>
          <button
            style={{
              cursor: "pointer",
              backgroundColor: "#e2e6ea",
              border: "none",
            }}
            className="nav-font p-2 m-auto rounded mt-2"
            onClick={() => navigate("/customer")}
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="mt-3 card-trans p-md-4 p-2">
          <div className="row align-items-center justify-content-center">
            <div className="bg-white rounded col-md-9 p-4 mt-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group ">
                  <label className="lable-fw-size">
                    Date <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("date", { required: true })}
                    type="date"
                    className="form-control mt-1 form-fs form-label-border p-2"
                    placeholder="Enter date"
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">
                    Bill No<span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("billNo", { required: true })}
                    type="text"
                    className="form-control mt-1 form-fs form-label-border p-2"
                    placeholder="Enter Bill No"
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">
                    Firm Name<span className="text-danger">*</span>
                  </label>
                  <select
                    {...register("firmName", { required: true })}
                    className="form-control mt-1 form-fs form-label-border p-2"
                  >
                    <option value="">Select Firm Name</option>
                    {customers?.map((el, key) => {
                      return (
                        <React.Fragment key={key}>
                          <option value={el._id}>{el.firmName}</option>
                        </React.Fragment>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">
                    Product Name<span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("productName", { required: true })}
                    type="text"
                    className="form-control mt-1 form-fs form-label-border p-2"
                    placeholder="Enter Product Name"
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">
                    HSN/SAC <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("productCode", { required: true })}
                    type="text"
                    className="form-control mt-1 form-fs form-label-border p-2"
                    placeholder="Enter HSN/SAC"
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">
                    Quantity <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("quantity", { required: true })}
                    type="text"
                    className="form-control mt-1 form-fs form-label-border p-2"
                    placeholder="Enter Quantity"
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">
                    Rate <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("rate", { required: true })}
                    type="text"
                    className="form-control mt-1 form-fs form-label-border p-2"
                    placeholder="Enter Rate"
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">
                    GST% <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("gstPercentage", { required: true })}
                    type="text"
                    className="form-control mt-1 form-fs form-label-border p-2"
                    placeholder="Enter GST %"
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">
                    Sub Total <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("subTotal", { required: true })}
                    type="text"
                    className="form-control mt-1 form-fs form-label-border p-2"
                    placeholder="Enter Sub Total"
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">
                    CGST <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("cgst", { required: true })}
                    type="text"
                    className="form-control mt-1 form-fs form-label-border p-2"
                    placeholder="Enter CGST"
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">
                    SGST <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("sgst", { required: true })}
                    type="text"
                    className="form-control mt-1 form-fs form-label-border p-2"
                    placeholder="Enter SGST"
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">
                    Total <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("total", { required: true })}
                    type="text"
                    className="form-control mt-1 form-fs form-label-border p-2"
                    placeholder="Enter Total"
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">
                    Whatsapp <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("whatsapp")}
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckIndeterminate"
                    defaultChecked={false} // Set the default value to false
                    onChange={(e) => {
                      if (e.target.checked) {
                        e.target.value = "true"; // Set the value to "true" when the checkbox is checked
                      } else {
                        e.target.value = ""; // Set the value back to empty string when unchecked
                      }
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-gradient-primary mr-2 p-2 mt-3 "
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateBill;
