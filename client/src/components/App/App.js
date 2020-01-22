import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Dashboard from '../Dashboard/Dashboard';

function App() {
  const [payees, setPayee] = useState([]);

  useEffect(() => {
    axios
      .get("/api/payee")
      .then(body => setPayee(body.data))
      .catch(err => console.log(err))
    console.log('MADE REQUEST')
  }, [])

  return (
    <div className="App">
      <button onClick={()=> console.log(payees)}>Log</button>
      <aside>
        Nav
      </aside>
      <header>
        Search
      </header>
      <Switch>
        <Route exact path="/" render={() => <Dashboard payees={payees} />} />
      </Switch>
    </div>
  );
}

export default App;
