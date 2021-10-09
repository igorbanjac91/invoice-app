import React  from "react";
import InvoiceStatus from "./InvoiceStatus";

const InvoicePage = () => {
  return (
    <main className="invoice-page">
      <InvoicePageHeader />
      <InvoicePageInfo />
      <InvoicePageActions />
    </main>
  )
}


const InvoicePageHeader = () => {
  return (
    <header className="invoice-page__header">
      <a href="#">Go Back</a>
      <InvoiceStatus status={"Pending"}/>
    </header>
  )
}

const InvoicePageInfo = () => {
  return (
    <article className="invoice-page__info">
      <header>
        <span>Status</span>
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
          <h2>#MX19141</h2>
          <h3>Graphic Design</h3>
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
          <time>21 Aug 2021</time>
        </div>
        <div>
          <h4>Payment Due</h4>
          <time>21 Aug 2021</time>
        </div>
      </section>
      <section className="invoice-content__customer-info">
        <div>
          <h4>Bill To</h4>
          <p><strong>Alex Grim</strong></p>
          <div>
            <p>84 Church Way</p>
            <p>Bradford</p>
            <p>BD19PB</p>
            <p>United Kingdom</p>
          </div>
        </div>
      </section>
      <section className="invoice-content__customer-email">
        <h4>Sent To</h4>
        <p>alexgrim@gmail.com</p>
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
    <section>
      <ItemsListSamllDevice />
      <div>
        <h4>Grand Total</h4>
        <strong>$ 556.00</strong>
      </div>
    </section>
  )
}

const ItemsListSamllDevice = () => {
  return (
    <div>
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
    </div>
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
      <button>Edit</button>
      <button>Delete</button>
      <button>Mark as Paid</button>
    </div>
  )
}

export default InvoicePage;