import React from 'react';
import {Link} from 'react-router-dom';

const Transactions = ({Remittance}) => {

  return (
    <section className="Transactions">
      <Link to={`/Remittance/${Remittance.InvoiceNo}`}>
      <div className="Transactions--content">
        <p>{Remittance.PayorName}</p>
        <p>{Remittance.InvoiceNo}</p>
        <p>{Remittance.Amount}</p>
      </div>
      </Link>
    </section>
  )
}

export default Transactions;