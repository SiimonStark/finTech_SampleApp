import React, {useState} from 'react';

import Profile from '../Profile/Profile';
import Summary from '../Summary/Summary';

const Dashboard = ({activePage, setActivePage, payees, pages}) => {
  const [profile, setProfile] = useState(null);

  const buildPayeeLog = () => (
    payees.map(item => 
      <Summary 
        key={item._id} 
        data={item}
        setProfile={setProfile} />)
  )

  const hanldePage = (pageNum) => {
    setActivePage(pageNum);
    setProfile(null);
  }

  const buildPageIndicator = () => {
    return (
      <section className="indicator">
        {activePage > 0 && (
          <button
            onClick={() => hanldePage(activePage - 1)}
            className="far fa-caret-square-left"
          />
        )}
        {pages.map((arr, index) => {
          let faType = activePage === index ? "fas" : "far";
          return (
            <i
              key={index}
              className={`${faType} fa-square`}
              onClick={() => hanldePage(index)}
            />
          );
        })}
        {activePage < pages.length - 1 && (
          <button
            onClick={() => hanldePage(activePage + 1)}
            className="far fa-caret-square-right"
          />
        )}
      </section>
    );
  }

  const buildProfile = () => (
    <Profile
      key={profile._id}
      Payee={profile.Payee}
      Payment={profile.Payment}
      Remittance={profile.Remittance}
    />
  );

  return (
    <main>
      Dashboard
      <section className="log">
        {payees && buildPayeeLog()}
        {pages && buildPageIndicator()}
      </section>
      <aside className="Profile">
        {profile && buildProfile()}
      </aside>
    </main>
  )
}

export default Dashboard;