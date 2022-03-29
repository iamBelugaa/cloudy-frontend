import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import FourOhFourPage from '../pages/404Page';
import AdminLoginPage from '../pages/AdminLoginPage';
import DashboardPage from '../pages/Dashboard';
import FilesPage from '../pages/FilesPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import SignUp from '../pages/SignUpPage';
import UploadPage from '../pages/UploadPage';

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
