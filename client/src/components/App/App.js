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
  }, [])

  return (
    <div className="App">
      <aside>
        Nav
      </aside>
      <header>
        Search
      </header>
      <Switch>
        <Route exact path="/" component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
