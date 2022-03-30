import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import errorTrash from '../assets/illustrations/error-trash.svg';
import DashboardIndex from '../components/Dashboard/DashboardIndex';
import RecentFiles from '../components/Dashboard/FilesIndex';
import ShowError from '../components/Errors/ShowError';
import Loading from '../components/Loading/TextLoading';
import { fetchRecentFiles } from '../services/dashboardService';
import { getTokenFromLocalstorage } from '../utils';

const Dashboard = () => {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  const token = getTokenFromLocalstorage();
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      localStorage.removeItem('uAccessToken');
      return history.push('/login');
    }

    fetchRecentFiles(token)
      .then((files) => {
        if (!files) return;

        setError(null);
        setFiles(files);
      })
      .catch((error) => setError(error.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardIndex>
      {!files && !error && <Loading />}
      {error && <ShowError illustration={errorTrash} message={error} />}
      {files && <RecentFiles files={files} />}
    </DashboardIndex>
  );
};

export default Dashboard;
