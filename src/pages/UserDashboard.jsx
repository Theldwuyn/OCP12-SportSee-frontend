/* -------------------------------------------------------------------------- */
/*                                   IMPORT                                   */
/* -------------------------------------------------------------------------- */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SideBar from '../components/SideBar.jsx';
import Activity from '../components/Activity.jsx';
import apiService from '../services/ApiService.js';
import filterData from '../utils/filterData.js';
import AverageSession from '../components/AverageSession.jsx';
import Performance from '../components/Performance.jsx';

// style
import '../scss/pages/userDashboard.scss';
import Score from '../components/Score.jsx';

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
          <section id="charts">
            <div className="flex_col">
              <div className="barchart">
                <h2 className="barchart__title chart-title">
                  Activité quotidienne
                </h2>
                <Activity queryId={queryId} />
              </div>
              <div className="flex_row space-btw">
                <div className="linechart">
                  <h2 className="linechart__title chart-title">
                    Durée moyenne des sessions
                  </h2>
                  <AverageSession queryId={queryId} />
                </div>
                <div className="radarchart">
                  <Performance queryId={queryId} />
                </div>
                <div className="radialbarchart">
                  <h2 className="radialbarchart__title chart-title">Score</h2>
                  <Score userData={user} />
                </div>
              </div>
            </div>
          </section>
        </section>
      </div>
    );
  }
}

export default UserDashboard;
