/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { H3 } from '../styles/TextStyles';

const Loading = ({ text = 'Loading', time = 300 }) => {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const id = setInterval(
      () =>
        setContent((content) =>
          content === `${text}...` ? text : `${content}.`
        ),
      time
    );

    return () => clearInterval(id);
  }, [text, time]);

  return <LoadingText>{content}</LoadingText>;
};

const LoadingText = styled(H3)`
  margin: 300px 0;
  text-align: center;
`;

export default Loading;
