/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */

import { useParams } from 'react-router-dom';
import SideBar from '../components/SideBar.jsx';
import Activity from '../components/Activity.jsx';
import apiService from '../services/ApiService.js';
import filterData from '../utils/filterData.js';

// style
import '../scss/pages/userDashboard.scss';
import { useEffect, useState } from 'react';

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

function UserDashboard() {
  const { userId: queryId } = useParams();
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const user = await apiService.get('user.json');
        const userData = filterData(user, queryId);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsers();
  }, [queryId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (user) {
    return (
      <div className="flex_row">
        <SideBar />
        <section className="dashboard">
          <h1 className="dashboard__title">
            Bonjour{' '}
            <span className="dashboard__title--accent">
              {user.userInfos.firstName}
            </span>{' '}
          </h1>
          <p className="dashboard__text">
            Félicitations ! Vous avez explosé vos objectifs hier 👏
          </p>
          <div className="chart-wrapper">
            <Activity queryId={queryId} />
          </div>
        </section>
      </div>
    );
  }
}

export default UserDashboard;
