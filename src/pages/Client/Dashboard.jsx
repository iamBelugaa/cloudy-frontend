import React, { useState } from 'react';
import styled from 'styled-components';
import errorTrash from '../../assets/illustrations/error-trash.svg';
import DashboardIndex from '../../components/Dashboard/DashboardIndex';
import RecentFiles from '../../components/Dashboard/FilesIndex';
import ShowError from '../../components/Errors/ShowError';
import Loading from '../../components/Loading/TextLoading';
import Pagination from '../../components/Shared/Pagination';
import { COLORS } from '../../components/styles/ColorStyles';
import { SmallText } from '../../components/styles/TextStyles';
import { useFiles } from '../../hooks/useFiles';
import { getTokenFromLocalstorage, paginate } from '../../utils';
const PAGE_SIZE = 5;

const Dashboard = () => {
  const token = getTokenFromLocalstorage();
  const [files, setFiles, error] = useFiles('recent-files', token);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedFiles = paginate(files, PAGE_SIZE, currentPage);
  const handlePageChange = (page) => setCurrentPage(page);

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
          </>
        )}

        {files?.length > 0 && (
          <SmallText
            style={{
              textAlign: 'center',
              maxWidth: '320px',
              margin: '0 auto',
              color: COLORS.text4,
            }}
          >
            All your privacy is kept safe at Cloudy. Authentication and
            encryption are security features that will allow to help secure your
            data.
          </SmallText>
        )}
      </Section>
    </DashboardIndex>
  );
};

const Section = styled.section`
  display: grid;
  gap: 60px;
  align-content: center;
  padding: 20px 0px 20px;
`;

export default Dashboard;
