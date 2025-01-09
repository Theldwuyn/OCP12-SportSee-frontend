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
import caloriesIcon from '../assets/calories-icon.svg';
import proteinIcon from '../assets/protein-icon.svg';
import carbsIcon from '../assets/carbs-icon.svg';
import fatIcon from '../assets/fat-icon.svg';

// style
import '../scss/pages/userDashboard.scss';
import Score from '../components/Score.jsx';
import KeyDataCard from '../components/KeyDataCard.jsx';

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
        if (apiService.isMockedData) {
          const users = await apiService.get('user.json');
          const user = filterData(users, queryId);
          setUser(user);
        } else {
          const user = await apiService.get(`${queryId}`);
          console.log(user);
          setUser(user);
        }
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
      <div className="main_wrapper">
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
          <section id="charts" className="chart_wrapper">
            <div className="chart__barchart">
              <h2 className="chart__barchart--title chart__title">
                Activité quotidienne
              </h2>
              <Activity queryId={queryId} />
            </div>
            <div className="chart__linechart">
              <h2 className="chart__linechart--title chart__title">
                Durée moyenne des sessions
              </h2>
              <AverageSession queryId={queryId} />
            </div>
            <div className="chart__radarchart">
              <Performance queryId={queryId} />
            </div>
            <div className="chart__radialbarchart">
              <h2 className="chart__radialbarchart--title chart__title">
                Score
              </h2>
              <Score userData={user} />
            </div>
            <div className="keyDataWrapper">
              <KeyDataCard
                dataValue={user.keyData.calorieCount}
                icon={caloriesIcon}
                name="calories"
                unit="kCal"
              />
              <KeyDataCard
                dataValue={user.keyData.proteinCount}
                icon={proteinIcon}
                name="protéines"
                unit="g"
              />
              <KeyDataCard
                dataValue={user.keyData.carbohydrateCount}
                icon={carbsIcon}
                name="glucides"
                unit="g"
              />
              <KeyDataCard
                dataValue={user.keyData.lipidCount}
                icon={fatIcon}
                name="lipides"
                unit="g"
              />
            </div>
          </section>
        </section>
      </div>
    );
  }
}

export default UserDashboard;
