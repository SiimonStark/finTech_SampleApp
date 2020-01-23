import React, { useState, useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import axios from 'axios';

import Dashboard from '../Dashboard/Dashboard';
import Card from '../Card/Card';
import Remittance from '../Remittance/Remittance';

function App() {
  const [payees, setPayee] = useState([]);

  useEffect(() => {
    axios
      .get("/api/payee")
      .then(body => setPayee(body.data))
      .catch(err => console.log(err))
    console.log('MADE REQUEST')
  }, [])

  const findPayment = (id) => {
    console.log('Start Route to Payment');
    const result = payees.find(payee => payee.Payment.PAN === id);
    return result.Payment;
  }

  // const findRemittance = (Data) => {
  //   console.log('Start Route to Remittance')
  //   console.log(id)
  //   let {id} = useParams();
  //   console.log('Route Data', Data)
  //   const result = payees.find(payee => payee.Remittance.includes((remit) => remit.InvoiceNo === Data));

  //   console.log('Result => ', result);
  //   return result.Remittance;
  // }

  return (
    <div className="App">
      <button onClick={() => console.log(payees)}>Log</button>
      <aside>Nav</aside>
      <header>Search</header>
      <Switch>
        <Route path="/" exact render={() => <Dashboard payees={payees} />} />
        <Route
          path="/Payment/:id"
          exact
          render={match => (
            <Card payment={findPayment(match.params)} />
          )}
        />
        <Route
          path="/Remittance/:id"
          exact
          render={match => (
            <Remittance data={payees} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
