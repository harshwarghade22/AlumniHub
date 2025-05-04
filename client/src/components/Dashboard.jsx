import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/current_user/', { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(err => console.log(err));
  }, []);

  return user ? <div>Welcome {user.username}</div> : <div>Loading...</div>;
};

export default Dashboard;
