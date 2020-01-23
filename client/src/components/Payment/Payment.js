import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';

const Card = ({data}) => {
  let {id} = useParams();
  let [showPAN, setShowPAN] = useState(false);

  const searchData = () => data.find(item => item.Payee.Name === id);

  const findCard = () => {
    let result = searchData();
    return buildCard(result.Payee, result.Payment)
  }

  const buildCard = (Payee, Payment) => {
    return (
      <article className="Profile--card">
        <div className="card">
            <p className="card--name">{Payee.Name}</p>
            {buildPAN(Payment)}
            <p className="card--expire">Exp: {Payment.Exp}</p>
            <p className="card--cvv">CVV: {Payment.CVV}</p>
        </div>
      </article>
    );
  }

  const buildPAN = (Payment) => {
    let chunk1 = Payment.PAN.toString().slice(0, 4);
    let chunk2 = Payment.PAN.toString().slice(3, 7);
    let chunk3 = Payment.PAN.toString().slice(8, 12);
    let privacy = (
      <span className="privacyShield">
        <i className="fas fa-circle" />
        <i className="fas fa-circle" />
        <i className="fas fa-circle" />
        <i className="fas fa-circle" />
      </span>
    );

    return showPAN ? (
      <p className="card--pan" onMouseLeave={() => setShowPAN(false)}>
        <span>{chunk1}</span> - <span>{chunk2}</span> - <span>{chunk3}</span>
      </p>
    ) : (
      <p className="card--pan" onMouseEnter={() => setShowPAN(true)}>
        {privacy} - {privacy} - <span>{chunk3}</span>
      </p>
    );
  };

  return (
    <div className="overlay">
      <section className="modal Card">
        <Link to="/">x</Link>
        {data.length && findCard()}
      </section>
    </div>
  );
}

export default Card;