import { Route, Routes } from 'react-router-dom';
import UserDashboard from '../pages/UserDashboard';

function AppRouter() {
  return (
    <Routes>
      <Route path="/user/:userId" element={<UserDashboard />} />
    </Routes>
  );
}

export default AppRouter;
