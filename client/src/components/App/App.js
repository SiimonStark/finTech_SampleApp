import React, { useState, useEffect } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import axios from 'axios';

import Dashboard from '../Dashboard/Dashboard';
import Payment from '../Payment/Payment';
import Remittance from '../Remittance/Remittance';

function App() {
  const [payees, setPayee] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("/api/payee")
      .then(body => setPayee(body.data))
      .catch(err => setError(err));
  }, []);

  const buildError = () => {
    return (
      <div className="overlay">
        <section className="modal modal--error">
          <button onClick={window.location('/')}>
            Refresh
          </button>
          <p>{error}</p>
        </section>
      </div>
    )
  }

  return (
    <div className="App">
      <button onClick={() => console.log(payees)}>Log</button>
      <aside>Nav</aside>
      <header>Search</header>
      {error && buildError()}
      <Switch>
        <Route path="/" exact render={() => <Dashboard payees={payees} />} />
        <Route
          path="/Payment/:id"
          exact
          render={() => (
            <Payment data={payees} />
          )}
        />
        <Route
          path="/Remittance/:id"
          exact
          render={() => (
            <Remittance data={payees} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
