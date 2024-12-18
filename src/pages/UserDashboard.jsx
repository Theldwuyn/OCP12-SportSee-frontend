import { useParams } from 'react-router-dom';
import usersData from '../data/mock/user.js';
import usersActivity from '../data/mock/userActivity.js';
import usersSessions from '../data/mock/userAverageSessions.js';
import usersPerformance from '../data/mock/userPerformance.js';
import SideBar from '../components/SideBar.jsx';
import Activity from '../components/Activity.jsx';

// style
import '../scss/pages/userDashboard.scss';

function UserDashboard() {
  const { userId: queryId } = useParams();

  function filterData(data, id) {
    return data.find((user) => user.id ?? user.userId === parseInt(id));
  }

  const userData = filterData(usersData, queryId);
  const userActivity = filterData(usersActivity, queryId);
  const userSessions = filterData(usersSessions, queryId);
  const userPerformance = filterData(usersPerformance, queryId);
  console.log(userData);
  console.log(userActivity.sessions);
  console.log(userSessions);
  console.log(userPerformance);
  return (
    <div className="flex_row">
      <SideBar />
      <section>
        <h1>
          Bonjour <span>{userData.userInfos.firstName}</span>{' '}
        </h1>
        <div className="chart-wrapper">
          <Activity activityData={userActivity.sessions} />
        </div>
      </section>
    </div>
  );
}

export default UserDashboard;
