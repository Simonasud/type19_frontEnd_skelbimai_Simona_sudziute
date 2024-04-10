//Forma leidzianti registruoti nauja vartotoja su name, email, password, password_confirmation, avatar_url

import { useFormik } from 'formik';
import InputEl from '../../components/UI/InputEl';
import * as Yup from 'yup';

type RegisterUserObjType = {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
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
      // console.log(values);
      const finalObjToBack = { ...values };
      delete finalObjToBack.password_confirmation;
      console.log('finalObjToBack  ===', finalObjToBack);
    },
  });
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
      </div>
    </div>
  );
}
