import React from 'react';
import {Link, useParams} from 'react-router-dom';

const Remittance = ({data}) => {
  let {id} = useParams();

  const findRemittance = () => {
    let result = data.find((item) => item.Remittance.find(rem => rem.InvoiceNo == id));
    let Remittance = result.Remittance.find(item => item.InvoiceNo == id);

    return buildRemittance(Remittance);
  }

  const buildRemittance = (Rem) => {
    return (
      <article>
        <h4>{Rem.PayorName}
          <span>id: {Rem.PayorId}</span>
        </h4>
        <p>
          <span>Invoice No: {Rem.InvoiceNo}</span>
          <span>Amount: {Rem.Amount}</span>
        </p>
        <p>{Rem.Description}</p>
      </article>
    )
  }

  return (
    <div className="overlay">
      <section className="modal Remittance">
        <Link to="/">x</Link>
        <h5>Remittance Details:</h5>
        {data.length && findRemittance()}
      </section>
    </div>
  )
}

export default Remittance;