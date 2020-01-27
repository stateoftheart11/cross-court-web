import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { string, func, bool } from 'prop-types';

import InputTextField from 'shared/components/InputTextField';
import Spinner from 'shared/components/Spinner';
import Button from 'shared/components/Button';
import device from 'shared/styles/mediaQueries';

const EditProfileFormContainer = styled.div`
  form {
    display: flex;
    flex-direction: column;
  }

  @media ${device.mobile} {
    margin-top: 1rem;
    form {
      width: 100%;
    }
  }

  label {
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.2rem;
    color: #aaaff3;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .button-container {
    display: flex;
    justify-content: flex-end;
  }
`;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
});

const EditProfileForm = ({ error, editProfileAction, editProfileLoading, profile }) => {
  const initialValues = {
    name: profile ? profile.name : '',
    phoneNumber: profile ? profile.phoneNumber : '',
  };

  return (
    <EditProfileFormContainer>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={initialValues}
        enableReinitialize
        onSubmit={values => {
          editProfileAction(values.name, values.phoneNumber);
        }}
        validationSchema={validationSchema}
      >
        {props => {
          const { errors } = props;
          return (
            <Form className="form">
              <div className="form-group">
                <InputTextField
                  labelText="Name"
                  error={errors.name}
                  name="name"
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <InputTextField
                  type="text"
                  labelText="Phone"
                  error={errors.phoneNumber}
                  name="phoneNumber"
                  placeholder="(123) 123-4567"
                />
              </div>
              <div className="button-container">
                <Button type="submit" disabled={editProfileLoading}>
                  {!editProfileLoading ? 'Save' : <Spinner />}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </EditProfileFormContainer>
  );
};

EditProfileForm.propTypes = {
  error: string,
  editProfileAction: func.isRequired,
  editProfileLoading: bool.isRequired,
};

export default EditProfileForm;
