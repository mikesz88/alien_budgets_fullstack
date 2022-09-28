/* eslint-disable no-undef */
import React, { useContext, useEffect } from 'react';
import {
  Routes as RouteWrapper,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Hero from '../features/Hero';
import StudentDashboard from '../features/Student/AlienDashboard';
import AdultDashboard from '../features/Adult/Dashboard';
import AdultLogin from '../features/Adult/Login';
import RegisterAdultPart1 from '../features/Adult/RegisterPart1';
import RegisterAdultPart2 from '../features/Adult/RegisterPart2';
import StudentLogin from '../features/Student/Login';
import RegisterStudentPart1 from '../features/Student/RegisterPart1';
import RegisterStudentPart2 from '../features/Student/RegisterPart2';
import GuestUser from '../features/GuestUser';
import Challenge from '../features/Challenge';
import FourOhFour from '../features/FourOhFour';
import Unauthorized from '../features/Unauthorized';
import { UserContext } from '../App';
import TeacherClasses from '../features/Classes/TeacherClasses';
import CreateClass from '../features/Classes/CreateClass';
import CreateChallenge from '../features/Challenge/CreateChallenge';
import Account from '../features/Account';
import Logout from '../features/Logout';
import DeletedAccount from '../features/DeletedAccount';
import Stats from '../features/Stats';
import Leaderboard from '../features/Classes/Leaderboard';

export const PrivateRoute = ({ user, children, ...props }) => {
  const location = useLocation();
  const { authService: service } = useContext(UserContext);

  if (!service.isLoggedIn && service.role !== user) {
    return (
      <Navigate
        {...props}
        to="/unauthorized"
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export const ChallengeRoute = ({ children, ...props }) => {
  const location = useLocation();
  const { authService: service } = useContext(UserContext);

  if (!service.username) {
    return (
      <Navigate {...props} to="/guestuser" state={{ from: location }} replace />
    );
  }

  return children;
};

export const Part1RegisterRequire = ({ user, children, ...props }) => {
  const location = useLocation();
  const { authService: service } = useContext(UserContext);

  if (!service[`${user}RegisterPart1`]) {
    return (
      <Navigate
        {...props}
        to={`/register/${user}/part1`}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

const Routes = () => {
  const { authService } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem('token');
    if (loggedInUser) {
      const foundToken = loggedInUser;
      authService
        .foundUser(foundToken)
        .then((res) => {
          if (res.role === 'adult') {
            navigate('/dashboard');
          } else {
            navigate('/aliendashboard');
          }
        })
        .catch((error) => console.error(error));
    }
  }, []);

  return (
    <RouteWrapper>
      <Route path="/" element={<Hero />} exact />
      <Route path="/login/student" element={<StudentLogin />} exact />
      <Route
        path="/register/student/part1"
        element={<RegisterStudentPart1 />}
        exact
      />
      <Route
        path="/register/student/part2"
        element={
          <Part1RegisterRequire user="student">
            <RegisterStudentPart2 />
          </Part1RegisterRequire>
        }
        exact
      />
      <Route
        path="/register/adult/part1"
        element={<RegisterAdultPart1 />}
        exact
      />
      <Route
        path="/register/adult/part2"
        element={
          <Part1RegisterRequire user="adult">
            <RegisterAdultPart2 />
          </Part1RegisterRequire>
        }
        exact
      />
      <Route path="/login/adult" element={<AdultLogin />} exact />
      <Route path="/guestuser" element={<GuestUser />} exact />
      <Route
        path="/aliendashboard"
        element={
          <PrivateRoute user="student">
            <StudentDashboard />
          </PrivateRoute>
        }
        exact
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute user="adult">
            <AdultDashboard />
          </PrivateRoute>
        }
        exact
      />
      <Route
        path="/challenge/play/:challengeId"
        element={
          <ChallengeRoute>
            <Challenge />
          </ChallengeRoute>
        }
        exact
      />
      <Route path="/challenge/create" element={<CreateChallenge />} exact />
      <Route
        path="/classrooms/teacher/:teacherId"
        element={<TeacherClasses />}
        exact
      />
      <Route
        path="/classrooms/leaderboard/:class"
        element={<Leaderboard />}
        exact
      />
      <Route path="/classrooms/create" element={<CreateClass />} exact />
      <Route path="/stats/:user" element={<Stats />} exact />
      <Route path="/account" element={<Account />} exact />
      <Route path="/logout" element={<Logout />} exact />
      <Route path="*" element={<FourOhFour />} />
      <Route path="/unauthorized" element={<Unauthorized />} exact />
      <Route path="/deleted" element={<DeletedAccount />} exact />
    </RouteWrapper>
  );
};

export default Routes;
