import { useFormik } from 'formik';
import InputEl from '../UI/InputEl';
import * as Yup from 'yup';
import axios, { AxiosResponse } from 'axios';
import { useAuthCtx } from '../../store/AuthProvieder';

import { useEffect } from 'react';
import { beBaseurl } from '../../config';
import { UserObjType } from '../../types/types';

type UpdateUserObjType = {
  NAME?: string;
  email: string;
  currentPassword: string;
  PASSWORD: string;
  password_confirmation: string;
  avatar_url: string;
};

type UpdateUserFormProps = {
  email: string;
  name: string;
  avatar_url: string;
  userId: number;
};

export default function UpdateUserForm({
  email,
  name,
  userId,
}: UpdateUserFormProps) {
  // const { login } = useAuthCtx();

  const formik = useFormik<UpdateUserObjType>({
    initialValues: {
      NAME: name,
      email: email,
      currentPassword: '',
      PASSWORD: '',
      password_confirmation: '',
      avatar_url: '',
    },

    validationSchema: Yup.object({
      NAME: Yup.string().min(3).max(255),
      email: Yup.string().email().required(),
      currentPassword: Yup.string().min(6).max(100).required(),
      PASSWORD: Yup.string().min(6).max(100).required(),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('PASSWORD')], 'Passwords must match')
        .required(),
      avatar_url: Yup.string().url().nullable(),
    }),
    onSubmit: (values) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_confirmation, ...finalObjToBack } = values;
      console.log('finalObjToBack  ===', finalObjToBack);
      sendUpdateToBack(finalObjToBack);
    },
  });

  useEffect(() => {
    formik.setFieldValue('email', email);
    formik.setFieldValue('name', name);
  }, [email, name]);

  function sendUpdateToBack(
    data: Omit<UpdateUserObjType, 'password_confirmation'>
  ) {
    console.log('data ===', data);
    axios
      .put(`${beBaseurl}/auth/user/update/userId`, data)
      .then((res: AxiosResponse<UserObjType>) => {
        console.log('res.data ===', res.data);
      })
      .catch((err) => {
        console.warn('err sendUpdateToBack ===', err.response.data);
        if (err.response.data.code === 'pass') {
          console.warn('blogas dabartinis pass');
          formik.setFieldError('currentPassword', 'Check your password');
        }
      });
  }
  return (
    <div>
      <div className='container'>
        <h2 className='title'>Update User Form</h2>

        <form onSubmit={formik.handleSubmit}>
          <div className='container'>
            <InputEl formik={formik} placeholder='Name' type='text' id='NAME' />
            <InputEl
              formik={formik}
              placeholder='Email'
              type='email'
              id='email'
            />
            <InputEl
              formik={formik}
              placeholder='Current Password'
              type='password'
              id='currentPassword'
            />
            <InputEl
              formik={formik}
              placeholder='Password'
              type='password'
              id='PASSWORD'
            />
            <InputEl
              formik={formik}
              placeholder='Confirm password'
              type='password'
              id='password_confirmation'
            />

            <InputEl
              formik={formik}
              placeholder='Avatar url'
              type='text'
              id='avatar_url'
            />
          </div>
          <button type='submit' className='btn'>
            UpdateUserForm
          </button>
        </form>
      </div>
    </div>
  );
}
