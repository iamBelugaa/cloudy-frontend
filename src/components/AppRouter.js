import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import FourOhFourPage from '../pages/404Page';
import AdminLoginPage from '../pages/Admin/LoginPage';
import DashboardPage from '../pages/Client/Dashboard';
import LoginPage from '../pages/Client/LoginPage';
import ProfilePage from '../pages/Client/ProfilePage';
import SignUp from '../pages/Client/SignUpPage';
import UploadPage from '../pages/Client/UploadPage';
import FilesPage from '../pages/Client/FilesPage';
import HomePage from '../pages/HomePage';
import DownloadPage from '../pages/Client/DownloadPage';

function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/" exact component={HomePage} />
        <ProtectedRoute path="/register" exact component={SignUp} />
        <ProtectedRoute path="/login" exact component={LoginPage} />
        <ProtectedRoute path="/admin/login" exact component={AdminLoginPage} />
        <ProtectedRoute path="/dashboard" exact component={DashboardPage} />
        <ProtectedRoute path="/upload" exact component={UploadPage} />
        <ProtectedRoute path="/files" exact component={FilesPage} />
        <ProtectedRoute path="/profile" exact component={ProfilePage} />
        <Route path="/download/:fileId" exact component={DownloadPage} />
        <Route path="/*" component={FourOhFourPage} />
      </Switch>
    </Router>
  );
}

const ProtectedRoute = (props) => {
  const token = JSON.parse(localStorage.getItem('uAccessToken'));
  const { path } = props;
  const { state } = useLocation();

  if (
    path === '/login' ||
    path === '/register' ||
    path === '/' ||
    path === '/admin/login'
  )
    return token ? (
      <Redirect to={state?.from || '/dashboard'} />
    ) : (
      <Route {...props} />
    );

  return token ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: path },
      }}
    />
  );
};

export default App;
