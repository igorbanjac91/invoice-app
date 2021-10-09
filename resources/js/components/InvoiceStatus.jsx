import React from "react";

const InvoiceStatus = (props) => {
  return (
  <div className={`invoice--status-${props.status}`}>
    <div className="dot"></div>
    <span>{props.status}</span>
  </div>
  )
}

export default InvoiceStatus;