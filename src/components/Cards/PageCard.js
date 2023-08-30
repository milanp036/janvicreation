import React from "react";

function PageCard({ title, value, color ,secondTitle ,secondValue}) {
  return (
    <div className="col-md-3 ">
      <div className={`${color} bg-gradient-danger mb-2 border rounded`}>
      {/* <div className="d-flex flex-column p-4 text-white">
          <h5>{title}</h5> */}
        <div className="d-flex flex-column p-lg-4 p-md-2 p-sm-4 p-4 text-white">
          <div className="card-title1">{title}</div>
          <div className="d-flex flex-row justify-content-between">
            <h6 className="fw-bold">{value}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageCard;
