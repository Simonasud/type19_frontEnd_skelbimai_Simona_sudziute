import axios, { AxiosResponse } from 'axios';
import { useAuthCtx } from '../../store/AuthProvieder';
import { beBaseurl } from '../../config';
import InputEl from '../UI/InputEl';
import { useFormik } from 'formik';
import { UserObjType } from '../../types/types';
import { Link } from 'react-router-dom';

type LoginObjType = Pick<UserObjType, 'email' | 'PASSWORD'>;

export default function Login() {
  const { login } = useAuthCtx();

  const formik = useFormik<LoginObjType>({
    initialValues: {
      email: '',
      PASSWORD: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      handleLogin(values);
    },
  });

  console.log('formik.values ===', formik.values);

  function handleLogin(loginObj: LoginObjType) {
    axios
      .post(`${beBaseurl}/auth/login`, loginObj)
      .then((res: AxiosResponse<UserObjType>) => {
        console.log('res.data ===', res.data);
        login(res.data.email, res.data.id || 0);
      })
      .catch((error) => {
        console.log('error ===', error);
      });
  }

  return (
    <div className='container'>
      <h2 className='title'>Login here</h2>
      <form noValidate onSubmit={formik.handleSubmit}>
        <InputEl
          formik={formik}
          id={'email'}
          placeholder='Enter email'
          type='email'
        />
        <InputEl
          formik={formik}
          id={'PASSWORD'}
          placeholder='Enter password'
          type='password'
        />
        <button className='btn' type='submit'>
          Login
        </button>
      </form>
      <p>
        Do not have account? <Link to={'/auth/register'}>login here</Link>
      </p>
    </div>
  );
}
