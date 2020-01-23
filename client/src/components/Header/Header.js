import React from 'react';
import axios from 'axios';

const Header = ({setData, setError}) => {

  const adminReset = () => {
    if (window.confirm('You Are About to Reset the data! \n Are you sure?')) {
      axios
        .post("/api/payee/reset")
        .then(body => setData(body.data))
        .catch(err => setError(err));
    }
  }

  return (
    <header>
      <img alt="Paymerang Logo" src="https://i0.wp.com/paymerang.com/wp-content/uploads/2017/01/paymerang_sm_rgb_grd_pos.png?fit=2130%2C313&ssl=1" />
      <button className="Admin" onClick={adminReset}>
        Admin
      </button>
    </header>
  );
}

export default Header;