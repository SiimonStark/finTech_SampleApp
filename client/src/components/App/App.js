import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import Payment from '../Payment/Payment';
import Remittance from '../Remittance/Remittance';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("/api/payee")
      .then(body => setData(body.data))
      .catch(err => {
        err = JSON.stringify(err); 
        err = JSON.parse(err);
        setError(err.message);
      })
  }, []);

  const buildError = () => (
    <div className="overlay">
      <section className="modal modal--error">
        <button onClick={() => window.location.reload(true)}>
          Refresh
        </button>
        <p>{error}</p>
      </section>
    </div>
  )

  return (
    <div className="App">
      <Header setData={setData} setError={setError} />
      {error && buildError()}
      <Switch>
        <Route path="/" exact render={() => <Dashboard payees={data} />} />
        <Route
          path="/Payment/:id"
          render={() => (
            <Payment data={data} />
          )}
        />
        <Route
          path="/Remittance/:id"
          render={() => (
            <Remittance data={data} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
