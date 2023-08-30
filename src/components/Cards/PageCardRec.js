import React from "react";

function PageCardRec({ title, value, color }) {
  return (
    <div className="col-md-3 ">
      <div className={`mb-2 rounded `}>
        <div className="d-flex  flex-row justify-content-between ms-4 mt-2 me-4 align-items-center">
          <p className="total-project fw-bold ">{title}</p>
          <p className="total-project fw-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default PageCardRec;
