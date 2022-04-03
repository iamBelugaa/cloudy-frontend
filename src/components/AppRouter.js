import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import LazyLoading from '../components/Loading/LazyLoading';

const FourOhFourPage = React.lazy(() => import('../pages/404Page'));
const AdminLoginPage = React.lazy(() =>
  import('../pages/Admin/AdminLoginPage')
);
const DashboardPage = React.lazy(() => import('../pages/Client/Dashboard'));
const LoginPage = React.lazy(() => import('../pages/Client/LoginPage'));
const ProfilePage = React.lazy(() => import('../pages/Client/ProfilePage'));
const SignUp = React.lazy(() => import('../pages/Client/SignUpPage'));
const UploadPage = React.lazy(() => import('../pages/Client/UploadPage'));
const FilesPage = React.lazy(() => import('../pages/Client/FilesPage'));
const HomePage = React.lazy(() => import('../pages/HomePage'));
const DownloadPage = React.lazy(() => import('../pages/Client/DownloadPage'));

function App() {
  return (
    <Router>
      <React.Suspense fallback={<LazyLoading />}>
        <Switch>
          <ProtectedRoute path="/" exact component={HomePage} />
          <ProtectedRoute path="/register" exact component={SignUp} />
          <ProtectedRoute path="/login" exact component={LoginPage} />
          <ProtectedRoute
            path="/admin/login"
            exact
            component={AdminLoginPage}
          />
          <ProtectedRoute path="/dashboard" exact component={DashboardPage} />
          <ProtectedRoute path="/upload" exact component={UploadPage} />
          <ProtectedRoute path="/files" exact component={FilesPage} />
          <ProtectedRoute path="/profile" exact component={ProfilePage} />
          <Route path="/download/:fileId" exact component={DownloadPage} />
          <Route path="*" component={FourOhFourPage} />
        </Switch>
      </React.Suspense>
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
