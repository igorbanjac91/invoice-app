import axios from "axios";
import React, { useEffect, useState }  from "react";

const Invoices = function() {

  const [ invoives, setInvoices ] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  function fetchInvoices() {
    axios
      .get("/api/invoices")
      .then( resposne => {
        console.log(resposne.data);
        setInvoices(resposne.data);
      })
      .catch(e => {
        console.log("errors");
      })
  }


  return (
    <div>
      <InvoicesHeader />
      <InvoicesList />
    </div>
  )
}

const InvoicesHeader = function() {
  return (
    <div>
      
    </div>
  )
}


const InvoicesList = function() {
  return (
    <div>

    </div>
  )
}

export default Invoices;