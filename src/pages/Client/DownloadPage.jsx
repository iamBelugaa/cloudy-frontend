import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../components/Shared/NavBar';
import HamburgContext from '../../contexts/HamburgerContext';
import useFile from '../../hooks/useFile';
import {
  BodyMain,
  Caption,
  H3,
  MediumText,
  SmallText,
} from '../../components/styles/TextStyles';
import { COLORS } from '../../components/styles/ColorStyles';
import giftIcon from '../../assets/icons/gift.svg';
import { getSmallerFileName } from '../../utils';
import helpIocn from '../../assets/icons/help.svg';
import stars from '../../assets/illustrations/stars.svg';

export default function DownloadPage() {
  const { fileId } = useParams();
  const [file, error] = useFile(fileId);

  return (
    <HamburgContext>
      <Wrapper>
        <NavBar />
        <DownloadBox>
          {error && (
            <ErrorBox>
              <Icon src={helpIocn} alt="Gift icon" />
              <ErrorText>
                <H3>Oops! Something went wrong.</H3>
                <MediumText style={{ maxWidth: '300px', margin: '20px auto' }}>
                  {error}
                </MediumText>
              </ErrorText>
            </ErrorBox>
          )}

          {!error && (
            <>
              <Icon src={giftIcon} alt="Gift icon" />
              <TextWrapper>
                <H3>Your File is Ready to Download</H3>
                <BodyMain>{file && getSmallerFileName(file.fileName)}</BodyMain>
                <Caption style={{ color: COLORS.text4 }}>
                  {file && file.fileSize}
                </Caption>
              </TextWrapper>
              <div>
                <Link
                  href={file && file.downloadLink}
                  download={file && file.fileName}
                >
                  <p>Download File</p>
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 74 74"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="37"
                      cy="37"
                      r="35.5"
                      stroke="black"
                      strokeWidth="3"
                    ></circle>
                    <path
                      d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                      fill="black"
                    ></path>
                  </svg>
                </Link>
              </div>
            </>
          )}
          <SmallText style={{ textAlign: 'center' }}>
            &copy; {new Date().getFullYear()} Cloudy
          </SmallText>
        </DownloadBox>
      </Wrapper>
    </HamburgContext>
  );
}

const Wrapper = styled.main`
  background: url(${stars}), linear-gradient(180deg, #191a43 0%, #442d85 100%);
  padding: 40px;
  height: 715px;
`;

const DownloadBox = styled.div`
  max-width: 550px;
  height: 450px;
  color: ${COLORS.text3};
  margin: 0 auto;
  margin-top: 120px;
  text-align: center;
  display: grid;
  align-content: center;
  gap: 40px;
  background-color: rgba(25, 26, 67, 0.2);
  padding: 40px 30px 30px;
  box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px,
    rgb(47 184 255) 0px 0px 0px 1px inset;
  border-radius: 30px;
  backdrop-filter: blur(40px);
`;

const Icon = styled.img`
  justify-self: center;
  width: 100px;
  box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px,
    rgb(47 184 255) 0px 0px 0px 1px inset;
  border-radius: 20px;
  padding: 20px;
`;

const TextWrapper = styled.div`
  display: grid;
  align-content: center;
  gap: 8px;
`;

const Link = styled.a`
  max-width: 250px;
  margin: 0 auto;
  justify-self: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  background: ghostwhite;
  color: black;
  border: 1px solid transparent;
  box-shadow: rgb(47 184 255 / 30%) 0px 10px 40px;
  padding: 10px 20px;
  border-radius: 100px;
  transition: all 0.2s;

  p {
    margin-right: 5px;
    text-align: center;
  }

  svg {
    transition: transform 0.2s ease-in-out;
  }

  a > svg {
    width: 34px;
    margin-left: 10px;
  }

  :hover svg {
    transform: translateX(5px);
  }

  :active {
    transform: scale(0.95);
  }
`;

const ErrorBox = styled.div`
  display: grid;
  gap: 40px;
`;

const ErrorText = styled.div`
  margin-top: 30px;
`;
