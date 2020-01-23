import React, {useState} from 'react';
import Transaction from '../Transactions/Transactions';

const Summary = ({ data, setProfile }) => {
  const [expand, setExpand] = useState(false);

  const buildRemittance = () => {
    return data.Remittance.map((item, index) => (
      <Transaction key={`${index}_${item.InvoiceId}`} Remittance={item} />
    ));
  }

  return (
    <article
      className="Summary"
      onClick={() => setProfile(data)}
      style={{ display: "flex" }}
    >
      <button
        className={`fas fa-caret-square-${expand ? "up" : "down"}`}
        onClick={() => setExpand(!expand)}
      />
      <p>{data.Payee.Name}</p>
      <p>{data.Remittance.length}</p>
      <p>{data.Payee.Attention}</p>
      <p>{data.Payee.SubmissionDate}</p>
      {expand && buildRemittance()}
    </article>
  );
};

export default Summary;