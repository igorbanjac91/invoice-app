import axios from "axios";
import React, { useEffect, useState }  from "react";
import { IconArrowDown, IconArrowUp, IconPlus } from "./Icons";
import useWindowSize from "./utils";

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
        setInvoices(response.data);
        setFilteredInvoices(response.data);
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
      <InvoicesList invoices={filterdInvoices} />
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
      setMessage("There are 0 invoices");
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
         <h2>{props.totalInvoices} Invoices</h2>
         {useWindowSize().width > 768
         ? <span>{message}</span>
         : <span>{}</span>
         }
      </div>
      <div>
        <div className="filter-container">
          <button className="filter-btn"
                  onClick={toggleFilterBox}>
            {useWindowSize().width > 768
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