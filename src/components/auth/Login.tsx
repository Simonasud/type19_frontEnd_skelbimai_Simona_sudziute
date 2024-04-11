import axios from 'axios';
import { useAuthCtx } from '../../store/AuthProvieder';
import { beBaseurl } from '../../config';
import InputEl from '../UI/InputEl';
import { useFormik } from 'formik';
import { UserObjType } from '../../types/types';

type LoginObjType = Pick<UserObjType, 'email' | 'password'>;

export default function Login() {
  const { login } = useAuthCtx();

  const formik = useFormik<LoginObjType>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      handleLogin(values);
    },
  });

  console.log('formik.values ===', formik.values);

  function handleLogin(loginObj: LoginObjType) {
    axios
      .post(`${beBaseurl}/user/login`, loginObj)
      .then((res) => {
        console.log('res.data ===', res.data);
        login(res.data.email);
      })
      .catch((error) => {
        console.log('error ===', error);
      });
  }

  return (
    <div>
      <h2>Login here</h2>
      <form noValidate onSubmit={formik.handleSubmit}>
        <InputEl
          formik={formik}
          id={'email'}
          placeholder='Enter email'
          type='email'
        />
        <InputEl
          formik={formik}
          id={'password'}
          placeholder='Enter password'
          type='password'
        />
        <button className='btn' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}
