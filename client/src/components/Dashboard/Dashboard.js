import React, {useState} from 'react';

import Profile from '../Profile/Profile';
import Summary from '../Summary/Summary';

const Dashboard = ({payees}) => {
  const [profile, setProfile] = useState(null);

  const buildPayeeLog = () => {
    return payees.map(item => 
      <Summary 
        key={item._id} 
        data={item}
        setProfile={setProfile} />);
  }

  const buildProfile = () => {
    console.log('Profile', profile);
    return <Profile key={profile._id} data={profile}/>
  }

  return (
    <main>
      Dashboard
      <section className="log">
        {buildPayeeLog()}
      </section>
      <aside className="Profile">
        {profile && buildProfile()}
      </aside>
    </main>
  )
}

export default Dashboard;