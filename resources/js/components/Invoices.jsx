import axios from "axios";
import React, { useEffect, useState }  from "react";
import { IconArrowDown, IconArrowUp, IconPlus } from "./Icons";
import { useWindowSize, formatDate } from "./utils";
import InvoiceStatus from "./InvoiceStatus";
import { Link } from "react-router-dom";

const Invoices = function() {

  const [ invoices, setInvoices ] = useState([]);
  const [ filterdInvoices, setFilteredInvoices ] = useState([]);
  const [ draftChecked, setDraftChecked ] = useState(false);
  const [ pendingChecked, setPendingChecked ] = useState(false);
  const [ paidChecked, setPaidChecked ] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    filterInvoicesByStatus();
  }, [draftChecked, pendingChecked, paidChecked]);

  function fetchInvoices() {
    axios
      .get("/api/invoices")
      .then( response => {
        const fetchedInvoices = response.data
        setInvoices(fetchedInvoices);
        setFilteredInvoices(fetchedInvoices);
      })
      .catch(e => {
        console.log("errors");
      })
  }


  function checkStatus(value) {
    switch (value) {
      case "draft":
        setDraftChecked(!draftChecked);
        break;
      case "pending":
        setPendingChecked(!pendingChecked);
        break;
      case "paid":
        setPaidChecked(!paidChecked);
        break;
      default: 
        console.log("Error: Wrong value for filter");
    }
  }

  function filterInvoicesByStatus() {
    let newInvoices = invoices.filter( invoice => {
      if (invoice.status == "draft") {
        return draftChecked;
      }
      if (invoice.status == "pending") {
        return pendingChecked;
      }
      if (invoice.status == "paid") {
        return paidChecked;
      }
    })
    if (!draftChecked && !pendingChecked && !paidChecked ) {
      setFilteredInvoices(invoices);
    } else {
      setFilteredInvoices(newInvoices);
    }
  }
    
  return (
    <div className="invoices-page main-content">
      <InvoicesHeader checkStatus={checkStatus} 
                      draftChecked={draftChecked} 
                      pendingChecked={pendingChecked}
                      paidChecked={paidChecked}
                      invoices={filterdInvoices}
                      totalInvoices={invoices.length} />
      { invoices.length == 0 
      ? <EmptyInvoices />
      : <InvoicesList invoices={filterdInvoices} />
      }
    </div>
  )
}


const InvoicesHeader = function(props) {

  const [ toggleFilter, setToggleFilter ] = useState(false);
  const [ message, setMessage ] = useState("");

  function toggleFilterBox() {
    setToggleFilter(!toggleFilter);
  }

  useEffect(() => {
    setMessages(props.invoices);
  }, [props.invoices, message])

  function setMessages(invoices) {
    let invoicesNumber = {
      draft: 0,
      pending: 0,
      paid: 0,
    }

    let dn = invoicesNumber.draft = countInvoicesByStatus(invoices, "draft");
    let pen = invoicesNumber.pending = countInvoicesByStatus(invoices, "pending");
    let pan = invoicesNumber.paid = countInvoicesByStatus(invoices, "paid");
    
    if (Object.values(invoices).every((k) => k == 0)) {
      setMessage("No invoices");
      return
    }

    if (dn === 1 && pen === 0  && pan === 0 ) return setMessage("There is 1 draft invoice");
    if (dn === 0  && pen === 1  && pan === 0 ) return setMessage("There is 1 pending invoice");
    if (dn === 0  && pen === 0  && pan === 1 ) return setMessage("There is 1 paid invoice");
    
    if (dn >= 1  && pen >= 1  && pan === 0 ) return setMessage(`There are ${dn} draft and ${pen} panding invoices`);
    if (dn === 0  && pen >= 1  && pan > 1 ) return setMessage(`There are ${pen} pending and ${pan} paid invoices`);
    if (dn >= 1  && pen === 0  && pan >= 1 ) return setMessage(`There are ${dn} draft and ${pan} paid invoices`);

    if (dn > 1  && pen === 0  && pan === 0) return setMessage(`There are ${dn} draft invoices`);
    if (dn === 0  && pen > 1  && pan === 0 ) return setMessage(`There are ${pen} panding invoices`);
    if (dn === 0  && pen === 0  && pan > 1 ) return setMessage(`There are ${pan} paid invoices`);

    if (dn >= 1  && pen >= 1  && pan >= 1 ) return setMessage(`There are ${dn} draft, ${pen} panding, and ${pan} paid invoices`);

  }


  function countInvoicesByStatus(invoices, status) {
    let number = 0;
    console.log(invoices)
    invoices.forEach(invoice => {
      if (invoice.status == status) {
        number++;
      }
    });
    return number
  }


  return (
    <div className="invoices-page__header">
      <div>
        { props.totalInvoices == 0
        ? <h2>Invoices</h2> 
        : <h2>{props.totalInvoices} Invoices</h2> 
        }
        {useWindowSize().width >= 768
        ? <span>{message}</span>
        : <span>{message}</span>
        }
      </div>
      <div>
        <div className="filter-container">
          <button className="filter-btn"
                  onClick={toggleFilterBox}>
            {useWindowSize().width >= 768
            ? <h3>Filter by status</h3>
            : <h3>Filter</h3>
            }
            { toggleFilter ? <IconArrowUp /> : <IconArrowDown /> }
          </button>
          { toggleFilter 
          ? <Filter checkStatus={props.checkStatus} 
                    draftChecked={props.draftChecked}
                    pendingChecked={props.pendingChecked}
                    paidChecked={props.paidChecked} /> 
          : null
          }
        </div>
        <div>
          <button className="btn new-invoice-btn">
            <IconPlus />
            {useWindowSize().width >= 768 
            ? <span>New Invoice</span>
            : <span>New</span>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

const EmptyInvoices = function() {

  return (
    <div className="empty-invoices">
      <div className="empty-image-container">
        <img src="/images/illustration-empty.svg" alt="" />
      </div>
      <h2>There is nothing here</h2>
      <p>Create an invoice by clicking the <b>New</b> Button and get started</p>
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

  return (
    <li className="invoice-list-item">
      <Link to={`/invoices/${invoice.invoice_number}`}>
        <h4 className="invoice-list-item__id" ><span>#</span>{invoice.invoice_number}</h4>
        <time className="invoice-list-item__date">Due {formatDate(invoice.created_at)}</time>
        <strong className="invoice-list-item__total" >£ {invoice.total_amount}</strong>
        <span className="invoice-list-item__customer">{customer.name}</span>
        <InvoiceStatus status={invoice.status}/>
      </Link>
    </li>
  )
}

const Filter = function(props) {

  function checkStatus(e) {
    props.checkStatus(e.target.value);
  }

  return (
    <div className="filter-status">
      <label htmlFor="draft">
        <input type="checkbox" id="draft" name="draft" 
               value="draft"
               checked={props.draftChecked}
               onChange={checkStatus} />
        Draft               
      </label>
      <label htmlFor="pending">
        <input type="checkbox" id="pending" name="pending" 
               value="pending"
               checked={props.pendingChecked}
               onChange={checkStatus} />
        Pending
      </label>
      <label htmlFor="paid">
        <input type="checkbox" id="paid" name="paid" 
               value="paid"
               checked={props.paidChecked}
               onChange={checkStatus} />
        Paid
      </label>
    </div>
  )
}

export default Invoices;