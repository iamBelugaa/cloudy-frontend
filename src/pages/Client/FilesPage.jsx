import { parse } from 'query-string';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import errorTrash from '../../assets/illustrations/error-trash.svg';
import DashboardIndex from '../../components/Dashboard/DashboardIndex';
import FilesIndex from '../../components/Dashboard/FilesIndex';
import ShowError from '../../components/Errors/ShowError';
import Pagination from '../../components/shared/Pagination';
import { COLORS } from '../../components/styles/ColorStyles';
import { Filters } from '../../constants';
import { useFiles } from '../../hooks/useFiles';
import { getTokenFromLocalstorage, paginate } from '../../utils';
const PAGE_SIZE = 5;

const FilesPage = () => {
  const { search } = useLocation();
  const { q: filter } = parse(search);
  const token = getTokenFromLocalstorage();
  const [files, setFiles, error] = useFiles(filter, token);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  const paginatedFiles = paginate(files, PAGE_SIZE, currentPage);
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <DashboardIndex>
      {error && <ShowError illustration={errorTrash} message={error} />}
      {files && !error && (
        <Wrapper>
          <FilterWrapper count={Filters.length}>
            {Filters.map((filter) => (
              <FilterButton
                onClick={() =>
                  history.push({
                    pathname: '/files',
                    search: `?q=${filter.value}`,
                  })
                }
                key={filter.name}
              >
                {filter.name}
              </FilterButton>
            ))}
          </FilterWrapper>
          <FilesIndex files={paginatedFiles} setFiles={setFiles} />
          <Pagination
            itemsCount={files.length}
            pageSize={PAGE_SIZE}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
          />
        </Wrapper>
      )}
    </DashboardIndex>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  align-content: start;
  gap: 60px;
  padding-top: 20px;
`;

const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  align-items: center;
  justify-content: center;
  gap: 20px;
  grid-template-columns: repeat(${(p) => p.count}, auto);
`;

const FilterButton = styled.button`
  font-family: inherit;
  width: 120px;
  height: 38px;
  align-items: center;
  border: none;
  outline: none;
  color: ${COLORS.text3};
  background: linear-gradient(
    180deg,
    rgba(99, 106, 150, 0.4) 0%,
    rgba(182, 186, 214, 0.25) 100%
  );
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(40px);
  border-radius: 30px;
  cursor: pointer;

  :focus {
    box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px,
      rgb(47 184 255) 0px 0px 0px 1px inset;
  }

  ::placeholder {
    color: ${COLORS.text4};
    font-size: 14px;
    font-weight: 500;
  }
`;

export default FilesPage;
