import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { getUserEmail } from 'screens/auth/reducer';
import { sendConfirmationEmailInit } from 'screens/auth/actionCreators';
import envelopeOpenIcon from 'shared/images/envelope-open.png';
//import freddieImg from 'shared/images/freddie.png';

const PageContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    margin: 5rem 0;
  }

  h1 {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 900;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.7rem;
    margin-bottom: 5rem;
    text-align: center;

    strong {
      font-weight: 600;
    }

    span {
      display: block;
    }
  }

  .send-again-container {
    text-align: center;

    strong {
      display: block;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const SignupSuccessPage = () => {
  const dispatch = useDispatch();

  const userEmail = useSelector(getUserEmail);
  const sendEmailAction = () => dispatch(sendConfirmationEmailInit());

  return (
    <PageContainer className="signup-success">
      <img className="envelope-open" src={envelopeOpenIcon} alt="Sent mail icon" />
      <h1>SO CLOSE!</h1>
      <p>
        WE&apos;VE SENT AN EMAIL TO {`${userEmail}`}.
        <br />
        <span>PLEASE VERIFY YOUR ACCOUNT.</span>
      </p>
      <div className="send-again-container">
        <span className="didnt-get-email">DIDN&apos;T GET THE EMAIL?</span>
        <span className="send-it-again" onClick={sendEmailAction}>SEND IT AGAIN</span>
      </div>
      {/* <img className="freddie" src={freddieImg} /> */}
    </PageContainer>
  );
};

export default SignupSuccessPage;
