import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './theme';
import Routes from './routes/Routes';
import { AuthServiceProvider } from './services/AuthServiceProvider';
import { AvatarServiceProvider } from './services/AvatarServiceProvider';
import { ClassroomServiceProvider } from './services/ClassroomServiceProvider';
import { GameServiceProvider } from './services/GameServiceProvider';

const App = () => (
  <AuthServiceProvider>
    <ClassroomServiceProvider>
      <GameServiceProvider>
        <AvatarServiceProvider>
          <ThemeProvider theme={theme}>
            <Router>
              <Routes />
            </Router>
          </ThemeProvider>
        </AvatarServiceProvider>
      </GameServiceProvider>
    </ClassroomServiceProvider>
  </AuthServiceProvider>
);

export default App;
