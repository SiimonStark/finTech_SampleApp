import React from 'react';
import {Link, useParams} from 'react-router-dom';

const Remittance = ({handleClickOut, data}) => {
  let {id} = useParams();

  const findRemittance = () => {
    let result = data.find((item) => (
      item.Remittance.find(rem => Number(rem.InvoiceNo) === Number(id))
    ));
    let Remittance = result.Remittance.find(item => (
      Number(item.InvoiceNo) === Number(id)
    ));

    return buildRemittance(Remittance);
  }

  const buildRemittance = (Rem) => {
    return (
      <article>
        <h2>
          {Rem.PayorName}
          <span>id: {Rem.PayorId}</span>
        </h2>
        <h5>Remittance Details:</h5>
        <div className="subLine">
          <p>Invoice No: {Rem.InvoiceNo}</p>
          <p>Amount: {Rem.Amount}</p>
        </div>
        <p>{Rem.Description}</p>
      </article>
    );
  }

  return (
    <div className="overlay" onClick={e => handleClickOut(e)}>
      <section className="modal Remittance">
        <Link className="close" to="/">
          <i className="fas fa-times"></i>
        </Link>
        {data.length && findRemittance()}
      </section>
    </div>
  );
}

export default Remittance;