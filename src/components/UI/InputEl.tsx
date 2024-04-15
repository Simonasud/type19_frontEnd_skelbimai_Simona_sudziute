import { FormikProps } from 'formik';

type InputElProps<T> = {
  placeholder: string;
  type?: 'text' | 'number' | 'textarea' | 'password' | 'email';
  readonly id: keyof T;
  formik: FormikProps<T>;
  children?: string;
  disabled?: boolean;
};

export default function InputEl<T>({
  formik,
  type = 'text',
  id,
  placeholder,
  children,
  disabled,
}: InputElProps<T>) {
  const Element = type === 'textarea' ? 'textarea' : 'input';

  const isError = formik.errors[id] && formik.touched[id];
  return (
    <label className='formlabel'>
      <span className='labelTitle'>{children}</span>
      <Element
        value={
          formik.values[id] as string | number | readonly string[] | undefined
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        type={type}
        id={id.toString()}
        placeholder={placeholder}
        className='formInput'
        disabled={disabled}
      />
      {isError && (
        <span className='formError'>{formik.errors[id]?.toString()}</span>
      )}
    </label>
  );
}
