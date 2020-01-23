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
  const [pages, setPages] = useState([]);
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    axios
      .get("/api/payee")
      .then(body => {
        setData(body.data);
        return body.data;
      })
      .then((results) => chunkPages(results))
      .catch(err => {
        err = JSON.stringify(err); 
        err = JSON.parse(err);
        setError(err.message);
      })
  }, []);

  const chunkPages = (results) => {
    let tempArray = results.map(i => i);
    let tempPages= [];
    while (tempArray.length) {
      let tempChunk = tempArray.splice(0,5);
      tempPages.push(tempChunk);
    }
    setPages(tempPages);
  }

  const supplyPageData = () => pages[activePage];

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

  const isLoaded = () => {
    if (data.length && pages.length) {
      return (
        <Switch>
          <Route
            path="/"
            render={() => (
              <Dashboard
                activePage={activePage}
                setActivePage={setActivePage}
                payees={supplyPageData()}
                pages={pages}
              />
            )}
          />
          <Route path="/Payment/:id" render={() => <Payment data={data} />} />
          <Route
            path="/Remittance/:id"
            render={() => <Remittance data={data} />}
          />
        </Switch>
      );
    } else {
      return (
        <main>
        LOADING.....
      </main>
      )
    }
  }

  return (
    <div className="App">
      <Header setData={setData} setError={setError} />
      {error && buildError()}
      {isLoaded()}
    </div>
  );
}

export default App;
