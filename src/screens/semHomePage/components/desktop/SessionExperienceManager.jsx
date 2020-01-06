import React from 'react';
import styled from 'styled-components';
import colors from 'shared/styles/constants';
import Button from 'shared/components/Button';
import { sessionExperienceText } from 'shared/texts/constants';
import SessionExperienceImage from '../../images/session-experience-manager.png';
import ImageContainer from './ImageContainer';

const TextContainer = styled.div`
  background-color: ${colors.white};
  padding: 0 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${colors.black};
  font-size: 1.4rem;
  height: 100vh;
  max-width: 50rem;

  .button {
    margin-top: 3rem;
    width: 20rem;
  }

  .title {
    font-weight: bold;
    font-size: 4.5rem;
    letter-spacing: 0.1rem;
    margin: 0;
    color: ${colors.polarPlum};
  }
`;

const SessionExperienceManager = () => (
  <>
    <TextContainer>
      <h2 className="title">SESSION</h2>
      <h2 className="title">EXPERIENCE</h2>
      <h2 className="title">MANAGER</h2>
      <p>{sessionExperienceText}</p>
      <Button className="button">Apply to be SEM</Button>
    </TextContainer>
    <div>
      <ImageContainer img={SessionExperienceImage} overlayColor={colors.blueOverlay} />
    </div>
  </>
);

export default SessionExperienceManager;
