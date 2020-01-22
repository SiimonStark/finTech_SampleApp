import React, {useState} from 'react';

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
            {key.match(/[A-Z][a-z]+|[0-9]+/g).join(" ")}: {Payee.Address[key]}
          </p>
        );
      }
      return addressAcc;
    }, {query: [], listing: []});
    console.log('After Reduce => ', address);

    return (
      <div className="map--content">
        <a href={`https://maps.google.com/?q=${address.query.join('+')}`} target="blank">
          Map
        </a>
        {address.listing}
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
        <span>{chunk1}</span> - <span>{chunk2}</span> - <span>{chunk3}</span>
      </p>
    ) : (
      <p className="card--pan" onMouseEnter={() => setShowPAN(true)}>
      {privacy} - {privacy} - <span>{chunk3}</span>
      </p>
    );
  }

  return (
    <section className="Profile">
      <article className="Profile--details">
        <h3>{Payee.Name}</h3>
        <div className="details details--contact">
          <h5>Contact</h5>
          <a href={`tel:${Payee.Phone}`}>Phone: {Payee.Phone}</a>
          <p>Fax: {Payee.Fax}</p>
        </div>
        <div className="details details--address">
          <h5>Address</h5>
          {buildAddress()}
        </div>
      </article>
      <article className="Profile--total">
        {`$${calcTotal().toFixed(2)}`}
      </article>
      <article className="Profile--card">
        <div className="card">
          <p className="card--name">{Payee.Name}</p>
          {buildPAN()}
          <p className="card--expire">Exp: {Payment.Exp}</p>
          <p className="card--cvv">CVV: {Payment.CVV}</p>
        </div>
      </article>
    </section>
  );
}

export default Profile;