import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

const Card = ({payment}) => {

  useEffect(()=> {
    console.log('Render CARD')
  });

  return (
    <div className="overlay">
      <section className="modal Card">
        <Link to="/">x</Link>
        <h2>Card</h2>
      </section>
    </div>
  );
}

export default Card;