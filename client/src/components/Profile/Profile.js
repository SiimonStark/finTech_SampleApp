import React, {useState} from 'react';

const Profile = ({data}) => {
  const [showPAN, setShowPAN] = useState(false);

  const calcTotal = () => {
    return data.Remittance.reduce((sum, bill) => {
      sum += parseFloat(bill.Amount.replace(/[^0-9.]/g, ""));
      sum.toFixed(2);
      return sum;
    }, 0);
  }

  const buildPAN = () => {
    let chunk1 = data.Payment.PAN.toString().slice(0,4);
    let chunk2 = data.Payment.PAN.toString().slice(3,7);
    let chunk3 = data.Payment.PAN.toString().slice(8,12);
    let privacy = (
      <span>
        <i className="fas fa-circle" />
        <i className="fas fa-circle" />
        <i className="fas fa-circle" />
        <i className="fas fa-circle" />
      </span>
    );

    return showPAN ? (
      <p className="card--pan" onMouseLeave={() => setShowPAN(false)}>
        <span>{chunk1} </span>-<span> {chunk2} </span>-<span> {chunk3}</span>
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
        <h3>{data.Payee.Name}</h3>
      </article>
      <article className="Profile--total">
        {`$${calcTotal().toFixed(2)}`}
      </article>
      <article className="Profile--card">
        <div className="card">
          <p className="card--name">{data.Payee.Name}</p>
          {buildPAN()}
          <p className="card--expire">{data.Payment.Exp}</p>
          <p className="card--cvv">{data.Payment.CVV}</p>
        </div>
      </article>
    </section>
  );
}

export default Profile;