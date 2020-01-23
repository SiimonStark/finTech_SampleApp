import React from 'react';
import {Link} from 'react-router-dom';

const Transactions = ({Remittance}) => {

  const buildTransaction = () => {
    return (
      <p>{Remittance.PayorName}{Remittance.InvoiceNo}{Remittance.Amount}</p>
    )
  }

  return (
    <section className="Transactions">
      <Link to={`/Remittance/${Remittance.InvoiceNo}`}>
        {buildTransaction()}
      </Link>
    </section>
  )
}

export default Transactions;