import React from "react";

const InvoiceStatus = (props) => {
  return (
  <div className={`invoice-list-item--status-${props.status}`}>
    <div className="dot"></div>
    <span>{props.status}</span>
  </div>
  )
}

export default InvoiceStatus;