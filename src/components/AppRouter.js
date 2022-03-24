import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
} from 'react-router-dom';
import FourOhFourPage from '../pages/404Page';
import DashboardPage from '../pages/Dashboard';
import LoginPage from '../pages/LoginPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import SignUp from '../pages/SignUpPage';
import HomePage from '../pages/HomePage';

function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute path="/" exact component={HomePage} />
        <ProtectedRoute path="/register" exact component={SignUp} />
        <ProtectedRoute path="/login" exact component={LoginPage} />
        <ProtectedRoute path="/admin/login" exact component={AdminLoginPage} />
        <ProtectedRoute path="/dashboard" exact component={DashboardPage} />
        <Route path="/*" component={FourOhFourPage} />
      </Switch>
    </Router>
  );
}

const ProtectedRoute = (props) => {
  const token = localStorage.getItem('accessToken');
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
