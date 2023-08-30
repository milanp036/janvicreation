import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API } from "../API";
import { ArrowLeft } from "react-bootstrap-icons";

const CreateCustomer = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const customer = await (await API.post("v1/api/customer/add", data)).data;

      if (customer.success) {
        toast.success(customer.message);
        navigate("/customer");
      }
    } catch (error) {
      // console.log("error", error);
    }
  };
  return (
    <>
      <div className="container mt-3 container-main">
        <h3 className="page-title">Create Customer</h3>
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
                    Firm Name <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("firmName", { required: true })}
                    type="text"
                    className="form-control mt-1 form-fs form-label-border p-2"
                    placeholder="Enter Firm Name"
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="lable-fw-size">
                    Customer Name <span className="text-danger">*</span>
                  </label>
                  <input
                    {...register("customerName", { required: true })}
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
                    {...register("gstNo", { required: true })}
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
                    {...register("mobileNo", { required: true })}
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
                    {...register("address", { required: true })}
                    type="text"
                    className="form-control mt-1 form-fs form-label-border p-2"
                    placeholder="Enter Address"
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
export default CreateCustomer;
