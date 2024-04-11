import { useFormik } from 'formik';
import InputEl from '../UI/InputEl';
import * as Yup from 'yup';
import axios from 'axios';
import { beBaseurl } from '../../config';
import { Link } from 'react-router-dom';

type RegisterUserObjType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  avatar_url: string;
};

export default function Register() {
  const formik = useFormik<RegisterUserObjType>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      avatar_url: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3).max(255),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).max(100).required(),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required(),
      avatar_url: Yup.string().url().nullable(),
    }),
    onSubmit: (values) => {
      const { password_confirmation, ...finalObjToBack } = values;
      console.log('finalObjToBack  ===', finalObjToBack);
      sendRegisterToBack(finalObjToBack);
    },
  });

  function sendRegisterToBack(
    data: Omit<RegisterUserObjType, 'password_confirmation'>
  ) {
    axios
      .post(`${beBaseurl}/user/register`, data)

      .then((res) => {
        console.log('res.data ===', res.data);
        login(data.email);
      })
      .catch((err) => {
        console.log('err ===', err.response.data);
      });
  }
  return (
    <div>
      <div className='container'>
        <h1 className='title'>Register</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className='container'>
            <InputEl formik={formik} placeholder='Name' type='text' id='name' />
            <InputEl
              formik={formik}
              placeholder='Email'
              type='email'
              id='email'
            />
            <InputEl
              formik={formik}
              placeholder='Password'
              type='password'
              id='password'
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
            Register
          </button>
        </form>
        <p>
          Registered? <Link to={'/user/login'}>login here</Link>
        </p>
      </div>
    </div>
  );
}
