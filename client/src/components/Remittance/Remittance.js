import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';

const Remittance = ({data}) => {
  let {id} = useParams();

  const findRemittance = () => {
    console.log(data)
    let result;
    let payee = data.find((payee) => payee.Remittance.find(item => item.InvoiceNo == id));
    console.log('payee =>', payee)
    result = payee.Remittance.find(item => item.InvoiceNo == id);
    console.log('RESULT =>', result)

    return buildRemittance(result);
  }

  const buildRemittance = (rem) => {
    return (
      <article>
        <p>{rem.PayorName}{rem.InvoiceNo}</p>
      </article>
    )
  }

  return (
    <div className="overlay">
      <section className="modal Remittance">
        <Link to="/">x</Link>
        {/* <button onClick={logParams}>LOG params</button> */}
        Remittance Details:
        {id}
        {data.length && findRemittance()}
        {/* <p>{data.InvoiceNo}</p> */}
      </section>
    </div>
  )
}

export default Remittance;