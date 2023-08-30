import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../API";
import { ArrowLeft } from "react-bootstrap-icons";
import { useEffect } from "react";

const EditCustomer = () => {
  const navigate = useNavigate();
  let { state } = useLocation();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: async () =>
      await (
        await API.get(`v1/api/customer/get/${state.id}`)
      ).data.data,
  });

  // useEffect(() => {
  //   // Fetch data from the API
  //   const fetchData = async () => {
  //     try {
  //       const response = await API.get(`v1/api/customer/get/${state.id}`);
  //       const data = response.data.data;

  //       // Set the fetched data as default values using reset from react-hook-form
  //       reset(data);
  //     } catch (error) {
  //       // Handle any errors that might occur during the API call
  //     }
  //   };

  //   fetchData();
  // }, [state.id, reset]);

  const onSubmit = async (data) => {
    reset();
    try {
      const customer = await (
        await API.put(`v1/api/customer/update/${data._id}`, data)
      ).data;

      if (customer.success) {
        toast.success(customer.message);
        reset();
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
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditCustomer;
