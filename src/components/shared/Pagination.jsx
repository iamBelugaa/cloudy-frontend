import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

const Pagination = ({
  pageSize,
  itemsCount,
  handlePageChange,
  currentPage,
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <div>
      <PagesWrapper count={pages.length}>
        {pages.map((page) => (
          <Page
            key={page}
            onClick={() => handlePageChange(page)}
            isCurrent={currentPage === page ? true : false}
          >
            {page}
          </Page>
        ))}
      </PagesWrapper>
    </div>
  );
};

const PagesWrapper = styled.ol`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(${(p) => p.count}, 35px);
  list-style-type: none;
  justify-content: center;
`;

const Page = styled.li`
  padding: 10px 4px;
  box-shadow: 0px 10px 20px rgb(0 0 0 / 15%),
    inset 0px 0px 0px 0.5px rgb(255 255 255 / 20%);
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: ${(p) =>
    p.isCurrent
      ? `rgb(47 184 255 / 30%) 0px 10px 40px,
        rgb(47 184 255) 0px 0px 0px 1px inset;`
      : `0px 10px 20px rgb(0 0 0 / 15%),
    inset 0px 0px 0px 0.5px rgb(255 255 255 / 20%)`};
`;

export default Pagination;
