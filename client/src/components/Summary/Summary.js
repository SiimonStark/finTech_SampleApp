import React from 'react';

const Summary = ({ data, setProfile }) => {
  return (
    <article
      className="Summary"
      onClick={() => setProfile(data)}
      style={{ display: "flex" }}
    >
      <p>{data.Payee.Name}</p>
      <p>{data.Remittance.length}</p>
      <p>{data.Payee.Attention}</p>
      <p>{data.Payee.SubmissionDate}</p>
    </article>
  );
};

export default Summary;