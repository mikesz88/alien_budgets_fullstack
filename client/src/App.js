/* eslint-disable import/no-cycle */
import React, { useState, createContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';
import AvatarService from './services/avatarService';
import ClassroomService from './services/classroomService';
import AuthService from './services/authService';
import Routes from './routes/Routes';

const avatarService = new AvatarService();
const classroomService = new ClassroomService();
const authService = new AuthService();
export const UserContext = createContext();

const AuthProvider = ({ children }) => {
  const context = {
    authService,
    avatarService,
    classroomService,
    updateService: () => setContextServices({ ...contextServices }),
  };

  const [contextServices, setContextServices] = useState(context);

  return (
    <UserContext.Provider value={contextServices}>
      {children}
    </UserContext.Provider>
  );
};

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes />
      </Router>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
