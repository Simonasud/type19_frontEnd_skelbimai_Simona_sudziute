import { FormikProps } from 'formik';
import { AdsFormType } from '../../types/types';

type InputElProps = {
  placeholder: string;
  type?: 'text' | 'number' | 'textarea' | 'password' | 'email';
  // id: keyof AdsFormType;
  // formik: FormikProps<AdsFormType>;
  id: string;
  formik: any;
  children?: string;
};

export default function InputEl({
  formik,
  type = 'text',
  id,
  placeholder,
  children,
}: InputElProps) {
  const Element = type === 'textarea' ? 'textarea' : 'input';

  const isError = formik.errors[id] && formik.touched[id];
  return (
    <label className='formlabel'>
      <span className='labelTitle'>{children}</span>
      <Element
        value={formik.values[id]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        type={type}
        id={id}
        placeholder={placeholder}
        className='formInput'
      />
      {isError && <span className='formError'>{formik.errors[id]}</span>}
    </label>
  );
}
