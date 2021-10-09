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

      </header>
      <section className="invoice-content__dates">

      </section>
      <section className="invoice-content__customer-info">

      </section>
      <section className="invoice-content__customer-email">

      </section>
      <TableAmountsSmallDevice />
      <TableAmountsLargeDevice />
    </article>
  )
}

const TableAmountsLargeDevice = () => {
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

const TableAmountsSmallDevice = () => {
  return (
    <section>

    </section>
  )
}

const InvoicePageActions = () => {
  return (
    <div className="invoice-page__actions">

    </div>
  )
}

export default InvoicePage;