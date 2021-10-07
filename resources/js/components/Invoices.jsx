import axios from "axios";
import React, { useEffect, useState }  from "react";
import { IconArrowDown, IconPlus } from "./Icons";
import useWindowSize from "./utils";

const Invoices = function() {

  const [ invoices, setInvoices ] = useState([]);

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
    <div className="invoices-page main-content">
      <InvoicesHeader />
      <InvoicesList invoices={invoices} />
    </div>
  )
}

const InvoicesHeader = function() {
  return (
    <div className="invoices-page__header">
      <div>
         <h2>Invoices</h2>
         {useWindowSize().width > 768
         ? <span>There are 7 total invoices</span>
         : <span>7 invoices</span>
         }
      </div>
      <div>
        <div>
          <button className="filter-btn">
            {useWindowSize().width > 768
            ? <h3>Filter by status</h3>
            : <h3>Filter</h3>
            }
            <IconArrowDown />
          </button>
        </div>
        <div>
          <button className="new-invoice-btn">
            <IconPlus />
            {useWindowSize().width > 768 
            ? <span>New Invoice</span>
            : <span>New</span>
            }
          </button>
        </div>
      </div>
    </div>
  )
}


const InvoicesList = function(props) {

  let invoices = props.invoices;

  let invoicesList = invoices.map(invoice => {
    return <InvoicesListItem key={invoice.invoice_number}  invoice={invoice}/>
  })

  return (
    <div className="invoices-page__list">
      <ul>
        {invoicesList}
      </ul>
    </div>
  )
}

const InvoicesListItem = function(props) {

  let invoice = props.invoice;
  let customer = invoice.customer;
  const date = new Date(invoice.created_at);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
  const [day, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()];
  const formattedDate = `${day} ${monthNames[month]} ${year}`; 


  return (
    <li className="invoice-list-item">
      <div>
        <h4 className="invoice-list-item__id" ><span>#</span>{invoice.invoice_number}</h4>
        <time className="invoice-list-item__date">Due {formattedDate}</time>
        <strong className="invoice-list-item__total" >£ {invoice.total_amount}</strong>
        <span className="invoice-list-item__customer">{customer.name}</span>
        <div className={`invoice-list-item--status-${invoice.status}`}>
          <div className="dot"></div>
          <span>{invoice.status}</span>
        </div>
      </div>
    </li>
  )
}

export default Invoices;