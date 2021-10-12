import axios from "axios";
import React, { useEffect, useState }  from "react";
import { useParams } from "react-router";
import { IconArrowLeft } from "./Icons";
import InvoiceStatus from "./InvoiceStatus";
import { useWindowSize, formatDate, formatPrice } from "./utils";

const InvoicePage = () => {

  let params = useParams();
  const [ invoice, setInvoice ] = useState({});

  useEffect(() => {
    fetchInvoice(params.id);
  }, [params]);

  function fetchInvoice(invoiceId) {
    axios
      .get(`/api/invoices/${invoiceId}`)
      .then(response => {
        console.log(response)
        let fetchedInvoice = response.data;
        setInvoice(fetchedInvoice);
      })
      .catch(e => {
        console.log(e);
      })
  }

  return (
    <main className="invoice-page">
      <div className="main-content">
        <InvoicePageHeader />
        <InvoicePageInfo invoice={invoice} />
      </div>
      { useWindowSize().width < 768 && <InvoicePageActions /> }
    </main>
  )
}


const InvoicePageHeader = () => {
  return (
    <header className="invoice-page__header">
      <a href="/">
        <IconArrowLeft />
        Go back
      </a>
    </header>
  )
}

const InvoicePageInfo = (props) => {

  let invoice = props.invoice;

  return (
    <article className="invoice-page__info">
      <header>
        <div className="status-container">
          <h4>Status</h4>
          <InvoiceStatus status={invoice.status} />
        </div>
        { useWindowSize().width >= 768 && <InvoicePageActions /> }
      </header>
      <InvoiceBody invoice={invoice} />
    </article>
  )
}

const InvoiceBody = (props) => {

  let invoice = props.invoice;
  let customer = invoice.customer;
  let user_address  = invoice.user_address;
  let customer_address  = invoice.customer_address;
  let items = invoice.items;
  let total = invoice.total_amount;

  if (Object.keys(invoice).length > 0) return (
    <article className="invoice-content">
      <header className="invoice-content__header">
        <div>
          <h2><span>#</span>{invoice.invoice_number}</h2>
          <h4>{invoice.description}</h4>
        </div>
        <div>
          <div>
            <p>{user_address.name}</p>
            <p>{user_address.city}</p>
            <p>{user_address.post_code}</p>
            <p>{user_address.country}</p>
          </div>
        </div>
      </header>
      <section className="invoice-content__dates">
        <div>
          <h4>Invoice Date</h4>
          <time><strong>{formatDate(invoice.created_at)}</strong></time>
        </div>
        <div>
          <h4>Payment Due</h4>
          <time><strong>21 Aug 2021</strong></time>
        </div>
      </section>
      <section className="invoice-content__customer-info">
        <div>
          <h4>Bill To</h4>
          <strong>{customer.name}</strong>
          <div>
            <p>{customer_address.name}</p>
            <p>{customer_address.city}</p>
            <p>{customer_address.post_code}</p>
            <p>{customer_address.country}</p>
          </div>
        </div>
      </section>
      <section className="invoice-content__customer-email">
        <h4>Sent to</h4>
        <strong>{customer.email}</strong>
      </section>
      { useWindowSize().width >= 768 
      ? <TableLargeDevice items={items} total={total} />
      : <AmountsSmallDevice items={items} total={total} />
      } 
    </article>
  )
  else return null
}

const TableLargeDevice = (props) => {

  let total = props.total;

  let rows = props.items.map((item) => {
    return <TableRowLargeDevice key={item.id} item={item} />
  })

  return (
    <section className="table-container">
      <table className="invoice-table">
        <thead>
          <tr className="columns-names">
            <th className="columns-names__item-name">Item Name</th>
            <th className="columns-names__quantity">QTY.</th>
            <th className="columns-names__price">Price</th>
            <th className="columns-names__total">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="2">Amount Due</th>
            <td colSpan="2" className="invoice-table__amount-due">{formatPrice(total)}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  )
}

const TableRowLargeDevice = (props) => {

  let item = props.item;
  let name = item.name;
  let price = item.price
  let quantity = item.pivot.quantity;
  let subTotal = item.price * item.pivot.quantity;

  return (
    <tr>
      <td className="invoice-table__item-name">{name}</td>
      <td className="invoice-table__item-quantity">{quantity}</td>
      <td className="invoice-table__item-price">{formatPrice(price)}</td>
      <td className="invoice-table__item-subtotal">{formatPrice(subTotal)}</td>
    </tr>
  )
}

const AmountsSmallDevice = (props) => {

  let total = props.total

  return (
    <section className="amounts">
      <div className="amounts__items-list">
        <ItemsListSamllDevice items={props.items} />
      </div>
      <div className="amounts__total">
        <h4>Grand Total</h4>
        <strong>{formatPrice(total)}</strong>
      </div>
    </section>
  )
}

const ItemsListSamllDevice = (props) => {

  let listItems = props.items.map((item) => {
    return <ItemsListSamllDeviceItem key={item.id} item={item} />
  })

  return (
    <ul>
      {listItems}
    </ul>
  )
}


const ItemsListSamllDeviceItem = (props) => {

  let item = props.item;
  let name = item.name;
  let price = item.price
  let quantity = item.pivot.quantity;
  let subTotal = item.price * item.pivot.quantity;

  return (
    <li>
      <div>
        <h3>{name}</h3>
        <p>{`${quantity} x ${formatPrice(price)}`}</p>
      </div>
      <strong>{formatPrice(subTotal)}</strong>
    </li>
  )
}

const InvoicePageActions = () => {
  return (
    <div className="invoice-page__actions">
      <button className="btn btn-edit">Edit</button>
      <button className="btn btn-delete">Delete</button>
      <button className="btn btn-paid">Mark as Paid</button>
    </div>
  )
}

export default InvoicePage;