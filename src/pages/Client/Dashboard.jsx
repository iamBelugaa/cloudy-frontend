import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import errorTrash from '../../assets/illustrations/error-trash.svg';
import DashboardIndex from '../../components/Dashboard/DashboardIndex';
import RecentFiles from '../../components/Dashboard/FilesIndex';
import ShowError from '../../components/Errors/ShowError';
import Loading from '../../components/Loading/TextLoading';
import styled from 'styled-components';
import { fetchRecentFiles } from '../../services/dashboardService';
import { getTokenFromLocalstorage, paginate } from '../../utils';
import Pagination from '../../components/shared/Pagination';
import { SmallText } from '../../components/styles/TextStyles';
import { COLORS } from '../../components/styles/ColorStyles';
const PAGE_SIZE = 5;

const Dashboard = () => {
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const token = getTokenFromLocalstorage();
  const history = useHistory();

  const paginatedFiles = paginate(files, PAGE_SIZE, currentPage);
  const handlePageChange = (page) => setCurrentPage(page);

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
      <Section>
        {!files && !error && <Loading />}
        {error && <ShowError illustration={errorTrash} message={error} />}
        {files && (
          <>
            <RecentFiles files={paginatedFiles} setFiles={setFiles} />
            <Pagination
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              itemsCount={files.length}
              pageSize={PAGE_SIZE}
            />
            <SmallText
              style={{
                textAlign: 'center',
                maxWidth: '320px',
                margin: '0 auto',
                color: COLORS.text4,
              }}
            >
              All your privacy is kept safe at Cloudy. Authentication and
              encryption are security features that will allow to help secure
              your data.
            </SmallText>
          </>
        )}
      </Section>
    </DashboardIndex>
  );
};

const Section = styled.section`
  display: grid;
  gap: 70px;
  align-content: center;
  padding: 15px 0px 20px;
`;

export default Dashboard;
