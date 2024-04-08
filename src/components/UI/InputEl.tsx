import { FormikProps } from 'formik';
import { AdsFormType } from '../../types/types';

type InputElProps = {
  placeholder: string;
  type?: 'text' | 'number' | 'textarea';
  id: keyof AdsFormType;
  formik: FormikProps<AdsFormType>;
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
  return (
    <label className='formlabel'>
      {children}
      <Element
        value={formik.values[id]}
        onChange={formik.handleChange}
        type={type}
        id={id}
        placeholder={placeholder}
        className='formInput'
      />
    </label>
  );
}
