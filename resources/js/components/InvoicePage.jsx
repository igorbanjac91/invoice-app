import React  from "react";
import { IconArrowLeft } from "./Icons";
import InvoiceStatus from "./InvoiceStatus";

const InvoicePage = () => {
  return (
    <main className="invoice-page">
      <div className="main-content">
        <InvoicePageHeader />
        <InvoicePageInfo />
      </div>
      <InvoicePageActions />
    </main>
  )
}


const InvoicePageHeader = () => {
  return (
    <header className="invoice-page__header">
      <a href="#">
        <IconArrowLeft />
        Go back
      </a>
    </header>
  )
}

const InvoicePageInfo = () => {
  return (
    <article className="invoice-page__info">
      <header>
        <h4>Status</h4>
        <InvoiceStatus status={"pending"}/>
      </header>
      <InvoiceBody />
    </article>
  )
}

const InvoiceBody = () => {
  return (
    <article className="invoice-content">
      <header className="invoice-content__header">
        <div>
          <h2><span>#</span>MX19141</h2>
          <h4>Graphic Design</h4>
        </div>
        <div>
          <div>
            <p>19 Union Terrace</p>
            <p>London</p>
            <p>E1 3EZ</p>
            <p>United Kingdom</p>
          </div>
        </div>
      </header>
      <section className="invoice-content__dates">
        <div>
          <h4>Invoice Date</h4>
          <time><strong>21 Aug 2021</strong></time>
        </div>
        <div>
          <h4>Payment Due</h4>
          <time><strong>21 Aug 2021</strong></time>
        </div>
      </section>
      <section className="invoice-content__customer-info">
        <div>
          <h4>Bill To</h4>
          <strong>Alex Grim</strong>
          <div>
            <p>84 Church Way</p>
            <p>Bradford</p>
            <p>BD19PB</p>
            <p>United Kingdom</p>
          </div>
        </div>
      </section>
      <section className="invoice-content__customer-email">
        <h4>Sent to</h4>
        <strong>alexgrim@gmail.com</strong>
      </section>
      <AmountsSmallDevice />
      {/* <AmountsLargeDevice /> */}
    </article>
  )
}

const AmountsLargeDevice = () => {
  return (
    <section>
      <table>
        <thead>
          <th>Item Name</th>
          <th>QTY.</th>
          <th>Price</th>
          <th>Total</th>
        </thead>
        <tbody>
          {/* invoice items */}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="3">Amount Due</th>
            <td>£ 556.00</td>
          </tr>
        </tfoot>
      </table>
    </section>
  )
}

const AmountsSmallDevice = () => {
  return (
    <section className="amounts">
      <div className="amounts__items-list">
        <ItemsListSamllDevice />
      </div>
      <div className="amounts__total">
        <h4>Grand Total</h4>
        <strong>$ 556.00</strong>
      </div>
    </section>
  )
}

const ItemsListSamllDevice = () => {
  return (
    <ul>
      <li>
        <div>
          <h3>Banner Design</h3>
          <p>1 x £ 156.00</p>
        </div>
        <strong>£ 156.00</strong>
      </li>
      <li>
        <div>
          <h3>Email Design</h3>
          <p>2 x £ 200.00</p>
        </div>
        <strong>£ 400.00</strong>
      </li>
    </ul>
  )
}


const ItemsListSamllDeviceItem = () => {
  return (
    <li>
      <div>
        <h3>Banner Design</h3>
        <p>1 x £ 156.00</p>
      </div>
      <strong>£ 156.00</strong>
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