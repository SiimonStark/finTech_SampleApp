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
      <div className="Summary--content">
        <button
          className={`fas fa-caret-square-${expand ? "up" : "down"}`}
          onClick={() => setExpand(!expand)}
        />
        <p>{data.Payee.Name}</p>
        <p>Trans: {data.Remittance.length}</p>
        <p>Attn:{data.Payee.Attention}</p>
        <p>{data.Payee.SubmissionDate}</p>
      </div>
      {expand && buildRemittance()}
    </article>
  );
};

export default Summary;