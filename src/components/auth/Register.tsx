import { useFormik } from 'formik';
import InputEl from '../UI/InputEl';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuthCtx } from '../../store/AuthProvieder';
// import { beBaseurl } from '../../config';

type RegisterUserObjType = {
  NAME: string;
  email: string;
  PASSWORD: string;
  password_confirmation: string;
  avatar_url: string;
};

export default function Register() {
  const { login } = useAuthCtx();
  const formik = useFormik<RegisterUserObjType>({
    initialValues: {
      NAME: 'James not Bond',
      email: 'james@bond.email.lt',
      PASSWORD: '234567',
      password_confirmation: '234567',
      avatar_url: 'https://www.example.com/avatar.jpg',
    },
    validationSchema: Yup.object({
      NAME: Yup.string().min(3).max(255),
      email: Yup.string().email().required(),
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
      sendRegisterToBack(finalObjToBack);
    },
  });

  function sendRegisterToBack(
    data: Omit<RegisterUserObjType, 'password_confirmation'>
  ) {
    axios
      .post(`http://localhost:3000/api/auth/register`, data)
      .then((res) => {
        console.log('res.data ===', res.data);
        login(data.email, res.data.id || 0);
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
            <InputEl formik={formik} placeholder='Name' type='text' id='NAME' />
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
            Register
          </button>
        </form>
        <p>
          Registered? <Link to={'/auth/login'}>login here</Link>
        </p>
      </div>
    </div>
  );
}
