import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Profile = ({Payee, Payment, Remittance}) => {
  const [showPAN, setShowPAN] = useState(false);

  const calcTotal = () => {
    return Remittance.reduce((sum, bill) => {
      sum += parseFloat(bill.Amount.replace(/[^0-9.]/g, ""));
      sum.toFixed(2);
      return sum;
    }, 0);
  }

  const buildAddress = () => {
    const keys = Object.keys(Payee.Address);
    const address = keys.reduce((addressAcc, key, index) => {
      if(Payee.Address[key]) {
        addressAcc.query.push(Payee.Address[key]);
        addressAcc.listing.push(
          <p key={index}>
            <span>{key.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}: </span>
            <br />
            {Payee.Address[key]}
            <hr/>
          </p>
        );
      }
      return addressAcc;
    }, {query: [], listing: []});

    return (
      <div className="map--content">
        {address.listing}
        <a href={`https://maps.google.com/?q=${address.query.join('+')}`} target="blank">
          Map
        </a>
      </div>
    )
  }

  const buildPAN = () => {
    let chunk1 = Payment.PAN.toString().slice(0,4);
    let chunk2 = Payment.PAN.toString().slice(3,7);
    let chunk3 = Payment.PAN.toString().slice(8,12);
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
        <span className="chunk">{chunk1}</span> -{" "}
        <span className="chunk">{chunk2}</span> -{" "}
        <span className="chunk">{chunk3}</span>
      </p>
    ) : (
      <p className="card--pan" onMouseEnter={() => setShowPAN(true)}>
        {privacy} - {privacy} - <span className="chunk">{chunk3}</span>
      </p>
    );
  }

  return (
    <section className="Profile">
      <article className="Profile--details">
        <div className="details">
          <h2>{Payee.Name}</h2>
          <div className="details--contact">
            <h4>Contact</h4>
            <a href={`tel:${Payee.Phone}`}>
              <span>Phone: </span>
              {Payee.Phone}
            </a>
            <p>
              <span>Fax: </span>
              {Payee.Fax}
            </p>
          </div>
          <div className="details--address">
            <h4>Address</h4>
            {buildAddress()}
          </div>
        </div>
      </article>
      <article className="Profile--total">
        <h4>Total Spent:</h4>
        <h2>{`$${calcTotal().toFixed(2)}`}</h2>
      </article>
      <article className="Profile--card">
        <Link to={`/Payment/${Payee.Name}`}>
          <div className="card">
              <p className="card--details name">{Payee.Name}</p>
              {buildPAN()}
              <p className="card--details expire">Exp: {Payment.Exp}</p>
              <p className="card--details cvv">CVV: {Payment.CVV}</p>
          </div>
        </Link>
      </article>
    </section>
  );
}

export default Profile;